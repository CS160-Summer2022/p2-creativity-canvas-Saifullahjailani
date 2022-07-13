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
}

var v = new Ellipse({
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

$("#default").click(function () {
    b = s;
});

$("#thick-green").click(function () {
    b = v;
});