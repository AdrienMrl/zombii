#pragma strict

class StickToFloor extends MonoBehaviour {

  function StickMe() {

    var hit: RaycastHit;
    var downRay = new Ray(transform.position + Vector3(0, -10, 0), -Vector3.up);

    if (Physics.Raycast(downRay, hit)) {
      if (hit.collider.gameObject.name == 'Water') {
        //Destroy(gameObject);
        //return;
      }
      transform.position.y = hit.point.y;
    }

  }
  function Start() {
    StickMe();
  }
}
