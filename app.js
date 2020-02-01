// Define UI Variables
const form=document.querySelector('#task-form');
const tasklist=document.querySelector('.collection');
const clearbtn=document.querySelector('.clear-tasks');
const filter=document.querySelector('#filter');
const taskinput=document.querySelector('#task');

// Load all event listeners 
loadeventlistener();

function loadeventlistener(){
    // DOM Load event
    document.addEventListener('DOMContentLoaded',gettasks);
    // Add task event
    form.addEventListener('submit',addtask);
    // Remove task event
    tasklist.addEventListener('click',removetask);
    // Clear task event
     clearbtn.addEventListener('click',cleartask);
    // Filter task
     filter.addEventListener('keyup',filtertask);


}
// Get task from local storage
function gettasks(){
    let tasks;
    if (localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
   tasks.forEach(function(task){
     // Create li element
    const li=document.createElement('li');
    // Add class
    li.className='collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create a link element
    const link=document.createElement('a');
    // Add class
    link.className='delete-item secondary-content';
    // Add icon html
    link.innerHTML='<i class=" fa fa-remove" </i>';
    // Append link to li
    li.appendChild(link);
    // Append li to ul
    tasklist.appendChild(li);
   })
}

// Add Task
function addtask(e){
    if (taskinput.value===''){
        alert('Add some task');
    }
     // Create li element
    const li=document.createElement('li');
    // Add class
    li.className='collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskinput.value));
    // Create a link element
    const link=document.createElement('a');
    // Add class
    link.className='delete-item secondary-content';
    // Add icon html
    link.innerHTML='<i class=" fa fa-remove" </i>';
    // Append link to li
    li.appendChild(link);
    // Append li to ul
    tasklist.appendChild(li);
   //  Store in local storage
   storetaskinlocalstorage(taskinput.value);
    // Clear input    
    taskinput.value='';

    e.preventDefault();
}
// Store Task
function storetaskinlocalstorage(task){
    let tasks;
    if (localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

// Remove Task
function removetask(e){
  if (e.target.parentElement.classList.contains('delete-item'))
  {
       if(confirm('Are You Sure?'))
       {
       e.target.parentElement.parentElement.remove();
      // Remove from local storage
      removetaskfromlocalstorage(e.target.parentElement.parentElement);
  }
}

}
// Remove from local storage
function removetaskfromlocalstorage(taskitem){
    let tasks;
    if (localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task,index){
        if (taskitem.textContent===task){
            tasks.splice(index,1);
        }

    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
}
   
// Clear Tasks
function cleartask(){

    //tasklist.innerHTML='';
    //OR
    //Below one is faster than above
    while(tasklist.firstChild){
        tasklist.removeChild(tasklist.firstChild);
    }

    // Clear from local storage
    cleartasksfromlocalstorage();
}
  // Clear from local storage
  function cleartasksfromlocalstorage(){
      localStorage.clear(); 
  }

// Filter Tasks
function filtertask(e){
    const text=e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text)!=-1){
            task.style.display = 'block';
        }
        else{
            task.style.display = 'none';
        }
    })
}
