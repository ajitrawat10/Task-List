
const form=document.querySelector('#task-form');
const tasklist=document.querySelector('.collection');
const clearbtn=document.querySelector('.clear-tasks');
const filter=document.querySelector('#filter');
const taskinput=document.querySelector('#task');

loadeventlistener();

function loadeventlistener(){
    form.addEventListener('submit',addtask);
}

function addtask(e){
    if (taskinput.value===''){
        alert('Add some task');
    }

    const li=document.createElement('li');
    li.className='collection-item';
    li.appendChild(document.createTextNode(taskinput.value));

    
    const link=document.createElement('a');
    link.className='delete-item secondary-content';
    link.innerHTML='<i class=" fa fa-remove" </i>';
    li.appendChild(link);

    tasklist.appendChild(li);

    taskinput.value=''
    e.preventDefault();
}
function removetask(e){
  if (e.target.parentElement.classList.contains('delete-item')){
      e.target.parentElement.parentElement.remove();
  }
}
