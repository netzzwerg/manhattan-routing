describe("Connector", function() {
  var boxA, boxB, paper, ab;

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

    ab = new Connector(paper,boxA,'right',boxB,'left');
  });

  describe("The 'getDirection' method", function() {

    it("should return coordinates (0/-1) for direction up", function() {
      expect(ab.getDirection(100,100,100,50)).toEqual({x:0,y:-1,d:'up'});
    });

    it("should return coordinates (1/0) for direction right", function() {
      expect(ab.getDirection(100,100,150,100)).toEqual({x:1,y:0,d:'right'});
    });

    it("should return coordinates (0/1) for direction down", function() {
      expect(ab.getDirection(100,100,100,150)).toEqual({x:0,y:1,d:'down'});
    });

    it("should return coordinates (-1/0) for direction left", function() {
      expect(ab.getDirection(100,100,50,100)).toEqual({x:-1,y:0,d:'left'});
    });

    it("should return coordinates (1/-1) for direction up right", function() {
      expect(ab.getDirection(100,100,150,50)).toEqual({x:1,y:-1,d:'rightup'});
    });

    it("should return coordinates (-1/-1) for direction up left", function() {
      expect(ab.getDirection(100,100,50,50)).toEqual({x:-1,y:-1,d:'leftup'});
    });

    it("should return coordinates (1/1) for direction down right", function() {
      expect(ab.getDirection(100,100,150,150)).toEqual({x:1,y:1,d:'rightdown'});
    });

    it("should return coordinates (-1/1) for direction down left", function() {
      expect(ab.getDirection(100,100,50,150)).toEqual({x:-1,y:1,d:'leftdown'});
    });

  });

});