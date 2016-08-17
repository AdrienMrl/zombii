#pragma strict
#pragma downcast

class Living extends MonoBehaviour {

  protected var life = 100;

  function die() {
    Destroy(gameObject);
  }

  function stickOnFloor() {

    var hit: RaycastHit;
    var downRay = new Ray(transform.position + Vector3(0, 10000, 0), -Vector3.up);

    var layerMask = 1 << 10; // collide only with the floor

    if (Physics.Raycast(downRay, hit, Mathf.Infinity, layerMask)) {

      /*
      if (hit.collider.gameObject.name == 'Water') {
        Destroy(gameObject);
        return;
      }
      */

      transform.position.y = hit.point.y;
    } else {
      transform.position.y = 0;
    }

  }

  function getBlood() {
    for (var child: Transform in transform)
      if (child.name == "blood")
        return child;
  }

  function toggleBleeding(state) {
    var particle = getBlood().gameObject.GetComponent.<ParticleSystem>();
    if (state) particle.Play();
    else particle.Stop();
  }

  function stopBleeding() {
    yield WaitForSeconds (0.04);
    toggleBleeding(false);
  }

  function hit(where: Vector3, direction: Vector3, damage: int) {

      var blood = getBlood();

      if (blood) {
        toggleBleeding(true);
        blood.transform.position = where;
        blood.transform.LookAt(getBlood().position + direction);
        StartCoroutine('stopBleeding');
      }

      life -= damage;
      if (life <= 0) die();
  }
}
