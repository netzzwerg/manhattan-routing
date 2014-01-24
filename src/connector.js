this.Connector = (function(global, undefined) {
'use strict';

	var Connector = function(paper, so, sd, to, td) {
		this.paper = paper;
		this.startPoint = this.getAnchor(so, sd);
		this.endPoint = this.getAnchor(to, td);
		this.direction = this.getDirection();

		this.draw(this.startPoint, this.endPoint);
		
	};

	/**
	 * [draw description]
	 * @param  {[type]} sp [description]
	 * @param  {[type]} tp [description]
	 * @return {[type]}    [description]
	 */
	Connector.prototype.draw = function(sp, tp) {

		var sx = sp.x;
		var sy = sp.y;
		var tx = tp.x;
		var ty = tp.y;

		this.drawLine(sx,sy,tx,ty);
		this.drawStartPoint(sx,sy);
		this.drawEndPoint(tx,ty);
	};

	/**
	 * [getAnchor description]
	 * @param  {[type]} element   [description]
	 * @param  {[type]} direction [description]
	 * @return {[type]}           [description]
	 */
	Connector.prototype.getAnchor = function(element, direction) {

		var x = 0;
		var y = 0;
		var sx = element.attr('x') * 1;
		var sy = element.attr('y') * 1;
		var sh = element.attr('height') * 1;
		var sw = element.attr('width') * 1;

		switch (direction) {
			case 'right':
				x = sx + sw;
				y = sy + sh/2;
			break;
			case 'up':
				x = sx + sw/2;
				y = sy;
			break;
			case 'down':
				x = sx + sw/2;
				y = sy + sh;
			break;
			case 'left':
				x = sx;
				y = sy + sh/2;
			break;
			default:
				x = sx + sw;
				y = sy + sh/2;
		}

		return { x : x, y : y, d : direction };
	};

	/**
	 * [getDirection description]
	 * @param  {[type]} sx [description]
	 * @param  {[type]} sy [description]
	 * @param  {[type]} tx [description]
	 * @param  {[type]} ty [description]
	 * @return {[type]}    [description]
	 */
	Connector.prototype.getDirection = function(sx, sy, tx, ty) {

		var x = 0;
		var y = 0;
		var dx = tx - sx;
		var dy = ty - sy;

		if(dx < 0) {
			x = -1; // left
		} else if (dx > 0) {
			x = 1;  // right
		} else if (dx === 0) {
			x = 0;  // center
		}

		if(dy < 0) {
			y = -1; // up
		} else if (dy > 0) {
			y = 1;  // down
		} else if (dy === 0) {
			y = 0;  // center
		}

		return { x : x, y : y };
	};

	/**
	 * [drawLine description]
	 * @param  {[type]} sx [description]
	 * @param  {[type]} sy [description]
	 * @param  {[type]} tx [description]
	 * @param  {[type]} ty [description]
	 * @return {[type]}    [description]
	 */
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
			fill: '#FFF',
			stroke: '#000',
			strokeWidth: 1
		});
	};

	/**
	 * [drawStartPoint description]
	 * @param  {[type]} sx [description]
	 * @param  {[type]} sy [description]
	 * @return {[type]}    [description]
	 */
	Connector.prototype.drawStartPoint = function(sx, sy) {

		var radius = 4;

		this.paper.circle(sx, sy, radius);
	};

	/**
	 * [drawEndPoint description]
	 * @param  {[type]} tx [description]
	 * @param  {[type]} ty [description]
	 * @return {[type]}    [description]
	 */
	Connector.prototype.drawEndPoint = function(tx, ty) {

		var p = 'M' + tx + ',' + ty;
			p += 'L' + (tx-10) + ',' + (ty+5);
			p += 'L' + (tx-10) + ',' + (ty-5);
			p += 'L' + tx + ',' + ty;

		this.paper.path(p);
	};

	return Connector;

}(this));