var list_node = document.getElementsByClassName("list")[0];
var selected_node;

function selectNode(item, event) {
    selected_node = document.getElementsByClassName("selected-element")[0];
    if (selected_node) selected_node.className = "list-element";
    item.className += " selected-element";
    if (selected_node == item) {
        item.className = "list-element";
    }
}

function sortAZ() {
    var list = document.getElementsByClassName("list")[0];
    var items = list.childNodes;
    var itemsArr = [];
    for (var i in items) {
        if (items[i].nodeType == 1) { // get rid of the whitespace text nodes
            itemsArr.push(items[i]);
        }
    }

    itemsArr.sort(function(a, b) {
    return a.innerHTML == b.innerHTML
            ? 0
            : (a.innerHTML > b.innerHTML ? 1 : -1);
    });

    for (i = 0; i < itemsArr.length; ++i) {
        list.appendChild(itemsArr[i]);
    }
}

function sortZA() {
    var list = document.getElementsByClassName("list")[0];
    var items = list.childNodes;
    var itemsArr = [];
    for (var i in items) {
        if (items[i].nodeType == 1) { // get rid of the whitespace text nodes
            itemsArr.push(items[i]);
        }
    }

    itemsArr.sort(function(a, b) {
    return a.innerHTML == b.innerHTML
            ? 0
            : (a.innerHTML > b.innerHTML ? 1 : -1);
    });

    for (i = 0; i < itemsArr.length; ++i) {
    list.prepend(itemsArr[i]);
    }
}

function sortDate() {
    var list = document.getElementsByClassName("list")[0];
    var items = list.childNodes;
    var itemsArr = [];
    for (var i in items) {
        if (items[i].nodeType == 1) { // get rid of the whitespace text nodes
            itemsArr.push(items[i]);
        }
    }

    itemsArr.sort(function(a, b) {
    return a.getAttribute("date") == b.getAttribute("date")
            ? 0
            : (a.getAttribute("date") > b.getAttribute("date") ? 1 : -1);
    });

    for (i = 0; i < itemsArr.length; ++i) {
    list.prepend(itemsArr[i]);
    }
}

function bindContextMenu(node) {
    node.addEventListener('contextmenu', function(e) {
        cntx_node = document.getElementById("context-element-id")
        cntx_node.style.top = e.clientY.toString() + "px";
        cntx_node.style.left = e.clientX.toString() + "px";
        cntx_node.style.display = "block";
        window.setTimeout(function(){
            cntx_node.style.transform = "none";
            cntx_node.style.opacity = "1";
        }, 20)
        $("#context-element-id").data("data-node", node);
        e.preventDefault();
    }, false);     
    $(document).bind("click", function(event) {
        cntx_node = document.getElementById("context-element-id")
        cntx_node.style.opacity = "0";
        cntx_node.style.transform = "translateY(10px) rotate(5deg)";
        window.setTimeout(function(){
            cntx_node.style.display = "none";
        }, 200)
    });
}

function renameElement(e) {
    node = $("#context-element-id").data("data-node");
    var changedName = prompt("Rename:", node.childNodes[1].innerHTML);
    if (!changedName) return;
    eel.renameApp(node.childNodes[1].innerHTML, changedName);
    node.childNodes[1].innerHTML = changedName;
}

function removeElement(e) {
    node = $("#context-element-id").data("data-node");
    var proceed = confirm("Are you sure you want to remove " + node.childNodes[1].innerHTML + " from the list?");
    if (!proceed) return;
    eel.removeApp(node.childNodes[1].innerHTML);
    node.remove();
}

function tellFile() {
    eel.addFile();
}

eel.expose(addProgram);
function addProgram(filename, filepath, date) {
    var node = document.createElement("div")
    var img = document.createElement("img")
    var text = document.createElement("span")
    text.innerHTML = filename
    img.src = "/cache/" + filename + ".png"
    node.appendChild(img)
    node.appendChild(text)
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

//CALLS
loadPrograms();