#pragma strict

private var living: Living;
var damageMultiplier = 1;

function Start() {
  living = transform.parent.gameObject.GetComponent.<Living>();
}

function hit(where: Vector3, direction: Vector3, damage: int) {
  living.hit(where, direction, damage * damageMultiplier);
}
