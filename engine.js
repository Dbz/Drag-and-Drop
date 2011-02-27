// JavaScript Document

var dragObj;

document.addEventListener("mousedown", down, false);

function down(event) {
	if(~event.target.className.search(/drag/)) {
		dragObj = makeObj(event.target);
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

function makeObj(e) {
	obj = new Object();
	obj.element = e;
	
	obj.boundX = e.parentNode.offsetWidth - e.offsetWidth;
	obj.boundY = e.parentNode.offsetHeight - e.offsetHeight;
	
	obj.posX = event.clientX - e.offsetLeft;
	obj.posY = event.clientY - e.offsetTop;
	
	return obj;
}

function makeBoundlessObj(e) {
	obj = new Object();
	obj.element = e;
	
	obj.boundX = e.parentNode.offsetWidth - e.offsetWidth;
	obj.boundY = e.parentNode.offsetHeight - e.offsetHeight;
	
	obj.posX = event.clientX - e.offsetLeft;
	obj.posY = event.clientY - e.offsetTop;
	
	var curleft = curtop = 0;
	if (e.offsetParent) {
        do {
            curleft += e.offsetLeft;
            curtop += e.offsetTop;
			if(~e.className.search(/bound/)) {
				obj.boundX = curleft - obj.element.offsetWidth;
				obj.boundY = curtop - obj.element.offsetHeight;
				break;
			}
				
        } while (e = e.offsetParent);
    }
	
	return obj;
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