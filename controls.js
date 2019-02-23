var changeColor = false;
var finishMeshs = false;
var rotup = false;
var rotdown = false;
var rotleft = false;
var rotright = false;
function handleControls(){
  /*
  ccontrols = new THREE.PointerLockControls(camera);

  //var blocker = document.getElementById('blocker');
  var instructions = document.getElementById('info');

  instructions.addEventListener('click', function() {
      ccontrols.lock();
  }, false);
  */
/*
  controls.addEventListener('lock', function() {
      instructions.style.display = 'none';
      blocker.style.display = 'none';
  });

  controls.addEventListener('unlock', function() {
      blocker.style.display = 'block';
      instructions.style.display = '';
  });
*/
  //scene.add(ccontrols.getObject());

  var onKeyDown = function(event) {
      switch (event.keyCode) {

          case 38: // up
          case 87: // w
              if(meshCount>0) rotup = true;
              break;

          case 37: // left
    			case 65: // a
    			   if(meshCount>0) rotleft = true;
    			   break;

    			case 40: // down
    			case 83: // s
    		     if(meshCount>0) rotdown = true;
    			   break;

    			case 39: // right
    			case 68: // d
    			   if(meshCount>0) rotright = true;
    			   break;

          case 67: // c
       			  if(meshCount>0) changeColor = true;
       			  break;

          case 70: // f
           		if(subMeshCount>=1) finishMeshs = true;
           		break;
      }
  };

  var onKeyUp = function(event) {
      switch (event.keyCode) {

          case 38: // up
          case 87: // w
              rotup = false;
              break;

          case 37: // left
        	case 65: // a
        			rotleft = false;
        			break;

        	case 40: // down
        	case 83: // s
        		  rotdown = false;
        			break;

        	case 39: // right
        	case 68: // d
        			rotright = false;
        			break;

          case 67: // c
           		changeColor = false;
           		break;

          case 70: // f
               finishMeshs = false;
               break;
      }
  };
  document.addEventListener('keydown', onKeyDown, false);
  document.addEventListener('keyup', onKeyUp, false);
}

function toggleControls(){
  writeString("<font color=#00ff00>orbit</font>","scene-id")
  if(controls.enabled == false) { controls.enabled = true } else { controls.enabled = false }
}

function toggle(name){
  let n = scene.getObjectByName(name)
  if(n.visible == false) { n.visible = true  } else { n.visible = false }
  writeString("<font color=#00ff00>toggle" + name + "</font>","scene-id")
}

function warning(){
  writeString("<font color=#ff0000>not implemented yet</font>","scene-id")
}
