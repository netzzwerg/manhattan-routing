;(function(global, undefined){
'use strict';
	console.log('main');

	var Connector = function(paper, sx,sy,tx,ty) {
		this.paper = paper;
		this.draw(sx,sy,tx,ty);
	};

	Connector.prototype.draw = function(sx,sy,tx,ty) {
		this.drawLine(sx,sy,tx,ty);
		this.drawStartPoint(sx,sy);
		this.drawEndPoint(tx,ty);
	};

	Connector.prototype.drawLine = function(sx,sy,tx,ty) {

		var path = '';

		if(sy === ty) {
			path = 'M' + sx + ',' + sy + ' L' + tx + ',' + ty;
		} else if(ty > sy) {
			var dx = tx - sx;
				path = 'M' + sx + ',' + sy;
				path += 'L' + (sx + (dx/2)) + ',' + sy;
				path += 'L' + (sx + (dx/2)) + ',' + ty;
				path += 'L' + tx + ',' + ty;
		}

		this.paper.path(path).attr({
			fill: "#FFF",
			stroke: "#000",
			strokeWidth: 1
		});
	};

	Connector.prototype.drawStartPoint = function(sx,sy) {
		this.paper.circle(sx, sy, 4);
	};

	Connector.prototype.drawEndPoint = function(tx,ty) {
		var p = 'M' + tx + ',' + ty;
			p += 'L' + (tx-10) + ',' + (ty+5);
			p += 'L' + (tx-10) + ',' + (ty-5);
			p += 'L' + tx + ',' + ty;
		this.paper.path(p);
	};

	var paper = new Snap(800,600);

	var boxA = paper.rect(50, 50, 100, 100, 2).attr({
		fill: "#FFF",
		stroke: "#000",
		strokeWidth: 1
	});

	var boxB = paper.rect(250, 50, 100, 100, 2).attr({
		fill: "#FFF",
		stroke: "#000",
		strokeWidth: 1
	});

	var ab = new Connector(paper,150,100,250,100);

	var boxC = paper.rect(50, 250, 100, 100, 2).attr({
		fill: "#FFF",
		stroke: "#000",
		strokeWidth: 1
	});

	var boxD = paper.rect(250, 350, 100, 100, 2).attr({
		fill: "#FFF",
		stroke: "#000",
		strokeWidth: 1
	});

	var cd = new Connector(paper,150,300,250,400);

}(this));