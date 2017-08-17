const getEndDate = (startDate) => {
  // expects format '14-08-2017'
  const reformatStartDate = startDate.split('-').reverse().join('-');

  let mondayDate = new Date(reformatStartDate);
  mondayDate = Date.parse(mondayDate);
  let wednesdayDate = new Date (mondayDate + 259200000);

  const dd = wednesdayDate.getDate();
  const mm = wednesdayDate.getMonth() + 1;
  const y = wednesdayDate.getFullYear();

  var formattedWednesdayDate = dd + '-'+ mm + '-'+ y;

  return formattedWednesdayDate;
};

module.exports = getEndDate;
