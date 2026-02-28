let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

document.getElementById("taskInput")
.addEventListener("keypress", function(e){
    if(e.key === "Enter") addTask();
});

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    let input = document.getElementById("taskInput");
    let text = input.value.trim();

    if(text === "") return alert("Enter task!");

    tasks.push({
        text: text,
        completed: false,
        date: new Date().toLocaleString()
    });

    input.value="";
    saveTasks();
    displayTasks();
}

function displayTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML="";

    let filteredTasks = tasks.filter(task=>{
        if(filter==="completed") return task.completed;
        if(filter==="pending") return !task.completed;
        return true;
    });

    filteredTasks.forEach((task,index)=>{

        let li=document.createElement("li");

        li.innerHTML=`
        <div>
            <input type="checkbox"
                ${task.completed ? "checked" : ""}
                onchange="toggleTask(${index})">

            <span class="${task.completed?'completed':''}">
                ${task.text}
                <br>
                <small>${task.date}</small>
            </span>
        </div>

        <div>
            <button onclick="editTask(${index})">Edit</button>
            <button onclick="deleteTask(${index})">X</button>
        </div>
        `;

        list.appendChild(li);
    });

    updateCount();
}

function toggleTask(index){
    tasks[index].completed =
        !tasks[index].completed;

    saveTasks();
    displayTasks();
}

function deleteTask(index){
    tasks.splice(index,1);
    saveTasks();
    displayTasks();
}

function editTask(index){
    let newTask = prompt("Edit task:", tasks[index].text);
    if(newTask !== null){
        tasks[index].text = newTask;
        saveTasks();
        displayTasks();
    }
}

function filterTasks(type){
    filter = type;
    displayTasks();
}

function clearAll(){
    if(confirm("Delete all tasks?")){
        tasks=[];
        saveTasks();
        displayTasks();
    }
}

function updateCount(){
    document.getElementById("taskCount").innerText =
        `Total Tasks: ${tasks.length}`;
}

displayTasks();