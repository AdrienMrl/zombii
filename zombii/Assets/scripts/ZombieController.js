#pragma strict


class ZombieController extends Living {

  private var damage: float = 35;
  private var attackRate: float = 1.4333;
  private var attackTime: float = 0;
  private var player: Transform;
  private var MinDist: float = 20;
  private var attackDist: float = 2;
  private var MoveSpeed: float = 1;

  var boxcolliderUp: GameObject;
  var boxcolliderDown: GameObject;
  var boxcolliderHead: GameObject;

  function Start () {
    player = GameObject.Find('Player').transform;
  }

  function delObj() {
    yield WaitForSeconds(30);
    Destroy(gameObject);
  }

  function die() {
    GetComponent.<Animator>().Play("back_fall");
    StartCoroutine('delObj');
    boxcolliderUp.SetActive(false);
    boxcolliderHead.SetActive(false);
    boxcolliderDown.SetActive(true);
  }

  function hit(where: Vector3, direction: Vector3, damage: int) {
    super.hit(where, direction, damage);
  }

  function attack() {
      GetComponent.<Animator>().Play("attack");
      var playerController = player.gameObject.Find('Camera').GetComponent.<PlayerController>();
      yield WaitForSeconds(0.5);
      playerController.hit(player.position + Vector3(0, 1, 0), transform.forward, damage);
  }

  function Update () {

    if (life <= 0)
      return;

    attackTime += Time.deltaTime;

    var distance = Vector3.Distance(transform.position, player.position);

    if (distance <= attackDist) {

      if (attackTime > attackRate) {
        attack();
        attackTime = 0;
      }
    }
    else if (distance <= MinDist) {

      var playerPos = player.position;
      playerPos.y = transform.position.y;
      transform.LookAt(playerPos);
      GetComponent.<Animator>().Play("walk");
      transform.position = Vector3.MoveTowards(transform.position, player.position, Time.deltaTime * MoveSpeed);
    }

    stickOnFloor();
  }
}
