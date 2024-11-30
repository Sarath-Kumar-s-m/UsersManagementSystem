

const userAuthentication = function(req, res, next){
    if(req.session.role == 'user'){
      return res.redirect(301, "/user/home")
    }else{
      next()
    }
}


const userHomeAuthentication = function(req, res, next){
      if(req.session.role == 'user'){
         next()
      }else{
        return res.redirect(301, '/login')
      }
} 


module.exports = {
  userAuthentication,
  userHomeAuthentication
};