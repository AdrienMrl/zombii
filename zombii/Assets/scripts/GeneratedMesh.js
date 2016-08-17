#pragma strict

class GeneratedMesh extends MonoBehaviour {

  static var scale = 5;

  function produceVertex(x: float, y: float, z: float) {

    return new Vector3(x * scale, y * scale, z * scale);
  }

  function makeQuad(x: int, y: int, offset: int) {

    var newVertices = new Vector3[6];
    var newTriangles = new int[6];

    newVertices[0] = produceVertex(x, 0, y);
    newVertices[1] = produceVertex(x, 0, y + 1);
    newVertices[2] = produceVertex(x + 1, 0, y);
    newVertices[3] = produceVertex(x, 0, y + 1);
    newVertices[4] = produceVertex(x + 1, 0, y + 1);
    newVertices[5] = produceVertex(x + 1, 0, y);
    for (var i = 0; i < 6; i++) {
      newTriangles[i] = i + offset;
    }

    return [newVertices, newTriangles]; // motherfucking unityscript
  }

  function genMeshFromGrid(grid: float[]) {

    var gridlen = Mathf.Sqrt(grid.length);

    var mf = GetComponent.<MeshFilter>();
    var mesh = new Mesh();
    mf.mesh = mesh;

    var numberOfTriangles = Mathf.Pow(gridlen - 1, 2) * 2;
    var vertices = new Vector3[numberOfTriangles * 3];
    var triangles = new int[numberOfTriangles * 3];

    for (var y = 0; y < gridlen - 1; y++) {
      for (var x = 0; x < gridlen - 1; x++) {
        var idx = y * gridlen + x;
        var offset = y * (gridlen - 1) + x;
        var res = makeQuad(x - (gridlen - 1) / 2, y - (gridlen - 1) / 2, offset * 6);
        var ver = res[0] as Vector3[];
        var tri = res[1] as int[];
        ver[0].y = grid[idx];
        ver[1].y = grid[idx + gridlen];
        ver[2].y = grid[idx + 1];
        ver[3].y = grid[idx + gridlen];
        ver[4].y = grid[idx + gridlen + 1];
        ver[5].y = grid[idx + 1];

        System.Array.Copy(ver, 0, vertices, offset * 6, ver.length);
        System.Array.Copy(tri, 0, triangles, offset * 6, tri.length);
      }
    }

    mesh.vertices = vertices;
    mesh.triangles = triangles;
    mesh.RecalculateNormals();
    GetComponent.<MeshCollider>().sharedMesh = mesh;
  }
}
