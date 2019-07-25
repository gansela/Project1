

const NOTES_DOM = {
    taskName: document.getElementById("task-name"),
    taskDetailes: document.getElementById("task-details"),
    taskDate: document.getElementById("task-date"),
    taskTime: document.getElementById("task-time"),

    drawSelect: document.getElementById('select-draw'),

    divData: document.getElementById("data-div"),
}


let taskDB = {};


const sendBtn = document.querySelector("#form-btn")
sendBtn.addEventListener("click", addData)

NOTES_DOM.drawSelect.addEventListener('change', function () {
    const { drawSelect } = NOTES_DOM
    clearTable()
    for (let note in taskDB) {
        switch (drawSelect.value) {
            case "all":
                draw(taskDB)
                break;
            case "completed":
                if (taskDB[note].completed) drawTask(taskDB[note])
                break;
            case "not-completed":
                if (!taskDB[note].completed) drawTask(taskDB[note])

                break;

        }
    }
});

function addData() {
    const { taskName, taskDetailes, taskDate, taskTime } = NOTES_DOM
    const result = validateForm(taskName.value);
    if (!result) {
        alert("Task Exists")
        return;
    }
    taskDB[createId(taskName.value)] = new Task(taskName.value, taskDetailes.value, taskDate.value, taskTime.value);
    draw(taskDB)
}



function draw(inputObj) {
    clearTable()
    for (let note in inputObj) {
        if (!validateCard(inputObj[note])) {
            alert("missing fields")
            delete inputObj[note]
            return
        }
        drawTask(inputObj[note])
    }
    saveToLocalStorage("savedNotes", taskDB);
}


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

function init() {
    const initialData = JSON.parse(localStorage.getItem("savedNotes"));
    if (!initialData) return
    console.log(initialData)
    for (let dataNote in initialData) {
        taskDB[dataNote] = new Task(initialData[dataNote].taskName, initialData[dataNote].taskDetailes, initialData[dataNote].taskDate, initialData[dataNote].taskTime);
        taskDB[dataNote].taskId = initialData[dataNote].taskId
        taskDB[dataNote].completed = initialData[dataNote].completed
    }
    draw(taskDB);
}

init()