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
    list.appendChild(itemsArr[i]);
    }
}
