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
     
     console.log("hi from createUser")
		console.log("inside the method !")	
         res.status(200).render('createUsers', {
	        data: undefined,
		    heading: "New User",
		    error:  undefined,
		    message: undefined
	       })

    //  console.log("passing the get logic") 
    //      if(req.method == 'POST'){
        
	// 		console.log('Post')
    //         const name = req.body.name;
	//     const email = req.body.email;
	//     const password = req.body.password;
	//     const role = req.body.state == 'on' ? 'admin' : 'user';
	
	//   if(role == 'user'){

	//     try{

    //             const UserExist = await userModel.findOne({email: email});
            
    //             if(UserExist){
    //               return res.status(200).render('createUsers', {
	// 		     data: undefined,
	// 		     heading: "New User",
	// 		     error: "User Alredy Exist !" , 
	// 		     message: undefined 
	// 	  })

	// 	}else{
               
	//           const newUser = await userModel.create({email: email});
	          
	//           if(newUser){
		    
	// 	    return res.redirect(301,'/admin/dashboard'); 
		  
	// 	  }else{
                    
	//             return res.status(500).render('createUsers', {
	// 	               data: undefined,
	// 		       heading: "New User",
	// 		       error: "User Creation Failed !",
	// 		       message: undefined
	// 	    }) 
	// 	  }
	// 	}

	//     }catch(error){
    //               return res.status(500).send(`<h1>Internal Server Error !</h1>`)
	//      }
	
    //      }else{
          
	//       try{

    //             const findAdmin = await adminModel.findOne({email: email})
    //             if(findAdmin){
    //               return res.status(200).render('createUsers',{
    //                          data: undefined,
	// 		     heading: "New User",
	// 		     error: "Admin User Exits !",
	// 		     message: undefined

	// 	  })

	// 	}else{

    //               const newAdmin = await adminModel.create({name: name, email: email, password: password});
                  
	// 	  if(newAdmin){
    //                 return res.redirect(301,"/admin/dashboard");
	// 	  }else{
    //                 return res.status(500).render('createUsers',{
    //                            data: undefined,
	// 		       heading: "New User",
	// 		       error: "Admin User Creation Failed !",
	// 		       message: undefined
	// 	    })

	// 	  }
	// 	} 

	//       }catch(error){
    //                 return res.status(500).send(`<h1>Internal Server Error !</h1>`)
	//       }

	//  }


    //  }

} // createUser



const searchUser = async (req, res) => { //searchUser
     
      try{
        
	const name = req.body.value;
    console.log(name)
	const findUser = await userModel.find({name: name })
      
	console.log(findUser)
        if(findUser == 0){
          return res.status(404).render('dashboard', {data: findUser}); 
	}else{
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
