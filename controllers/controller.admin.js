/**
 * Custom Dependencies
 **/

const adminModel = require('../database/models/model.admin.js');
const userModel = require('../database/models/model.user.js');


const adminDashBoard = async (req, res) => { // adminDashBoard
      
       try{
     
          const findUser = await userModel.find({});
	
	  if(findUser.length == 0){
             
	      return res.status(200).render('dashboard',{data: findUser});
  	  
	  }else{
            
	     return res.status(200).render('dashboard',{data: findUser});
	  } 
	      
       }catch(error){ 
	    return res.status(500).send(`<h1>Internal Server Error !</h1>`); 
       }

} //adminDashBoard



const createUser = async (req, res) => { // createUser 
      
       
	if(req.method == 'GET'){

	   res.status(200).render('createUsers', { 
	       data: undefined,
	       heading: "New User",
	       error:  undefined,
	       message: undefined
	   })

	}

     
         if(req.method == 'POST'){
        
            const nameChar = req.body.name.split("")[0].toUpperCase();
	    const nameChars = req.body.name.slice(1);
	    const email = req.body.email;
	    const password = req.body.password;
	    const role = req.body.state == 'on' ? 'admin' : 'user';
            
            const name = nameChar + nameChars;
            
	  if(role == 'user'){

	    try{

               const userExist = await userModel.findOne({email: email});
            
               if(userExist){
                  return res.status(200).render('createUsers', {
			     data: undefined,
			     heading: "New User",
	 		     error: "User Alredy Exist !" , 
			     message: undefined 
	 	         })

	       }

		if(!userExist){
               
                   const newUser = await userModel.create({name: name, email: email, password: password});
	          
                    if(newUser){
		    
 	               return res.redirect(301, '/admin/dashboard'); 
		  
		    }

                   if(!newUser){ 
	              return res.status(500).render('createUsers', {
 	                       data: undefined,
			       heading: "New User",
	 		       error: "User Creation Failed !",
			       message: undefined
	 	            });

	 	   }

		 }

	      }catch(error){
                   return res.status(500).send(`<h1>Internal Server Error !</h1>`)
              }
	
           }else{
          
	       try{

                const findAdmin = await adminModel.findOne({email: email})
                 if(findAdmin){
                  return res.status(200).render('createUsers',{
                             data: undefined,
			     heading: "New User",
			     error: "Admin User Exits !",
			     message: undefined

	 	         })

		}else{

                  const newAdmin = await adminModel.create({name: name, email: email, password: password});
                  
		  if(newAdmin){
                    return res.redirect(301,"/admin/dashboard");
 	           }else{
                    return res.status(500).render('createUsers',{
                               data: undefined,
			       heading: "New User",
	 		       error: "Admin User Creation Failed !",
			       message: undefined
		    })

		  }
		} 

                }catch(error){
                    return res.status(500).send(`<h1>Internal Server Error !</h1>`)
	        }

	 }


       }

} // createUser



const searchUser = async (req, res) => { //searchUser
     
      try{
        
	const name = req.body.value;
	
	const findUser = await userModel.find({name: /name/, $options: 'i' })
      
        if(findUser == 0){
          return res.status(404).render('dashboard', {data: findUser}); 
	}
	 
	if(findUser !== 0){
          return res.status(200).render('dashboard', {data: findUser});
	}

      }catch(error){
            return res.status(500).send(`<h1>Server Error !</h1>`); 
      }
	
} // searchUser




const logOut = async (req, res) => { // signOut
   
      req.session.destroy(function(error){

          if(error){
            throw error;
	   }else{
              return res.redirect(301, '/login') 
	   }

      })

} //signOut






module.exports = {
    adminDashBoard,
    logOut,
    searchUser,
    createUser
}
