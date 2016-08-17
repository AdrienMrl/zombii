#pragma strict

import System.Collections.Generic;

var engine: GameObject;

private var maxChunks = 512;
private var chunkWorldSize = 16 * GeneratedMesh.scale; // TODO: do better

function hasChunk(pos: Vector2) {

  for (var chunk: Earth in engine.GetComponent.<Net>().chunks) {
    if (chunk.x == pos.x && chunk.y == pos.y)
      return true;
  }

  return false;
}


function checkChunks() {

  var pos = getPlayerChunkPos();

  var chunkRangeSide = 10;

  for (var y = -chunkRangeSide; y < chunkRangeSide; y++)
    for (var x = -chunkRangeSide; x < chunkRangeSide; x++)
      if (!hasChunk(Vector2(pos.x + x, pos.y + y))) {
        engine.GetComponent.<Net>().downloadChunk(pos.x + x, pos.y + y);
        yield WaitForSeconds(0.001);
      }

  yield WaitForSeconds(1);
  yield StartCoroutine("checkChunks");
}

function getPlayerChunkPos(): Vector2 {

  var px: int = transform.position.x / chunkWorldSize;
  var py: int = transform.position.z / chunkWorldSize;
  return Vector2(px, py);
}

function Start () {

  // TODO: check for chunk doubles
  var pos = getPlayerChunkPos();
  engine.GetComponent.<Net>().downloadChunk(pos.x, pos.y);

  checkChunks();
}
