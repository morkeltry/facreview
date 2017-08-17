const get = require('../model/get');
const extractWorkshops = require('./logic/extract-workshops');

exports.getCurrentWeek = (req,res) => {
  // check cookie auth before rendering
  get.dataWeek('14-08-2017',(err, resDataWeek)=>{
    // console.log(resDataWeek);
    const workshopArray = extractWorkshops(resDataWeek);
    console.log(workshopArray);
    get.dataVotes(1 , (err, resDataVotes)=> {
      // console.log(resDataVotes)

      res.render('current-week', {workshopArray: workshopArray});
    });

  })

}
