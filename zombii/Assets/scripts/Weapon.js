#pragma strict

private var fireRate: float = 0.1;
var fireFlash: GameObject;
var range = 100;
var damage = 30;
var cam: Camera;
private var lastShoot = 0.0;
private var targetPos: Vector3;
private var initialPos: Vector3;
private var step: float;

function Start () {
  targetPos = transform.localPosition;
  initialPos = targetPos;
}

function Update() {

  lastShoot += Time.deltaTime;

  if (targetPos != transform.localPosition) {
    transform.localPosition = Vector3.MoveTowards(transform.localPosition, targetPos, step * Time.deltaTime);
    if (transform.localPosition == targetPos) {
      fireFlash.SetActive(false);
      targetPos = initialPos;
      step = 3;
    }
  } else {
  }

}

function fireSound() {
  GetComponent.<AudioSource>().Play();
}

function raycast() {

  var fwd = transform.TransformDirection(Vector3.forward);

  var hit: RaycastHit;

  if (Physics.Raycast(cam.transform.position, cam.transform.forward, hit, range)) {
    var target = hit.collider.gameObject.GetComponent.<HitBoxed>();
    if (target) {
      target.hit(hit.point, cam.transform.forward, damage);
    }
  }
}


function fire() {

  if (lastShoot >= fireRate) {
    fireSound();
    raycast();
    fireFlash.SetActive(true);
    step = 5;
    targetPos -= transform.forward * 0.1;
    lastShoot = Time.deltaTime;
  }
}
