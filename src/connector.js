this.Connector = (function(global, undefined) {
'use strict';

	var Connector = function(paper, so, sd, to, td) {
		this.paper = paper;
		this.sourceObject = so;
		this.targetObject = to;
		this.sourcePoint = this.getAnchor(so, sd);
		this.targetPoint = this.getAnchor(to, td);
		this.direction = this.getDirection();

		this.draw(this.sourcePoint, this.targetPoint);
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
		this.drawSourcePoint(sx,sy);
		this.drawTargetPoint(tx,ty,tp.d);
	};

	/**
	 * [getAnchor description]
	 * @param  {[type]} element   [description]
	 * @param  {[type]} direction [description]
	 * @return {[type]}           [description]
	 */
	Connector.prototype.getAnchor = function(element, direction) {

		var x,y = 0;
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

		var x,y = 0;
		var d = '';
		var dx = tx - sx;
		var dy = ty - sy;

		if(dx < 0) {
			x = -1;
			d = 'left';
		} else if (dx > 0) {
			x = 1;
			d = 'right';
		} else if (dx === 0) {
			x = 0;  // center
		}

		if(dy < 0) {
			y = -1;
			d += 'up';
		} else if (dy > 0) {
			y = 1;
			d += 'down';
		} else if (dy === 0) {
			y = 0;  // center
		}

		return { x : x, y : y, d: d };
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
		var connectionDirection = this.getDirection(sx,sy,tx,ty);
		var sourcePointDirection = this.sourcePoint.d;
		var targetPointDirection = this.targetPoint.d;
		var padding = 30;

		path = 'M' + sx + ',' + sy;

		// change direction and walk around the source element
		if(connectionDirection.d.indexOf(sourcePointDirection) === -1) {

			path += 'L' + (sx-padding) + ',' + ty;
			path += 'L' + (sx-padding) + ',' + (ty+50+padding);
					
			// should we walk around the target element?
			if(connectionDirection.d.indexOf(targetPointDirection) !== -1) {
				path += 'L' + (tx+padding) + ',' + (ty+50+padding);
				path += 'L' + (tx+padding) + ',' + ty;
			} else {
				path += 'L' + (sx+100+padding) + ',' + (ty+50+padding);
				path += 'L' + (sx+100+padding) + ',' + (ty);
			}

			path += 'L' + tx + ',' + ty;
		}

		if(connectionDirection.y === 0) {
			path += 'L' + tx + ',' + ty;
		} else if (connectionDirection.y === 1) {
			var dx = tx - sx;
			path += 'L' + (sx + (dx/2)) + ',' + sy;
			path += 'L' + (sx + (dx/2)) + ',' + ty;
			path += 'L' + tx + ',' + ty;
		}

		this.paper.path(path).attr({
			fill: '#FFF',
			fillOpacity : 0,
			stroke: '#000',
			strokeWidth: 1
		});
	};

	/**
	 * [drawSourcePoint description]
	 * @param  {[type]} sx [description]
	 * @param  {[type]} sy [description]
	 * @return {[type]}    [description]
	 */
	Connector.prototype.drawSourcePoint = function(sx, sy) {

		var radius = 4;

		this.paper.circle(sx, sy, radius);
	};

	/**
	 * [drawTargetPoint description]
	 * @param  {[type]} tx [description]
	 * @param  {[type]} ty [description]
	 * @return {[type]}    [description]
	 */
	Connector.prototype.drawTargetPoint = function(tx, ty, direction) {
		var arrow, a;
		var p = 'M' + tx + ',' + ty;
			p += 'L' + (tx-10) + ',' + (ty+5);
			p += 'L' + (tx-10) + ',' + (ty-5);
			p += 'L' + tx + ',' + ty;
			arrow = this.paper.path(p);

		switch (direction) {
			case 'right':
				a = 180;
			break;
			case 'up':
				a = 90;
			break;
			case 'down':
				a = 270;
			break;
			case 'left':
				a = 0;
			break;
			default:
				a = 0;
		}

		arrow.transform('rotate(' + a + ',' + tx + ',' + ty + ')');
	};

	return Connector;

}(this));