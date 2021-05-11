function tellFile() {
    eel.addFile();
}

eel.expose(addProgram);
function addProgram(filename, filepath) {
    var node = document.createElement("div")
    node.innerHTML = filename
    node.className = "list-element"
    node.setAttribute("data", filepath)
    node.addEventListener('click', event => {
        selectNode(node, event);
    })
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

function run() {
    var selected_node = document.getElementsByClassName("selected-element")[0];
    if (!selected_node) return;
    var filename = selected_node.innerHTML;
    var filepath = selected_node.getAttribute("data");
    var doClose = document.getElementById("c1").checked;
    setStopState(filename);
    eel.runApp(filename, filepath, doClose);
    if (doClose) window.close();
}

function stop() {
    setNormalState();
    eel.stopApp();
}

//CALL
loadPrograms();