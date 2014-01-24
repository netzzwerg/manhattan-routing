describe("Connector", function() {
  var boxA, boxB;
  var paper;

  beforeEach(function() {
    paper = new Snap(800,800);
    boxA = paper.rect(50, 50, 100, 100, 2).attr({
      fill: "#FFF",
      stroke: "#000",
      strokeWidth: 1
    });

    boxB = paper.rect(250, 50, 100, 100, 2).attr({
      fill: "#FFF",
      stroke: "#000",
      strokeWidth: 1
    });
  });

  it("should be true", function() {
    expect(true).toBeTruthy();
  });

});