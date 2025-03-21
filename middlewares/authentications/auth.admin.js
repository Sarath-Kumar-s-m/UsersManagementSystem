const adminAuthentication = async function(req, res, next){
     if(req.session.role == 'admin'){
       return res.redirect(301, "/admin/dashboard") 
      }else {
       next()
     }
}

const adminDashBoardAuthentication = async function(req, res, next){
      if(req.session.role == 'admin'){
        next()
      }else{
        res.redirect(301, '/login')
      }
} 

module.exports =  {
  adminAuthentication,
  adminDashBoardAuthentication
} 
