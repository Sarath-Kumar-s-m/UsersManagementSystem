


const home = async (req, res) => {
     
    if(req.session.userData){
   
        res.status(200).render('userHome',{
            data: req.session.userData,
            error: undefined,
            message: "Successfully Logged In !" 
        })
    
    }else{
      
        res.status(404).render('userHome', {
            data: undefined,
            error: "Can't Fetch User Information !",
            message: undefined
        }); 
    
    }
}


const signOut = async (req, res) => {
      
    if(req.session.role == 'user'){
           req.session.destroy(function(error){
              if(error){
                throw error;
              }else{
                res.status(200).render("loginForm",{data:{
                    error: undefined
                }
                })
              }
           })
      }

}


module.exports = {
    home,
    signOut
}