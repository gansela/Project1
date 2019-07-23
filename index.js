

const NOTES_DOM = {
    taskName: document.getElementById("task-name"),
    taskDetailes: document.getElementById("task-details"),
    taskDate: document.getElementById("task-date"),
    taskTime: document.getElementById("task-time"),

    divData: document.getElementById("data-div"),
}


let taskArray = [];


const sendBtn = document.querySelector("#form-btn")
sendBtn.addEventListener("click", addData)


function addData() {
    const { taskName, taskDetailes, taskDate, taskTime } = NOTES_DOM


    const result = validateForm(taskName.value);
    if (!result) {
        alert("Task Exists")
        return;
    }


    taskArray.push(new Task(taskName.value, taskDetailes.value, taskDate.value, taskTime.value))
    // saveToLocalStorage("taskData", taskArray);
    draw(taskArray)
}



function draw(inputArray) {
    clearTable()
    for (let i = 0; i < inputArray.length; i++) {
        if (!validateCard(inputArray[i])) {
            alert("missing fields")
            inputArray.splice(i)
            return
        }
        drawTask(inputArray[i])
    }
}


function drawTask(note) {
    const { divData } = NOTES_DOM
    const newNote = createNote(note);
    if (!newNote) return;
    divData.append(newNote)
}


function createNote(note) {
    const { taskName, taskDetailes, taskDate, taskTime, taskId } = note;
    const noteDiv = document.createElement("div");
    noteDiv.id = taskId;
    noteDiv.classList.add("card", "note")
    const noteBody = document.createElement("Div");
    noteBody.classList.add("card-Body");
    const noteHeader = document.createElement("h4");
    noteHeader.classList.add("card-title");
    noteHeader.innerText = taskName
    const noteText = document.createElement("p");
    noteText.classList.add("card-text");
    noteText.innerText = taskDetailes;
    const noteTime = document.createElement("li");
    noteTime.classList.add("card-time");
    noteTime.innerText = taskDate + "  " + taskTime;
    //     const deleteSpan = document.createElement("span")
    //     deleteSpan.classList.add("delete")
    //     const deleteButton = document.createElement("Button")
    //     deleteButton.innerText = "🗑";
    //     deleteButton.classList.add("btn", "btn-danger")
    //     deleteButton.addEventListener("click", function () {
    //         deleteCard(vacationName)
    //         draw(vacationArray)
    //     })
    //     const likeSpan = document.createElement("span")
    //     const likeButton = document.createElement("Button");
    //     likeSpan.classList.add("like")
    //     likeButton.innerText = "👍" + likesNumber;
    //     likeButton.classList.add("btn", "btn-primary")
    //     likeButton.addEventListener("click", function () {
    //         addLike(vacation, likesNumber)
    //         draw(vacationArray)
    //     })
        noteBody.append(noteHeader, noteText, noteTime)
        // deleteSpan.append(deleteButton)
        // likeSpan.append(likeButton)
        noteDiv.append(noteBody)
        return noteDiv
}