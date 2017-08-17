const get = require('../model/get');
const extractWorkshops = require('./logic/extract-workshops');

exports.getCurrentWeek = (req,res) => {
  // check cookie auth before rendering
  get.dataWeek('14-08-2017',(err, resDataWeek)=>{
    // console.log(resDataWeek);
    extractWorkshops(resDataWeek);
    get.dataVotes(1 , (err, resDataVotes)=> {
      // console.log(resDataVotes)

      res.render('current-week');
    });

  })

}
