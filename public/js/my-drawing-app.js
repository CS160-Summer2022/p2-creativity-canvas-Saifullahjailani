/* The code for our drawing application! 
Feel free to delete any/all of it and replace with your own functionality. */
function download(fileName){
    var fileName = fileName + ".svg";
    var url = "data:image/svg+xml;utf8," + encodeURIComponent(paper.project.exportSVG({asString:true}));
    var link = document.createElement("a");
    link.download = fileName;
    link.href = url;
    link.click();
}

function Brush(style) {
    this.style = style
    this.onMouseDown = function (event) {
        path = new Path();
        path.style = this.style;
        path.add(event.point);
        this.path = path;
    }

    this.getShape = function(){
        return this.path;
    }

    this.onMouseDrag = function (event) {
        this.path.add(event.point);
    }

    this.onMouseUp = function(event){
        
    }
}

function Rectangle(style) {
    this.style = style
    this.onMouseDown = function (event) {
        this.start = event.point;
        this.end = event.point;
        this.shape = new Shape.Rectangle(this.start, this.end);
        this.shape.style = this.style;


    }

    this.getShape = function(){
        return this.shape;
    }

    this.onMouseDrag = function (event) {
        this.shape.remove();
        this.end = event.point;
        this.shape = new Shape.Rectangle(this.start, this.end);
        this.shape.style = this.style;
    }

    this.onMouseUp = function(event){

    }
}

function Ellipse(style) {
    this.style = style

    this.onMouseDown = function (event) {
        this.start = event.point;
        this.end = event.point;
        var rect = new Shape.Rectangle(this.start, this.end);
        this.shape = new Shape.Ellipse({
            point: this.start,
            size: rect.size,
            matrix: rect.matrix,
        });
        this.shape.style = this.style;


    }

    this.onMouseDrag = function (event) {
        this.shape.remove();
        this.end = event.point;
        var rect = new Shape.Rectangle(this.start, this.end);
        this.shape = new Shape.Ellipse({
            point: this.start,
            size: rect.size,
            matrix: rect.matrix
        });
        this.shape.style = this.style;
    }

    this.getShape = function(){
        return this.shape;
    }

    this.onMouseUp = function(event){
        
    }
}


function Line(style) {
    this.style = style

    this.onMouseDown = function (event) {
        this.start = event.point;
        this.end = event.point;
        this.shape = new Path.Line(this.start, this.end);
        this.shape.style = this.style;


    }

    this.onMouseDrag = function (event) {
        this.shape.remove();
        this.end = event.point;
        this.shape = new Path.Line(this.start, this.end);
        this.shape.style = this.style;
    }

    this.getShape = function(){
        return this.shape;
    }

    this.onMouseUp = function(event){
        
    }
}

function Select() {

    this.bounds = null;
    this.move = false;
    this.resize = false;
    this.selected = false;

    this.getShape = function(){
        return null;
    }

    this.onMouseDown = function (event) {

        var res = project.hitTest(event.point, { fill: true, stroke: true, tolerance: 5 });

        if (res != null) {

            if(this.bounds != null && this.bounds.selected){
                this.bounds.remove();
            }

            if (res.item.selected) {
                this.resize = true;
                return;
            }
            

            this.item = res.item;
            this.selectShape(this.item);


        }
        if (this.selected) {
            if (this.bounds.contains(event.point)) {
                this.move = true;
            } else {
                this.selected = false;
                this.resize = false;
                this.move = false;
            }
        }

        if (!this.selected && this.bounds != null) {
            this.bounds.remove();
        }



    
    
    }

    this.deselectShape = function(){
        this.bounds.remove();
    }

    this.selectShape = function(item){
        this.bounds = new Path.Rectangle(item.strokeBounds);
        this.bounds.strokeWidth = 3;
        this.bounds.strokeColor = "blue";
        this.bounds.strokeCap = "round";
        this.bounds.dashArray = [10, 12];
        this.bounds.selected = true;

        this.selected = true;
    }

    this.onMouseDrag = function (event) {
        if (this.bounds != null && this.selected) {
            if (this.move) {
                this.item.position = this.item.position + event.point - event.lastPoint;
                this.bounds.position = this.item.position;
            }
            

        }
    }

    this.onMouseUp = function(event){
        
    }
}



function Circle(style) {
    this.style = style

    this.onMouseDown = function (event) {
        this.start = event.point;
        this.end = event.point;
        this.shape = new Path.Line(this.start, this.end);
        this.shape.strokeWidth = 3;
        this.shape.strokeColor = "red";
        this.shape.strokeCap = "round";
        this.shape.dashArray = [10, 12];


        var dist = this.end - this.start;
        this.circle = new Path.Circle(this.start, dist.length);
        this.circle.style = this.style;


    }

    this.onMouseDrag = function (event) {
        this.shape.remove();
        this.circle.remove();
        this.end = event.point;
        this.shape = new Path.Line(this.start, this.end);
        this.shape.strokeWidth = 3;
        this.shape.strokeColor = "red";
        this.shape.strokeCap = "round";
        this.shape.dashArray = [10, 12];


        var dist = this.end - this.start;
        this.circle = new Path.Circle(this.start, dist.length);
        this.circle.style = this.style;

    }

    this.onMouseUp = function(event){
        this.shape.remove();
    }

    this.getShape = function(){
        return this.circle;
    }

}







//////////////////////////////

//Main Logic



var items = [new Brush({ strokeColor: "black", strokeWidth: 10}), new Rectangle({ strokeColor: "black", strokeWidth: 10}), new Ellipse({ strokeColor: "black", strokeWidth: 10}), new Circle({ strokeColor: "black", strokeWidth: 10}), new Line({ strokeColor: "black", strokeWidth: 10}), new Select({ strokeColor: "black", strokeWidth: 10}), new Brush({ strokeColor: "white", strokeWidth: 20}), new Brush({ strokeColor: "red", strokeWidth: 20})];

var active = 0;

tool.onMouseDown = function (event) { //This code in this function is called whenever the mouse is clicked.
    items[active].onMouseDown(event);
}
tool.onMouseDrag = function (event) {
    items[active].onMouseDrag(event);
}
tool.onMouseUp = function(event){
    items[active].onMouseUp(event);
}



////// Button Press

$("#brush").click(function(event){
    active = 0;
    $("#my-canvas").css("cursor", "crosshair");
    displayStroke(0);
});

$("#rect").click(function(event){
    active = 1;
    $("#my-canvas").css("cursor", "crosshair");
    displayStroke(0);
});

$("#ellipse").click(function(event){
    active = 2;
    $("#my-canvas").css("cursor", "crosshair");
    displayStroke(0);
});

$("#circle").click(function(event){
    active = 3;
    $("#my-canvas").css("cursor", "crosshair");
    displayStroke(0);
});

$("#line").click(function(event){
    active = 4;
    $("#my-canvas").css("cursor", "crosshair");
    displayStroke(0);
});

$("#select").click(function(event){
    active = 5;
    $("#my-canvas").css("cursor", "move");
    displayStroke(0);
});

$("#eraser").click(function(event){
    active = 6;
    $("#my-canvas").css("cursor", "crosshair");
    displayStroke(0);
});
$("#paint").click(function(event){
    active = 7;
    $("#my-canvas").css("cursor", "crosshair");
    displayStroke(0);
});



$(".color").click(function(event){ 
    var color = this.style.backgroundColor;
    var shape = items[active];
    var style = shape.style;
    style.strokeColor = color;
});

var stroke = 10;


function displayStroke(add){
    stroke = items[active].style.strokeWidth;
    stroke+=add;
    $("#stroke").text(stroke);
    var shape = items[active];
    var style = shape.style;
    style.strokeWidth = stroke;
}
function set_stroke(){
    var shape = items[active];
    shape.style.strokeWidth = stroke;
    var shape = items[active];
    shape.style.strokeWidth = stroke;
}
$("#left-arrow").mousedown(function(event){
        if (stroke >= 0){
            displayStroke(-1);
        }
})

$("#right-arrow").mousedown(function(event){
    if (stroke <= 50){
        displayStroke(1);
    }
})

var color = null;
$(".color").dblclick(function(event){
    $(".rgbmenue").css("opacity", "1");
    $(".rgbmenue").css("z-index", "3");
    color = this;
});

function closeRGBMenu(){
    $(".rgbmenue").css("opacity", "0");
    $(".rgbmenue").css("z-index", "-3");
}

$("#ok").click(function (event) {  
    var c = r + "," + g + "," + b + "," + a;
   c = "rgba(" + c + ")";
   $(color).css("background-color", c);
   closeRGBMenu();
});

$("#close-rgb").click(function (event) {  
    $(".rgbmenue").css("opacity", "0");
    $(".rgbmenue").css("z-index", "-3");
});

$("#add").click(function(event){
    
    var c = r + "," + g + "," + b + "," + a;
   c = "rgba(" + c + ")";
    var elem = $(".color")[1];
    elem = $(elem).clone();
    elem.css("background-color", "white");
    $(elem).bind("click", function(){
        var color = this.style.backgroundColor;
        var shape = items[active];
        var style = shape.style;
        style.strokeColor = color;
    })
    $(elem).bind("dblclick", function(){
        $(".rgbmenue").css("opacity", "1");
        $(".rgbmenue").css("z-index", "3");
        color = this;
    })
    $(".color_collection").append(elem);
});



function gameOver(){
    clearInterval(interval);
    var url = "data:image/svg+xml;utf8," + encodeURIComponent(paper.project.exportSVG({asString:true}));
    window.localStorage.setItem("svg", url);
    window.location.href = "fast_drawingScreen_post.html";

}

var countdownNumberEl;
var countdown;




var interval = setInterval(function () {
    if(countdown <= 1){
        gameOver();
    }
  countdown--;

  countdownNumberEl.textContent = countdown;
}, 1000);

var r = 128;
var g = 128;
var b = 128;
var a = 1;

$("#input_red").click(function(event){
    r = $("#input_red").val()
    $("#red_out").text(r);
    set_b();
});

$("#input_green").click(function(event){
    g = $("#input_green").val()
    $("#green_out").text(g);
    set_b();
});

$("#input_blue").click(function(event){
    b = $("#input_blue").val()
    $("#blue_out").text(b);
    set_b();
});

$("#input_alpha").click(function(event){
    a = $("#input_alpha").val()
    $("#alpha_out").text(a);
    set_b();
});

function set_b(){
   var c = r + "," + g + "," + b + "," + a;
   c = "rgba(" + c + ")";
   $("#ok").css("background-color", c);
}

if(window.localStorage.getItem("turnoffInterval") == "t"){
    clearInterval(interval);
    
}else{
    countdownNumberEl = document.getElementById('countdown-number');
    countdown = 60;
    countdownNumberEl.textContent = countdown;
}

var counterSave = 1;
$("#save").click(function(){
    download("untitled"+counterSave);
    counterSave++;
})

$("#show_save_exit").click(function(){
    $(".exit").show();
})

$("#close-exit").click(function(){
    $(".exit").hide();
})

$("#yes").click(function(){
    $("#save").click();
    $("#no").click()
})
$("#no").click(function(){
    window.location.href = "index.html";
})
$("#show_ref").click(function(){
    $(".ref").show();
})
$("#close-ref").click(function(){
    $(".ref").hide();
})


$(".exit").hide();
$(".ref").hide();





if(window.localStorage.getItem("load") == 't'){
        project.importSVG(window.localStorage.getItem("svg"));
        window.localStorage.removeItem("load");
} else{
    project.clear();
}


var inp = document.createElement("input");
inp.type = 'file';
inp.name = 'file';
inp.id = "input";


inp.addEventListener('change', function(e){
    var reader = new FileReader();
    reader.onload = function () {
        document.getElementById("my_ref").src = reader.result;
    }
      reader.readAsDataURL(inp.files[0]);
});

inp.style.display = 'none';


$("#load_ref").click(function(){
    inp.click();
    $(".ref").show();
    
})

$("#grayscale").click(function(){
    $("#my_ref").css("filter", "grayscale(0)");
    
})

