

export default function getMonthlyData(data) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // sorting the array in ascending order
    const record_array = data.record.sort((a, b) => {
      return a.date > b.date;
    });

    const dateInMonths = new Date(data.year, data.month - 1, 0).getDate();
    const limit = record_array[record_array.length - 1].date;

    const record = [];

    for (let i = 1; i <= dateInMonths; i++) {
      const record_obj = {};
      record_obj.date = i;
      const match_data = record_array.filter((item) => item.date === i);
      if (match_data.length === 1) {
        record_obj.usage = match_data[0].usage;
      } else {
        if (i > limit) {
          record_obj.usage = null;
        } else {
          record_obj.usage = 0;
        }
      }
      record.push(record_obj);
    }

    return { year: data.year, month: months[data.month], record };
  }