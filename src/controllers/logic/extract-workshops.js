
const extractWorkshops = (arr) => {
// creates an array of the 3 dates
  const dateArray = arr.reduce((acc,element)=> {
    if (acc.indexOf(element.date.toISOString()) === -1) {
      acc.push(element.date.toISOString());
    }
      return acc;
  },[])

// creates a nested array with each day being a nested array of objects
  const finalArray = arr.reduce((acc, element) => {
    if(element.date.toISOString() === dateArray[0]) {
      acc[0].push(element)
    } else if(element.date.toISOString() === dateArray[1]) {
      acc[1].push(element)
    } else {
      acc[2].push(element)
    }
    return acc
}, [[],[],[]])
  return finalArray
};


module.exports = extractWorkshops ;
