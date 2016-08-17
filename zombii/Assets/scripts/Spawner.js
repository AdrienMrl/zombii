#pragma strict

private var spawnRate = 1.0 / 0.5;
private var elapsed = 0.0;
private var terr: Transform;

var player: GameObject;
var zombiePrefab: GameObject;
var TreeRed: GameObject;
var Pine: GameObject;

function Start () {
}

function SpawnTrees() {
  for (var i = 0; i < 1000; i++) {
    Spawn(TreeRed, 100000);
    Spawn(Pine,    100000);
  }
}

function Spawn(what: GameObject, dist: float) {

    terr = GameObject.Find('Terr').transform;
    dist /= 200;
    var offset = Vector3(Random.Range(-dist, dist), 0, Random.Range(-dist, dist));
    var obj = Instantiate(what, terr);
    obj.transform.position = player.transform.position + offset;

    return obj;
}

function Update () {

  elapsed += Time.deltaTime;

  if (elapsed > spawnRate) {

    Spawn(zombiePrefab, 9000);
    elapsed = 0;
  }
}
