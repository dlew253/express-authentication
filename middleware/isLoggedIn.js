module.exports = function(req, res, next) {
    //check if no user
  if (!req.user) {
    //send hate 
    req.flash('error', "You need to be logged in you shit sniffer");
    //fuck them back to the begining
    res.redirect('/auth/login');
  } else {
    //carrion
    next();
}};