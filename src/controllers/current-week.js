exports.get = (req,res) => {
  // check cookie auth before rendering
  res.render ('current-week')
}
