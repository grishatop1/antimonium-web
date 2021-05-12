function tellFile() {
    eel.addFile();
}

eel.expose(addProgram);
function addProgram(filename, filepath, date) {
    var node = document.createElement("div")
    node.innerHTML = filename
    node.className = "list-element"
    node.setAttribute("data", filepath)
    node.setAttribute("date", date)
    node.addEventListener('click', event => {
        selectNode(node, event);
    })
    bindContextMenu(node);
    document.getElementsByClassName("list")[0].appendChild(node);
}

async function loadPrograms() {
    var programs_raw = await eel.loadItems()();
    if (!programs_raw){return};
    var programs = JSON.parse(programs_raw);
    for (const [key, value] of Object.entries(programs)) {
        addProgram(key,value[0], value[1]);
    }
}

function setStopState(name) {
    button_node = document.getElementById("play-btn");
    button_node.innerHTML = "Stop " + name;
    button_node.onclick = stop;
    $(".glow-effect").css("opacity", "1");
}

eel.expose(setNormalState);
function setNormalState() {
    button_node = document.getElementById("play-btn");
    button_node.innerHTML = "PLAY";
    button_node.onclick = run;
    $(".glow-effect").css("opacity", "0");
}

async function run() {
    var selected_node = document.getElementsByClassName("selected-element")[0];
    if (!selected_node) return;
    var filename = selected_node.innerHTML;
    var filepath = selected_node.getAttribute("data");
    var doClose = document.getElementById("c1").checked;
    var complete = await eel.runApp(filename, filepath, doClose)();
    if (complete) {
        setStopState(filename);
        if (doClose) window.close();
    } else {
        alert("Please run Antimonium as administrator.");
    }
    
}

function stop() {
    setNormalState();
    eel.stopApp();
}

//CALL
document.oncontextmenu = new Function("return false;")
loadPrograms();