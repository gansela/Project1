// missalenious functions


// 1. creates an id for each task the includes the task name and creation time in seconds
// (i wanted it to be until seconds and no more for validation of accidental double click)
function createId(name) {
    const clock = new Date();
    const num1 = clock.getDate().toString();
    const num2 = (clock.getMonth() + 1).toString();
    const num3 = clock.getHours().toString();
    const num4 = clock.getMinutes().toString();
    const num5 = clock.getSeconds().toString();
    const result = `TASK_${name}_${num1 + num2 + num3 + num4 + num5}`
    return result
}

// 2. a function tha convers the input data mmddyyyy to ddmmyyyy
function flipDate(oldDate) {
    const splitDate = oldDate.split('-');
    const newDate = `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`;
    return newDate
}

// 3 clears the DOM manipulations
function clearTable() {
    NOTES_DOM.divData.innerHTML = ""
}

// 4. validats that no inputs is empty
function validateCard(task) {
    const values = Object.values(task)
    for (let i = 0; i < values.length; i++) {
        if (values[i] === "") return false
    }
    return true
}

// 5. making sure the is no id repitition
function validateForm(name) {
    const searchId = createId(name)
    if (!taskDB[searchId]) return true
    else return false
}

// 6. a function for visual transition through opacity manipultion
// (i built it and im proud of it)
function disolve(obj, opStart, opEnd, opFrame, opSpeed) {
    let isDone = false
    setInterval(function () {
        if (isDone) return
        obj.style.opacity = opStart
        opStart += opFrame
        if (opStart > opEnd) isDone = true
    }, opSpeed);
}

// 7-8. mking sure buttons will be only visable when hovering the note
function mouseOff(btn) {
    btn.style.display = "none"
}
function mouseOn(btn) {
    btn.style.display = "inline-block"
}

// 9. toggling the complete status for the cards
function selectComplete(task) {
    task.completed = !task.completed
}

// 10.stringifies the local storage
function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}
