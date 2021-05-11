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