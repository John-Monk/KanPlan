const deleteBtn = document.querySelectorAll('#del')
const todoItems = document.querySelectorAll('#editBtn')
const doingItems = document.querySelectorAll('span.doing')
const doneItems = document.querySelectorAll('span.done')

Array.from(deleteBtn).forEach(el=> el.addEventListener('click', deleteTodo))
Array.from(todoItems).forEach(el => el.addEventListener('click', markDoing))
// Array.from(doingItems).forEach(el => el.addEventListener('click', markDoing))
Array.from(doneItems).forEach(el => el.addEventListener('click', markDone))



async function deleteTodo(){
    const todoId = this.parentNode.dataset.id
    console.log(todoId)
    try{
        const response = await fetch('todo/deleteTodo', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

// async function markTodo() {
//     const todoId = this.parentNode.dataset.id


//     try{
//         const response = await fetch('todos/markTodo', {
//             method: 'put',
//             headers: {'Content-type': 'application/json'},
//             body: JSON.stringify({
//                 'todoIdFromJSFile': todoId
//             })
//         })
//         const data = await response.json() 
//         console.log(data)

//         }catch(err){
//             console.log(err)
//         }
// }


async function markDoing() {
    console.log('markDoing called');
  
    const todoId = this.parentNode.dataset.id;
  
    const doingcolumn = document.getElementsByClassName('kanplan-column-doing')[0];
  
    try {
      const response = await fetch('todo/markDoing', {
        method: 'put',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          todoIdFromJSFile: todoId
        })
      });
  
      const data = await response.json();
  
      console.log(data);
  
      if (data.status === 'doing') {
        doingcolumn.appendChild(this.parentNode);
        // location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  }
  


async function markDone(){ //function to add task to the done column
    const todoId = this.parentNode.dataset.id

    const doneColumn = document.getElementsByClassName('kanplan-column-done')

    try{
        const response = await fetch('todo/markDone', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        location.reload()

        if(data.status === 'done'){
            doneColumn.appendChild(this.parentNode.dataset)
                    location.reload()
        }
        console.log(data)

    }catch(err){
        console.log(err)
    }
}


