const get = require('../model/get');

exports.getCurrentWeek = (req,res) => {
  // check cookie auth before rendering
  get.dataWeek('14-08-2017',(err, response)=>{
    console.log(response);
    res.render('current-week');
  })

}
