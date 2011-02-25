// JavaScript Document

var posX;
var posY;
var index;
var element;
var currentPos;

document.addEventListener("mousedown", drag, false);

function drag(event) {
	if(event.target.className == "square") {
		element = event.target;
		element.style.zIndex="100";
		currentPos = findPos(element);
		posX = event.clientX -currentPos.x; //-parseInt(element.offsetLeft);
		posY = event.clientY -currentPos.y; //-parseInt(element.offsetTop);
		document.addEventListener("mousemove", move, false);
	}
}

function move(event) {
	
	if (typeof(element.mouseup) == "undefined")
		document.addEventListener("mouseup", drop, false);
	//Prevents redundantly adding the same event handler repeatedly
	
	element.style.left = event.clientX - posX + "px";
	element.style.top = event.clientY - posY + "px";
}

function drop() {
	element.style.zIndex="1";
	document.removeEventListener("mousemove", move, false);
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