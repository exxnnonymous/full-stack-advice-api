import User from "models/user";

const auth_api = (fn) => async (req, res) => {
  const api_limit = 15;

  if (req.method !== "GET") {
    return res.status(500).json({ message: "req_method_not_supported" });
  }

  const { apiKey } = req.query;
  if (!apiKey) {
    return res.status(401).json({
      message:
        "Access restricted. Check credits balance or enter the correct API key.",
    });
  }

  const _user = await User.findOne({ "api_info.api_key": apiKey });
  if (_user) {
    const date = new Date();
    const dateObj = {
      year: date.getFullYear(),
      month: date.getMonth(),
      date: date.getDate(),
    };

    let records = _user.api_info.records.filter((item) => {
      return (
        item.year === dateObj.year &&
        item.month === dateObj.month &&
        item.date === dateObj.date
      );
    });

    if (records.length === 1) {
      if (records[0].usage >= api_limit) {
        return res.status(401).json({
          message:
            "Access restricted. Check credits balance or enter the correct API key.",
        });
      } else {
        await User.updateOne(
          { "api_info.api_key": apiKey },
          {
            $inc: { "api_info.records.$[elem].usage": 1 },
          },
          {
            arrayFilters: [
              {
                "elem.date": dateObj.date,
                "elem.year": dateObj.year,
                "elem.month": dateObj.month,
              },
            ],
          }
        );

        return await fn(req, res);
      }
    } else {
      const newRecord = {
        year: dateObj.year,
        month: dateObj.month,
        date: dateObj.date,
        usage: 1,
      };

      await User.updateOne(
        { "api_info.api_key": apiKey },
        { $push: { "api_info.records": newRecord } }
      );

      return await fn(req, res);
    }
  } else {
    return res.status(401).json({
      message:
        "Access restricted. Check credits balance or enter the correct API key.",
    });
  }
};

export default auth_api;
