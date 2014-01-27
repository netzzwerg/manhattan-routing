manhattan-routing
=================
#### Simple Manhattan Routing with SVG. ####

Basic Usage
------------

![](http://netzzwerg.github.io/manhattan-routing/images/routing-1.svg)

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

var ab = new Connector(paper, boxA, 'right', boxB, 'left');
```

![](http://netzzwerg.github.io/manhattan-routing/images/routing-2.svg)

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

var cd = new Connector(paper, boxC, 'left', boxD, 'left');
```

Development
------------

Layout:

    .
    |-- lib          # javascript helper
    |-- src          # source code
    |-- spec         # unit test with jasmine
    |-- reports      # code coverage with istanbul
    `-- doc          # documentation with jsdoc

License
-------

[MIT License](http://www.opensource.org/licenses/mit-license.php)

&copy; 2014 Béla Varga &lt;netzzwerg@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
