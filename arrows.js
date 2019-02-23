function shiftArrows(){
  return null;
}

function toggleAllArrows(){
  let s = scene.getObjectByName("scene", true), state;
  s.children.forEach((child) => {
    if(child.visible == true) { child.visible = false; state = "hidden" }
    else { child.visible = true; state = "visible" }
  })
  writeString("<font color=#00ff00>togglearrows (" + state + ")</font>","scene-id")
}
