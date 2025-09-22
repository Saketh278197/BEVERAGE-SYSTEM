-- HOW TO RUN --
DOWNLOAD ZIP FILE
EXTRACT IT
OPEN TERMINAL 
   TYPE-  1.npm init
          2.npm install -D parcel (after this you will get package.json file   remove "main":"index.js" these object)
          3.Now type npm start 
          4.copy link and open in browser



core of the project is redux part 

How it works 

when the form is submitted the the addToInQueue method is invoked then the submitted data is pushed into InTheQueue then the component is re render because the initial state is changes in the redux slice the userDetails component is visible in the InTheQueue

until  this ok what happens when user click on userdetails card  for userdetails card there is onclick function to move the user from InTheQueue to MixingQueue when again click MixingQueue move to ReadyQueue again click means the order is collected  
