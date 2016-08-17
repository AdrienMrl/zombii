#pragma strict
#pragma downcast


private var value: float;
private var initialWidth: float;
var text: UnityEngine.UI.Text;

function Start () {
  initialWidth = getBarre().sizeDelta.x;
  setValue(1);
}

function getBarre() {
  return getChild('barre_foreground').GetComponent.<RectTransform>();
}

function getChild(name: String) {
  for (var child: Transform in transform)
    if (child.name == name)
      return child;
}

function setFillAmount() {

  getBarre().sizeDelta = new Vector2(initialWidth * value, 50);
}

function setValue(val: float) {

  value = val < 0 ? 0 : val;
  text.text = Mathf.FloorToInt(value * 100).ToString() + '%';
  setFillAmount();
}

function Update () {

}
