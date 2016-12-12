
let canvas : any = document.getElementById('canvas-draw');
let ctx = canvas.getContext('2d');
let draw = false;
let positionX = new Array();
let positionY = new Array();
let mouseDrag = new Array();
let currentColor = new Array();
let rect = canvas.getBoundingClientRect();
let canvasDiv : any = document.getElementById('canvas'); 
let button : any = document.getElementsByTagName('button');
let color = "black";




canvas.width = canvasDiv.offsetWidth;
canvas.height = canvasDiv.offsetHeight;


function drawPosition(x, y, movement) {
    positionX.push(x);
    positionY.push(y);
    mouseDrag.push(movement);
    currentColor.push(color);
}


function buttonEvents () {

            Array.from(button).forEach( d => {
                d.addEventListener('click', () => {
                    Array.from(button).forEach((y) => {
                       y.classList.remove('selected'); 
                    });
                    event.target.classList.add("selected");

                    if (event.target.classList.contains('selected') && event.target.id == 'black') {
                        color = "black";
                    } else if (event.target.classList.contains('selected') && event.target.id == 'green') {
                        color = "#66ff33";
                    } else if (event.target.classList.contains('selected') && event.target.id == 'red') {
                        color = "#f22821";
                    } else if (event.target.classList.contains('selected') && event.target.id == 'blue') {
                        color = "#4286f4";
                    }

                    });
             });
        
             
        
}


function redraw () {
    // Clear the canvas
    ctx.clearRect(0, 0, ctx.width, ctx.height);


    ctx.lineJoin = "round";
    ctx.lineWidth = 2;

    for( let i = 0; i < positionX.length; i++) {
        ctx.beginPath();

        if(mouseDrag[i] && i) {
            ctx.moveTo(positionX[i-1], positionY[i-1]);
        } else {
            ctx.moveTo(positionX[i]-1, positionY[i]);
        }

        ctx.lineTo(positionX[i], positionY[i]);
        ctx.closePath();
        ctx.stroke();
        ctx.strokeStyle = currentColor[i];
    }

}



 // Event listeners
        canvas.addEventListener("mousedown", e => {

            draw = true;
            drawPosition(e.pageX  - rect.left, e.pageY - rect.top);
            redraw();
        }); 

        canvas.addEventListener("mousemove", e => {
            
            if (draw) {
                drawPosition(e.pageX - rect.left, e.pageY - rect.top, true);
                redraw();
            }
        });

        canvas.addEventListener("mouseup", e => {
            draw = false;
        });

        canvas.addEventListener("mouseleave", e => {
            draw = false;
        });

        buttonEvents();