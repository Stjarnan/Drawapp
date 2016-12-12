var canvas = document.getElementById('canvas-draw');
var ctx = canvas.getContext('2d');
var draw = false;
var positionX = new Array();
var positionY = new Array();
var mouseDrag = new Array();
var currentColor = new Array();
var rect = canvas.getBoundingClientRect();
var canvasDiv = document.getElementById('canvas');
var button = document.getElementsByTagName('button');
var color = "black";
canvas.width = canvasDiv.offsetWidth;
canvas.height = canvasDiv.offsetHeight;
function drawPosition(x, y, movement) {
    positionX.push(x);
    positionY.push(y);
    mouseDrag.push(movement);
    currentColor.push(color);
}
function buttonEvents() {
    Array.from(button).forEach(function (d) {
        d.addEventListener('click', function () {
            Array.from(button).forEach(function (y) {
                y.classList.remove('selected');
            });
            event.target.classList.add("selected");
            if (event.target.classList.contains('selected') && event.target.id == 'black') {
                color = "black";
            }
            else if (event.target.classList.contains('selected') && event.target.id == 'green') {
                color = "#66ff33";
            }
            else if (event.target.classList.contains('selected') && event.target.id == 'red') {
                color = "#f22821";
            }
            else if (event.target.classList.contains('selected') && event.target.id == 'blue') {
                color = "#4286f4";
            }
        });
    });
}
function redraw() {
    // Clear the canvas
    ctx.clearRect(0, 0, ctx.width, ctx.height);
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
        ctx.strokeStyle = currentColor[i];
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
