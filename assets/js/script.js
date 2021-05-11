function tellFile() {
    eel.addFile();
}

eel.expose(addProgram);
function addProgram(filename, filepath) {
    var node = document.createElement("div")
    node.innerHTML = filename
    node.className = "list-element"
    node.setAttribute("data", filepath)
    document.getElementsByClassName("list")[0].appendChild(node)
}

async function loadPrograms() {
    var programs_raw = await eel.loadItems()();
    if (!programs_raw){return};
    var programs = JSON.parse(programs_raw);
    for (const [key, value] of Object.entries(programs)) {
        addProgram(key,value);
    }
}


//CALL
loadPrograms();