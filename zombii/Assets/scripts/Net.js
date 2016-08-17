#pragma strict
#pragma downcast

var earthPrefab: GameObject;
private var terr: Transform;
var chunks = new List.<Earth>();

function parseMap(data: String): float[] {
  var numLen = 6;
  var map = data.Split(' '[0]);
  var fmap = new float[map.length];

  for (var i = 0; i < map.length; i++) {
    fmap[i] = parseFloat(map[i]);
  }
  return fmap;
}

var reqid = 0;

function askForMap(x: int, y: int) {

  var www = WWW('localhost:7641/zombii/map/' + x + '/' + y);
  //print('do request' + reqid++);
  yield www;

  var map = parseMap(www.text);


  var earth = Instantiate(earthPrefab, terr);

  var earthScript = earth.GetComponent.<Earth>();
  chunks.Add(earthScript);

  var chunkSize = Mathf.Sqrt(map.length);
  earth.transform.position = Vector3(x * (chunkSize - 1) * earthScript.scale, 0, y * (chunkSize - 1) * earthScript.scale);

  earthScript.makeEarth(map, x, y);
}

function downloadChunk(x: int, y: int) {
  return askForMap(x, y);
}

function Start () {

  return;


  terr = GameObject.Find('Terr').transform;
  for (var child: Transform in terr)
    Destroy(child.gameObject);

  var loadChunks = 3000;

  var x = 0;
  var y = 0;
  var dx = 0;
  var dy = -1;

  while (loadChunks-- > 0) {

      if (x == y || (x < 0 && x == -y) || (x > 0 && x == 1 - y)) {
        var buf = dx;
        dx = -dy;
        dy = buf;
      }

      askForMap(x, y);

      x += dx;
      y += dy;

      yield WaitForSeconds(0.001);
  }

  GetComponent.<Spawner>().SpawnTrees();
}
