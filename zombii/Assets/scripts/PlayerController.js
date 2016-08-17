#pragma strict

class PlayerController extends Living {

    var weapon: Weapon;
    var screenRed: UnityEngine.UI.Image;
    var lifeJauge: JaugeController;
    var foodJauge: JaugeController;

    private var food = 1.0;
    private var foodUsage = 0.001;


    private var fadingRate = 1;

    function hit(where: Vector3, direction: Vector3, damage: int) {
      super.hit(where, direction, damage);
      lifeJauge.setValue(life / 100.0);
      screenRed.color.a = 0.6;
    }

    function die() {
      print('TODO: you\'re dead !');
    }

    function fadeAwayBloodOnCamera() {
      if (screenRed.color.a > 0)
        screenRed.color.a -= Time.deltaTime * fadingRate;
    }

    function digestFood(value: float) {
      food -= value;
      if (food < 0)
        food = 0;
      foodJauge.setValue(food);
    }

    function Update () {

      fadeAwayBloodOnCamera();

      digestFood(foodUsage * Time.deltaTime);

      if (Input.GetMouseButton(0)) {
        weapon.fire();
      }
    }
}
