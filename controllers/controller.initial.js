/**
 * Custom Module Dependences
 */
const adminModel = require("../database/models/model.admin.js");
const userModel = require("../database/models/model.user.js");

/**
 *@async
 *@function
 * @param {object} request
 * @param {object} response
 */
const login = async (req, res) => {

     if(req.method == "GET") {
        if(req.session.role == "user"){
           return res.redirect(301, "/user/home");
        }
        if (req.session.role == "admin"){
           return res.redirect(301, "/admin/dashboard");      
        }  
        return res.status(200).render("loginForm", { data: { error: undefined} });   
      }

      if(req.method == "POST"){
         const email = req.body.email;      
         try{
            const findUser = await userModel.findOne({ email: email});
            
            if(findUser && findUser.role == "user") {
               req.session.userData = findUser;
               req.session.role = findUser.role;
               return res.redirect(301, "/user/home");
            } 
            const findAdmin = await adminModel.findOne({email: email});
            
            if(findAdmin && findAdmin.role == "admin") {
               req.session.role = findAdmin.role;
               return res.redirect(301, "/admin/dashboard");
            }              
            return res.redirect(301, "/signup");
         }catch(error) {  
            console.log(error);
            return res.status(200).send(`<h1>Error ! This error is comming from controller.initial.js</h1>
                                       <h3>Error: ${error}</h3>` );
         }
      }
}

/**
 *@async
 *@function signup
 * @param {object} request
 * @param {*} response
 * @returns
 */
const signup = async (req, res) => {

   if (req.method == "GET") {
      if (req.session.role == "user") {
         return res.redirect(301, "/user/home");
      } else if (req.session.role == "admin") {
         return res.redirect(301, "/admin/dashboard");
      } else {
         return res.status(200).render("signupForm", {
            data: {
               errorMsg: undefined,
               emailErrorMsg: undefined,
               creationErrorMsg: undefined,
               successMsg: undefined,
            },
         });
      }
   }

   if (req.method == "POST") {
      try {
         const email = req.body.email;
         const password = req.body.password;

         const findUser = await userModel.find({ email: email });

         if (!findUser[0]) {
            const newUser = await userModel.create({
               email: email,
               password: password,
            });

            if (!newUser) {
               return res.status(404).render("signupForm", {
                  data: {
                     errorMsg: undefined,
                     emailErrorMsg: undefined,
                     creationErrorMsg: "New User Creation Failed Try Again !",
                     successMsg: undefined,
                  },
               });
            } else {
               req.session.userData = newUser;
               req.session.role = newUser.role;

               if (req.session.role == "user") {
                  return res.redirect(301, "/user/home");
               }
            }
         } else {
            return res.status(404).render("signupForm", {
               data: {
                  errorMsg: "Email already exits !",
                  emailErrorMsg: undefined,
                  creationErrorMsg: undefined,
                  successMsg: undefined,
               },
            });
         }
      } catch (error) {
         res.status(404).send(`<h1>Not Found ! From Signup ! </h1>`);
      }
   }

}

module.exports = {
   login,
   signup,
};
