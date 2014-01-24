this.Connector = (function(global, undefined) {
'use strict';

	var Connector = function(paper, so, sd, to, td) {
		this.paper = paper;
		this.startPoint = this.getStartPoint(so, sd);
		this.endPoint = this.getEndPoint(to, td);
		this.direction = this.getDirection();

		this.draw(this.startPoint, this.endPoint);
		
	};

	Connector.prototype.draw = function(sp, tp) {

		var sx = sp.x;
		var sy = sp.y;
		var tx = tp.x;
		var ty = tp.y;

		this.drawLine(sx,sy,tx,ty);
		this.drawStartPoint(sx,sy);
		this.drawEndPoint(tx,ty);
	};

	Connector.prototype.getStartPoint = function(so, sd) {
		var box = so.getBBox();
		return { x:box.x, y:box.y, d:'right' };
	};

	Connector.prototype.getEndPoint = function(to, td) {
		var box = to.getBBox();
		return {x:box.x, y:box.y, d:'right' };
	};

	Connector.prototype.getDirection = function(sx, sy, tx, ty) {
		// RIGHT 1/ 0
		// LEFT -1/ 0
		// UP    0/-1
		// DOWN  0/ 1
	
		var direction = {x:0,y:0};
		var dx = tx - sx;
		var dy = ty - sy;

		if(dx < 0) {
			direction.x = -1; // left
		} else if (dx > 0) {
			direction.x = 1;  // right
		} else if (dx === 0) {
			direction.x = 0;  // center
		}

		if(dy < 0) {
			direction.y = -1; // up
		} else if (dy > 0) {
			direction.y = 1;  // down
		} else if (dy === 0) {
			direction.y = 0;  // center
		}

		console.log(direction);
		return direction;
	};

	Connector.prototype.drawLine = function(sx, sy, tx, ty) {

		var path = '';
		var direction = this.getDirection(sx,sy,tx,ty);

		if(direction.y === 0) {
			path = 'M' + sx + ',' + sy + ' L' + tx + ',' + ty;
		} else if (direction.y === 1) {
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

	Connector.prototype.drawStartPoint = function(sx, sy) {
		this.paper.circle(sx, sy, 4);
	};

	Connector.prototype.drawEndPoint = function(tx, ty) {
		var p = 'M' + tx + ',' + ty;
			p += 'L' + (tx-10) + ',' + (ty+5);
			p += 'L' + (tx-10) + ',' + (ty-5);
			p += 'L' + tx + ',' + ty;
		this.paper.path(p);
	};

	return Connector;

}(this));