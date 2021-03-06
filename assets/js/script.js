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
    var filename = selected_node.childNodes[1].innerHTML;
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

//CALLS
document.oncontextmenu = new Function("return false;")