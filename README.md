manhattan-routing
=================

Simple Manhattan Routing with SVG.


![](http://netzzwerg.github.io/manhattan-routing/images/manhattan-routing-small.png)

```js
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
```

```js
var paper = new Snap(800,600);

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

var cd = new Connector(paper,boxC,boxD);
```
