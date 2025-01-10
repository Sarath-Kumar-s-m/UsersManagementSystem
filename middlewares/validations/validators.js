
const EMAILFORMATS = {
      gmail: '@gmail.com',
      hotmail: '@hotmail.com'
}

const emailValidation = function(email){
      if(EMAILFORMATS.gmail === email.slice(email.indexOf('@'))){
         return true;
      }else{
         return false;
      }
}


const passwordValidation = function(password){
      if(password.length >= 8){
         return true;
      }else{
         return false;
      } 
}


const checker = function(req, res, next){
       const email = req.body.email;
       const password = req.body.password;

       const isValidEmail = emailValidation(email);
       const isValidPassword = passwordValidation(password);
      

       if(!isValidEmail && !isValidPassword){
          return res.status(200).render('createUsers', {
			            data: undefined,
			            heading: "New User",
	 		            error: undefined , 
			            emailValidationError: `Invalid Email !`,
                     passwordValidationError: `Minimum length of the password is 8 !`, 
					      message: undefined 
	 	         }) 
       }


       if(!isValidEmail){
          return res.status(200).render('createUsers', {
			            data: undefined,
			            heading: "New User",
	 		            error: undefined , 
			            emailValidationError: `Invalid Email !`,
                     passwordValidationError:undefined, 
					      message: undefined 
	 	         }) 
       }


       if(!isValidPassword){
          return res.status(200).render('createUsers', {
			            data: undefined,
			            heading: "New User",
	 		            error: undefined , 
			            emailValidationError: undefined,
                     passwordValidationError:`Minimum length of the password is 8 !`, 
					      message: undefined 
	 	         }) 
       }

       next();
}


module.exports = {
   checker
}