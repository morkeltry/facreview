
const extractWorkshops = (arr) => {

  const dateArray = arr.reduce((acc,element)=> {
    if (acc.indexOf(element.date.toISOString()) === -1) {
      acc.push(element.date.toISOString());
    }
      return acc;
  },[])

// console.log(dateArray);

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
  // console.log(finalArray);
};


module.exports = extractWorkshops ;
