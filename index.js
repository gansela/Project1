// 1. a model for manipulation and draw

const NOTES_DOM = {
    form: document.querySelector("#task-form"),
    
    taskName: document.querySelector("#task-name"),
    taskDetailes: document.querySelector("#task-details"),
    taskDate: document.querySelector("#task-date"),
    taskTime: document.querySelector("#task-time"),

    drawSelect: document.querySelector('#select-draw'),

    requiered: document.querySelector("#requiered"),
    
    divData: document.querySelector("#data-div"),
}

// 2. i choose to work with an object as the main database instead of an array for practice

let taskDB = {};

// 3.syncing current date to form date value aand disabeling past dates

function syncDate() {
    const {taskDate} = NOTES_DOM
    const today = syncDateInput();
    taskDate.min = today
    taskDate.value = today 
}

// 4.listener to all the inputs and buttens, sending to validation function

function listeners(){
    const {taskName, taskDetailes, taskDate, taskTime, form, requiered} = NOTES_DOM
    taskName.addEventListener("input", function(){
        validateCard()
    })
    taskDetailes.addEventListener("input", function(){
        validateCard()
    })
    taskDate.addEventListener("input", function(){
        validateCard()
    })
    taskTime.addEventListener("input", function(){
        validateCard()
    })
    form.addEventListener("reset", function(){
        validateCard()
        requiered.innerText = ""
        sendBtn.disabled = true
    })
}

// 5. selecting and eventing the main form button

const sendBtn = document.querySelector("#form-btn")
sendBtn.addEventListener("click", addData)

// 6.eventing the switch display select input.

NOTES_DOM.drawSelect.addEventListener('change', function () {
    draw(taskDB)
});

// 7. destructing the form inputs creatinng ID for the task,
//  validating and creating new task class in the database

function addData() {
    const { taskName, taskDetailes, taskDate, taskTime } = NOTES_DOM
    const result = validateForm(taskName.value);
    if (!result) {
        alert("Task Exists")
        return;
    }
    const newDate = flipDate(taskDate.value)
    const newId = createId(taskName.value)
    const newCompleted = false
    taskDB[createId(taskName.value)] = new Task(taskName.value, taskDetailes.value, newDate, taskTime.value, newId, newCompleted);
    draw(taskDB)
}

// 8.recives the database object iteraties each task, 
// validates it and sends it to the dom manipulation

function draw(taskDB) {
    const { drawSelect } = NOTES_DOM
    clearTable()
    for (let note in taskDB) {
        switch (drawSelect.value) {
            case "completed":
                if (taskDB[note].completed) drawTask(taskDB[note])
                break;
            case "not-completed":
                if (!taskDB[note].completed) drawTask(taskDB[note])
                break;
            case "all":
                drawTask(taskDB[note])
                break;
        }
    }
    saveToLocalStorage("savedNotes", taskDB);
}

// 9.recives each validated task, creating it as a posted note through
//  the Task mathod and appends it to the DOM

function drawTask(note) {
    const { divData, taskName } = NOTES_DOM
    const newNote = note.createNote();
    if (!newNote) return;
    divData.append(newNote)
    if (newNote.id === createId(taskName.value)) {
        newNote.style.opacity = "0"
        disolve(newNote, 0, 1, 0.1, 100)
    }
}

// 10. parcing local storage after refreshing
// makes sure after parsing every task is part of the Task Class,initians the liseteners and syncing

function init() {
    const initialData = JSON.parse(localStorage.getItem("savedNotes"));
    if (!initialData) return
    for (let dataNote in initialData) {
        taskDB[dataNote] = new Task(initialData[dataNote].taskName, initialData[dataNote].taskDetailes, initialData[dataNote].taskDate,
            initialData[dataNote].taskTime, initialData[dataNote].taskId, initialData[dataNote].completed);
    }
    draw(taskDB);
    listeners()
    syncDate() 
}

init()
