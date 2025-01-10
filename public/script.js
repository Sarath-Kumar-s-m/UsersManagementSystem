 
  
 
 function toggle(){
     let element = document.getElementById('showPassword');
     let input = document.getElementById('password');
  
     if(element.checked){
           input.type = 'text'
         }else{
           input.type = 'password'
         }       
  }


  async function search(){
       let value = document.getElementById('input-1').value;
       if(value == ""){
         window.alert('Enter somthing in the input box !') 
       }else{
           try{
            const response = await axios.get('http://localhost:3000/admin/dashboard/api/v1/search');
            console.log(response)        
           }catch(error){
             console.log(error)
           }
       }
 }