function createId(name) {
    const clock = new Date();
    const num1 = clock.getDate();
    const num2 = clock.getMonth() + 1;
    const num3 = clock.getHours();
    const num4 = clock.getMinutes();
    const num5 = clock.getSeconds();
    const result = name + num1.toString() + num2.toString() + num3.toString() + num4.toString() + num5.toString()
    return result
}



function clearTable() {
    NOTES_DOM.divData.innerHTML = ""
}


function validateCard(task) {
    const values = Object.values(task)
    for (let i = 0; i < values.length; i++) {
        if (values[i] === "") return false
    }
    return true
}

function validateForm(name) {
    if (Object.keys(taskDB).iength === 0) return true
    const searchId = createId(name)
    if (!taskDB[searchId]) return true
    else return false
}

function disolve(obj, opStart, opEnd, opFrame, opSpeed) {
    let isDone = false
    setInterval(function () {
        if (isDone) return
        obj.style.opacity = opStart
        opStart += opFrame
        if (opStart > opEnd) isDone = true
    }, opSpeed);
}

function mouseOff(btn) {
    btn.style.display = "none"
}
function mouseOn(btn) {
    btn.style.display = "inline-block"
}

function selectComplete(task){
    if (task.completed) task.completed = false
    else task.completed = true
}

function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}
// console.log("hryo")