// JavaScript Document

var dragObj;

document.addEventListener("mousedown", down, false);

function down(event) {
	if(~event.target.className.search(/drag/)) {
		var e = event.target;
		dragObj = {
			element: e,
			boundX: e.parentNode.offsetWidth - e.offsetWidth,
			boundY: e.parentNode.offsetHeight - e.offsetHeight,
			posX: event.clientX -e.offsetLeft,
			posY: event.clientY -e.offsetTop
		};
		
		dragObj.element.style.zIndex="100";
		document.addEventListener("mousemove", freeMovement, false);
	}
}

function freeMovement(event) {
	
	if (typeof(dragObj.element.mouseup) == "undefined")
		document.addEventListener("mouseup", drop, false);
	//Prevents redundantly adding the same event handler repeatedly
	
	dragObj.element.style.left = Math.max(0, Math.min(event.clientX - dragObj.posX, dragObj.boundX)) + "px";
    dragObj.element.style.top = Math.max(0, Math.min(event.clientY - dragObj.posY, dragObj.boundY)) + "px";
}

function drop() {
	dragObj.element.style.zIndex="1";
	
	document.removeEventListener("mousemove", freeMovement, false);
	document.removeEventListener("mouseup", drop, false);
	//alert("DEBUG_DROP");
}

function findPos(obj) { // Donated by `lwburk` on StackOverflow
    var curleft = curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return { x: curleft, y: curtop };
    }
}