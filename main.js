;(function(global, undefined){
'use strict';

	var paper = new Snap(1200,1000);

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

	var ab = new Connector(paper, boxA, 'right', boxB, 'left');

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

	var cd = new Connector(paper, boxC, 'right', boxD, 'left');

	var boxE = paper.rect(450, 50, 100, 100, 2).attr({
		fill: "#FFF",
		stroke: "#000",
		strokeWidth: 1
	});

	var boxF = paper.rect(650, 50, 100, 100, 2).attr({
		fill: "#FFF",
		stroke: "#000",
		strokeWidth: 1
	});

	var ef = new Connector(paper, boxE, 'left', boxF, 'right');

	var boxG = paper.rect(450, 250, 100, 100, 2).attr({
		fill: "#FFF",
		stroke: "#000",
		strokeWidth: 1
	});

	var boxH = paper.rect(650, 250, 100, 100, 2).attr({
		fill: "#FFF",
		stroke: "#000",
		strokeWidth: 1
	});

	var gh = new Connector(paper, boxG, 'left', boxH, 'left');

}(this));