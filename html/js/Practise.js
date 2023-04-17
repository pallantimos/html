const todoObjectList = [];

class Todo_Class {
    constructor(item){
        this.ulElement =item;
    }

    add() {
        const todoInput = document.querySelector("#myInput").value;
        if (todoInput == "") {
            alert("Введите задачу!")
        } else {
            const todoObject = {
                id : todoObjectList.length + 1,
                todoText : todoInput,
                isDone : false,
            }

        todoObjectList.unshift(todoObject);

        try {
            //var serialObj = JSON.stringify(todoObject);
            localStorage.setItem(todoObject.id, JSON.stringify(todoObject));
        } catch (e) {
            if (e instanceof DOMException && e.name === "QuotaExceededError") {
            alert('Превышен лимит');
            }
        }
        this.display();
        document.querySelector("#myInput").value = '';

        }
    }

    refresh(){
         let i = 1;
    while(localStorage.getItem(i) != null){
        var returnObj = JSON.parse(localStorage.getItem(String(i)));
        todoObjectList.push(returnObj);
        i = i + 1;     
    }
    this.display();
    }

    done_undone(x) {
        const selectedTodoIndex = todoObjectList.findIndex((item)=> item.id == x);
        console.log(todoObjectList[selectedTodoIndex].isDone);
        if (todoObjectList[selectedTodoIndex].isDone == false) {
            todoObjectList[selectedTodoIndex].isDone = true;
          } else {
            todoObjectList[selectedTodoIndex].isDone = false;
          }
        this.display();
    }

    deleteallElement(z) {
        todoObjectList.splice(0);
        localStorage.clear()

        this.display();
    }

    deleteElement(z) {
        const selectedDelIndex = todoObjectList.findIndex((item)=> item.id == z);

        todoObjectList.splice(selectedDelIndex, 1);
        localStorage.removeItem(z)

        this.display();
    }

    sortAllTask(){
      this.display();
    }

    sortUnDoneTask(){
        this.ulElement.innerHTML = "";

        todoObjectList.forEach((object_item) => {
            if (!object_item.isDone) {
                const liElement = document.createElement("li");
                const delBtn = document.createElement("i");
    
                liElement.innerText = object_item.todoText;
                liElement.setAttribute("id", object_item.id);
    
                delBtn.setAttribute("id", object_item.id);
                delBtn.classList.add("far", "fa-trash-alt");
    
                liElement.appendChild(delBtn);
    
                delBtn.addEventListener("click", function(e) {
                    const deleteId = e.target.getAttribute("id");
                    myTodoList.deleteElement(deleteId);
                })
    
                liElement.addEventListener("click", function(e) {
                    const selectedId = e.target.getAttribute("id");
                    myTodoList.done_undone(selectedId);
                })

                this.ulElement.appendChild(liElement);
            }
        })
    }

    sortDoneTask(){
        this.ulElement.innerHTML = "";

        todoObjectList.forEach((object_item) => {
            if (object_item.isDone) {
                const liElement = document.createElement("li");
                const delBtn = document.createElement("i");
    
                liElement.innerText = object_item.todoText;
                liElement.setAttribute("id", object_item.id);
    
                delBtn.setAttribute("id", object_item.id);
                delBtn.classList.add("far", "fa-trash-alt");
    
                liElement.appendChild(delBtn);
    
                delBtn.addEventListener("click", function(e) {
                    const deleteId = e.target.getAttribute("id");
                    myTodoList.deleteElement(deleteId);
                })
    
                liElement.addEventListener("click", function(e) {
                    const selectedId = e.target.getAttribute("id");
                    myTodoList.done_undone(selectedId);
                })

                    liElement.classList.add("checked");

                this.ulElement.appendChild(liElement);
            }
        })
    }

    display() {
        this.ulElement.innerHTML = "";

        todoObjectList.forEach((object_item) => {

            const liElement = document.createElement("li");
            const delBtn = document.createElement("i");

            liElement.innerText = object_item.todoText;
            liElement.setAttribute("id", object_item.id);

            delBtn.setAttribute("id", object_item.id);
            delBtn.classList.add("far", "fa-trash-alt");

            liElement.appendChild(delBtn);

            delBtn.addEventListener("click", function(e) {
                const deleteId = e.target.getAttribute("id");
                myTodoList.deleteElement(deleteId);
            })

            liElement.addEventListener("click", function(e) {
                const selectedId = e.target.getAttribute("id");
                myTodoList.done_undone(selectedId);
            })

            if (object_item.isDone) {
                liElement.classList.add("checked");
            }

            this.ulElement.appendChild(liElement);
        })
    }
}

const listSection = document.querySelector("#myUL");

myTodoList = new Todo_Class(listSection);

myTodoList.refresh()


document.querySelector(".addBtn").addEventListener("click", function() {
    myTodoList.add()
})

document.querySelector(".allTasks").addEventListener("click", function() {
    myTodoList.display()
})

document.querySelector(".undoneTasks").addEventListener("click", function() {
    myTodoList.sortUnDoneTask()
})

document.querySelector(".doneTasks").addEventListener("click", function() {
    myTodoList.sortDoneTask()
})

document.querySelector(".delBtn").addEventListener("click", function() {
    myTodoList.deleteallElement()
})

document.querySelector("#myInput").addEventListener("keydown", function(e) {
    if (e.keyCode == 13) {
        myTodoList.add()
    }
})

