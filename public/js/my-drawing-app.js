/* The code for our drawing application! 
Feel free to delete any/all of it and replace with your own functionality. */

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
}

function Select() {

    this.onMouseDown = function (event) {
        var res = project.hitTest(event.point);
        if(res != null){
            this.item = res.item;
            this.box = this.item.bounds.clone();
            this.box.style = {
                strokeColor: "blue",
                
            }
        }
        
        
    }

    this.onMouseDrag = function (event) {
        
    }
}

var v = new Rectangle({
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

var curr = v;
var next = b;

$("#default").click(function(){
    b = s;
});

$("#thick-green").click(function(){
    b = v;
});