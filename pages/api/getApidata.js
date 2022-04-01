import authenticate from "helper/authUser";
import connectDB from "helper/connection";
import User from "models/user";

async function getAPidata(req, res) {
  const { apikey } = req.query;
  if (!apikey) {
    return res.status(401).json({
      message: "Enter the correct API key",
    });
  }

  const date = new Date();
  const dateObj = {
    year: date.getFullYear(),
    month: date.getMonth(),
    date: date.getDate(),
  };

  const _user = await User.findOne({ "api_info.api_key": apikey });

  if (_user) {
    // calculate total usage of api calls
    let totalUsage = 0;

    if (_user.api_info.records.length >= 1) {
      totalUsage = _user.api_info.records.reduce((total, item) => {
        return total + item.usage;
      }, 0);
    }

    // get api usage info for current month
    let monthly_records = _user.api_info.records.filter((item) => {
      return item.year === dateObj.year && item.month === dateObj.month;
    });

    // get api usage info for current date
    let records = _user.api_info.records.filter((item) => {
      return (
        item.year === dateObj.year &&
        item.month === dateObj.month &&
        item.date === dateObj.date
      );
    });

    if (records.length === 1) {
      return res.status(200).json({
        today_record: records[0],
        dateInfo: dateObj,
        totalUsage,
        monthly_records: {
          year: dateObj.year,
          month: dateObj.month,
          record: monthly_records,
        },
      });
    }

    if (monthly_records.length >= 1) {
      return res.status(200).json({
        today_record: {
          year: dateObj.year,
          month: dateObj.month,
          date: dateObj.date,
          usage: 0,
        },
        dateInfo: dateObj,
        totalUsage,
        monthly_records: {
          year: dateObj.year,
          month: dateObj.month,
          record: [
            ...monthly_records,
            {
              year: dateObj.year,
              month: dateObj.month,
              date: dateObj.date,
              usage: 0,
            },
          ],
        },
      });
    }

    return res.status(200).json({
      today_record: {
        year: dateObj.year,
        month: dateObj.month,
        date: dateObj.date,
        usage: 0,
      },
      dateInfo: dateObj,
      totalUsage,
      monthly_records: {
        year: dateObj.year,
        month: dateObj.month,
        record: [
          {
            year: dateObj.year,
            month: dateObj.month,
            date: dateObj.date,
            usage: 0,
          },
        ],
      },
    });
  }

  return res
    .status(400)
    .json({ message: "Enter the correct API key", api: apikey });
}

export default connectDB(authenticate(getAPidata));
