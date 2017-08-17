
const extractWorkshops = (arr) => {
  let finalArray = [];

  let mondayArray = [];
  let tuesdayArray = [];
  let wednesdayArray = [];

  const dateArray = arr.reduce((acc,element)=>{
    if (acc.indexOf(element.date.toISOString()) === -1) {
      acc.push(element.date.toISOString());
      console.log('in the if?')
    }
    console.log(acc)
      return acc;
  },[])

  // finalArray = dateArray.filter(function(date){
  //
  //   if (finalArray.indexOf(date) === -1) {
  //     return date;
  //   }
  // })

console.log(dateArray);

// console.log(dateArray);
// console.log('final array', finalArray);

}

// extractWorkshops(testData);

module.exports = extractWorkshops ;
