// the main class, it has constructor and a mathod that creates
//  the card that goes into the dom after recieving the inputs

class Task {
    constructor(_name, _detailes, _date, _hour, _id, _completed) {
        this.taskName = _name
        this.taskDetailes = _detailes
        this.taskDate = _date;
        this.taskTime = _hour;
        this.taskId = _id;
        this.completed = _completed
    }

    createNote() {
        const { taskName, taskDetailes, taskDate, taskTime, taskId, completed } = this;
        const noteDiv = document.createElement("div");
        noteDiv.id = taskId;
        noteDiv.classList.add("card", "note")
        noteDiv.addEventListener("mouseover", function () {
            mouseOn(deleteButton)
            mouseOn(completeButton)

        })
        noteDiv.addEventListener("mouseout", function () {
            mouseOff(deleteButton)
            mouseOff(completeButton)

        })
        const noteBody = document.createElement("Div");
        noteBody.classList.add("card-Body");
        const noteHeader = document.createElement("h4");
        noteHeader.classList.add("card-title", "ml-5", "mt-5", "pt-3");
        noteHeader.innerText = taskName
        const noteText = document.createElement("p");
        noteText.classList.add("card-text", "ml-5", "mr-5", "note-text");
        noteText.innerText = taskDetailes;
        const noteTime = document.createElement("li");
        noteTime.classList.add("card-time", "ml-5");
        noteTime.innerText = `${taskDate} \n ${taskTime}`;
        const deleteButton = document.createElement("Button")
        deleteButton.classList.add("btn", "btn-danger", "delete")
        deleteButton.addEventListener("click", function () {
            delete taskDB[noteDiv.id]
            draw(taskDB)
        })
        const deleteSpan = document.createElement("span")
        deleteSpan.classList.add("glyphicon", "glyphicon-remove")
        const completeButton = document.createElement("Button")
        completeButton.classList.add("btn", "btn-primary", "complete")
        completeButton.addEventListener("click", function () {
            selectComplete(taskDB[noteDiv.id])
            draw(taskDB)
        })
        const completeSpan = document.createElement("span")
        completeSpan.classList.add("glyphicon", "glyphicon-check")
        if (completed) {
            noteDiv.classList.add("selected")
            completeSpan.className = "glyphicon glyphicon-edit"
        }
        completeButton.append(completeSpan)
        deleteButton.append(deleteSpan)
        noteBody.append(noteHeader, noteText, noteTime, deleteButton, completeButton)
        noteDiv.append(noteBody)
        return noteDiv
    }
}




