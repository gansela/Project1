function createId(name){
    const clock = new Date();
    const num1 = clock.getDate();
    const num2 = clock.getMonth() + 1;
    const num3 = clock.getHours();
    const num4 = clock.getMinutes();
    const num5 = clock.getSeconds();
    const result = name + num1.toString() + num2.toString() + num3.toString() + num4.toString() + num5.toString()
    return result
}


function Task(_name, _detailes, _date, _hour) {
    this.taskName = _name
    this.taskDetailes = _detailes
    this.taskDate = _date;
    this.taskTime = _hour;
    this.taskId = createId(_name);
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
    const searchId = createId(name)
    const temp = taskArray.findIndex((item)=>{return item.taskId === searchId})
    console.log(temp)
    if (temp !== -1) return false;
    else return true;
}



// console.log("hryo")