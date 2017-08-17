const getEndDate = (startDate) => {
  // argument expects format '14-08-2017'
  // reverses the date so it can be used with new Date
  const reformatStartDate = startDate.split('-').reverse().join('-');

// makes the date a js date object
  let mondayDate = new Date(reformatStartDate);
// parses it into miliseconds since 1970
  mondayDate = Date.parse(mondayDate);
// adds 3 days worth of miliseconds
  let wednesdayDate = new Date (mondayDate + 259200000);
// grabs day, month and year values from wednesdays date
  const dd = wednesdayDate.getDate();
  const mm = wednesdayDate.getMonth() + 1;
  const y = wednesdayDate.getFullYear();

  const formattedWednesdayDate = dd + '-'+ mm + '-'+ y;
  return formattedWednesdayDate;
};

module.exports = getEndDate;
