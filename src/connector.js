this.Connector = (function(global, undefined) {
'use strict';

	/**
	 * Represents a Connector.
	 * @global
	 * @constructor
	 * @param {object} paper - A Snap Instance.
	 * @param {object} so - Source Point (Snap) Element.
	 * @param {string} sd - Source Point direction.
	 * @param {object} to - Target Point (Snap) Element.
	 * @param {string} td - Target Point direction.
	 */
	function Connector(paper, so, sd, to, td) {
		this.paper = paper;
		this.startPoint = this.getAnchor(so, sd);
		this.endPoint = this.getAnchor(to, td);
		this.direction = this.getDirection();

		this.draw(this.startPoint, this.endPoint);
		
	}

	/**
	 * @memberOf Connector
	 * @param {object} sp - Source Point (Snap) Element.
	 * @param {object} tp - Target Point (Snap) Element.
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
	 * @memberOf Connector
	 * @param  {object} element   - (Snap) Element
	 * @param  {string} direction - Anchor Direction (up, right, down, left)
	 * @return {object}           
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
	 * @memberOf Connector
	 * @param {number} sx - Source Point X Coordinate.
	 * @param {number} sy - Source Point Y Coordinate.
	 * @param {number} tx - Target Point X Coordinate.
	 * @param {number} ty - Target Point Y Coordinate.
	 * @return {object}  
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
	 * @memberOf Connector
	 * @param {number} sx - Source Point X Coordinate.
	 * @param {number} sy - Source Point Y Coordinate.
	 * @param {number} tx - Target Point X Coordinate.
	 * @param {number} ty - Target Point Y Coordinate.
	 */
	Connector.prototype.drawLine = function(sx, sy, tx, ty) {

		var pathString = '';
		var direction = this.getDirection(sx,sy,tx,ty);

		if(direction.y === 0) {
			pathString = 'M' + sx + ',' + sy + ' L' + tx + ',' + ty;
		} else if (direction.y === 1) {
			var dx = tx - sx;
			pathString = 'M' + sx + ',' + sy;
			pathString += 'L' + (sx + (dx/2)) + ',' + sy;
			pathString += 'L' + (sx + (dx/2)) + ',' + ty;
			pathString += 'L' + tx + ',' + ty;
		}

		this.paper.path(pathString).attr({
			fill: '#FFF',
			stroke: '#000',
			strokeWidth: 1
		});
	};

	/**
	 * @memberOf Connector
	 * @param {number} sx - Point X Coordinate.
	 * @param {number} sy - Point Y Coordinate.
	 */
	Connector.prototype.drawStartPoint = function(sx, sy) {

		var radius = 4;

		this.paper.circle(sx, sy, radius);
	};

	/**
	 * @memberOf Connector
	 * @param {number} tx - Point X Coordinate.
	 * @param {number} ty - Point Y Coordinate.
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