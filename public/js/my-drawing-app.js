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

    this.onMouseDrag = function (event) {
        this.path.add(event.point);
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

    this.onMouseUp = function(event){
        
    }
}

function Select() {

    this.bounds = null;
    this.move = false;
    this.resize = false;
    this.selected = false;


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
            this.bounds = new Path.Rectangle(this.item.strokeBounds);
            this.bounds.strokeWidth = 3;
            this.bounds.strokeColor = "blue";
            this.bounds.strokeCap = "round";
            this.bounds.dashArray = [10, 12];
            this.bounds.selected = true;

            this.selected = true;


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
        console.log(dist.length);
        this.circle = new Path.Circle(this.start, dist.length);
        this.circle.style = this.style;

    }

    this.onMouseUp = function(event){
        this.shape.remove();
    }

}

var v = new Circle({
    strokeWidth: 10,
    strokeColor: "black",
})
var s = new Select();

var b = v;

var path;
var currentColor = 'black'
var currentWidth = 5

tool.onMouseDown = function (event) { //This code in this function is called whenever the mouse is clicked.
    b.onMouseDown(event);
}
tool.onMouseDrag = function (event) {
    b.onMouseDrag(event);
}
tool.onMouseUp = function(event){
    b.onMouseUp(event);
}

var curr = v;
var next = b;

$("#default").click(function () {
    b = s;
});

$("#thick-green").click(function () {
    b = v;
});



/*
<input type="file" id="input" multiple>
*/

var inp = document.createElement("input");
inp.type = 'file';
inp.name = 'file';
inp.id = "input";

inp.addEventListener('change', function(e){
    console.log(inp.files);
    var reader = new FileReader();
    reader.onload = function () {
        project.importSVG(reader.result);
    }
      reader.readAsText(inp.files[0]);
});

inp.style.display = 'none';

$("#sub").click(function(e){
    inp.click();
});