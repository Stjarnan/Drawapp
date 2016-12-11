var canvas = document.getElementById('canvas-draw');
var ctx = canvas.getContext('2d');
var draw = false;
var positionX = new Array();
var positionY = new Array();
var mouseDrag = new Array();
var rect = canvas.getBoundingClientRect();
var canvasDiv = document.getElementById('canvas');
var button = document.getElementsByTagName('button');
canvas.width = canvasDiv.offsetWidth;
canvas.height = canvasDiv.offsetHeight;
function drawPosition(x, y, movement) {
    positionX.push(x);
    positionY.push(y);
    mouseDrag.push(movement);
}
function buttonEvents() {
    Array.from(button).forEach(function (d) {
        d.addEventListener('click', function () {
            Array.from(button).forEach(function (y) {
                y.classList.remove('selected');
            });
            event.target.classList.add("selected");
        });
    });
}
function redraw() {
    // Clear the canvas
    ctx.clearRect(0, 0, ctx.width, ctx.height);
    ctx.strokeStyle = "black";
    ctx.lineJoin = "round";
    ctx.lineWidth = 2;
    for (var i = 0; i < positionX.length; i++) {
        ctx.beginPath();
        if (mouseDrag[i] && i) {
            ctx.moveTo(positionX[i - 1], positionY[i - 1]);
        }
        else {
            ctx.moveTo(positionX[i] - 1, positionY[i]);
        }
        ctx.lineTo(positionX[i], positionY[i]);
        ctx.closePath();
        ctx.stroke();
    }
}
// Event listeners
canvas.addEventListener("mousedown", function (e) {
    draw = true;
    drawPosition(e.pageX - rect.left, e.pageY - rect.top);
    redraw();
});
canvas.addEventListener("mousemove", function (e) {
    if (draw) {
        drawPosition(e.pageX - rect.left, e.pageY - rect.top, true);
        redraw();
    }
});
canvas.addEventListener("mouseup", function (e) {
    draw = false;
});
canvas.addEventListener("mouseleave", function (e) {
    draw = false;
});
buttonEvents();
