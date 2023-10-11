const hh=document.getElementById("hour");
const mm=document.getElementById("minute");
const addtask=document.getElementById("addtask");
const task=document.getElementById("task");
const alert=document.getElementById("alert");
const tasks=document.getElementById("tasks");
const edit=document.getElementById("edit");
let alarm=new Audio("Working_Analog_Clock_using_Html_CSS_SVG___JavaScript_Clock_%2523shorts(256k).mp3")
const date= new Date();
let mid_hh= date.getHours();
let mid_mm= date.getMinutes();
window.alert(Notification.permission)
Notification.requestPermission().then((permission)=>{
         if(permission==="granted"){
            var noti= new Notification("daily2do wants to notify your task in time")
         }
      })
let notified= new Notification("it is a notification")

//function for infinity scrolling of time
function infinity_scroll(elem){
   num=Math.floor(elem.scrollTop/elem.offsetHeight);
   
   if(elem.scrollTop >=elem.scrollHeight-elem.offsetHeight){
      elem.scrollTop=0;
   }
};
try{
mm.addEventListener("scroll",()=>infinity_scroll(mm))


hh.addEventListener("scroll",()=>infinity_scroll(hh)
);

// function for adding a task to localStorage 
addtask.addEventListener("click",()=>{
   
   let input=task.value;
   let time_hh=Math.floor(hh.scrollTop/hh.scrollHeight*24)+1;   
   if(hh.scrollTop==0){
      time_hh=00
   }
   
   let   time_mm=Math.floor(mm.scrollTop/mm.scrollHeight*60)+1;
   if(mm.scrollTop==0){
      time_mm=0
   }
   let meridian =time_hh<12?"AM":"PM"
   
   let time=`${time_hh} : ${time_mm} ${meridian}`;
  
  if(input.trim() =="") {
     alert.innerText="* Please enter a task"
  }

  if(input.trim() !== "" ){
    let taskExists= false;
    
    for(let i=0;i<localStorage.length;i++){
     let key=localStorage.key(i);
     let value=localStorage.getItem(key);
   if(value==input){
      taskExists=true
      alert.innerText="* This task is already added"
      }
   }
   
  
  if(!taskExists){
     localStorage.setItem(time,input)
  }}
  task.value ="";
});
}catch(err){
   
}
// for showing localStorage items on page 


let arry_tasks = [];

// Step 1: Retrieve items from localStorage
for (let i = 0; i < localStorage.length; i++) {
  let key = localStorage.key(i);
  let value = localStorage.getItem(key);
  arry_tasks.push({KEY: key,VALUE: value});
}
// Step 2: Sorting the tasks timewise
arry_tasks.sort((a, b) => {
  let A = a.KEY.split(":").map(Number);
  let B = b.KEY.split(":").map(Number);
  if(A[0]===B[0]){
     return B[1] - A[1]
  }else{
     return B[0] - A[0];
  
  }
});

arry_tasks.forEach((item) => {
 
  let elem = document.createElement("li");
  elem.innerHTML = `<p>${item.KEY}</p> <p>${item.VALUE}</p>`;
  
  // Add the 'elem' to the page or append it to a container element.
  
    try{
       tasks.appendChild(elem)
    }catch(err){}
 });

// adding a click event on Every task

try{
tasks.addEventListener('click',(event)=>{
   
      edit.classList.toggle('active')
      event.target.classList.toggle('active')
  if(event.target.parentNode.children[1]===event.target){
   a=event.target.innerText
   b=event.target
   }
   
  c= event.target.parentNode.children[0].innerText
})

edit.addEventListener('click',()=>{
  try{
   let inputField=document.createElement('input')
   inputField.type='text'
   inputField.value=a
   inputField.id="inputField"
   b.replaceWith(inputField)
   }catch(err){}
});
// for saving the task edited by user

document.addEventListener('keydown',(event)=>{
   let inputField=document.getElementById("inputField");
   if(event.key==="Enter"){
      let newTask=inputField.value;
      localStorage.setItem(c,newTask);
      let para=document.createElement("p");
      para.innerText=localStorage.getItem(c);
      inputField.replaceWith(para);
   }
})




//For reminding a task which time to do
for(let i=0;i<localStorage.length;i++){
   let item=document.querySelectorAll("li");
   let hour =item[i].firstElementChild.innerText;
   let hours=hour.substring(0,hour.indexOf(':'));
   let minutes=hour.substring(hour.indexOf(':')+1,7);
   
   if(hours==mid_hh && minutes==mid_mm){
      alarm.play()
      new Notification(item[i])
   }
   
   if(hours < mid_hh){
     item[i].style.backgroundColor="red"
     }
   if(hours==mid_hh){  
      if(minutes < mid_mm){
           item[i].style.backgroundColor="red"
        }
       }
    
     
      
   
}
}catch(err){}
