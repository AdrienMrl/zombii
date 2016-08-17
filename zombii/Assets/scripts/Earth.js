#pragma strict

class Earth extends GeneratedMesh {

  var x: int;
  var y: int;

  function makeEarth(grid: float[], x: int, y: int) {
    genMeshFromGrid(grid);

    this.x = x;
    this.y = y;
  }
}
