var currentSpheres = [];

function transformations(t){
  var tt = t*2;
  let rt;
  if (t<0 && t>-.025){ rt = 0;
  } else if (t>0 && t<.025) { rt = 0;
  } else { rt = (tt > 0 ? Math.ceil : Math.floor)(tt*8)/8 }

  return rt;
}

function returnCoords(x,y){
  rx = transformations(x);
  ry = transformations(y);

  return [rx,ry];
}

function notOutOfBounds(xy){
  let xc = xy[0]*8,
      yc = xy[1]*8;
  if(xc > 10 || xc < -10 || yc > 10 || yc < -10){
    return false;
  } else {
    return [xc,yc];
  }
}

function writeString(str,id){
  document.getElementById(id).innerHTML = str;
}

function writeNodes(xy){
  let xyc, protocol = notOutOfBounds(xy);
  if(protocol != false){ xyc = protocol;
  } else { xyc = "out of bounds" }
  writeString(xyc,"node-id");
}

function isInArray(value, array) {
  for(var i=0;i<array.length;i++){
    if(array[i][0] == value[0] && array[i][1] == value[1]) {
      return [array[i].slice(-1)[0], i]; // return sphere id, and currentSpheres index to delete
    }
  }
  return false;
}

function placeSphere(x,y){
    xy = returnCoords(x,y);
    var material = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0x555555, shininess: 30 } );
    var sphere = new THREE.Mesh( tbGeo, material );
    sphere.position.set(xy[0],xy[1],-10);
    // not working
    if(spheres.children.forEach((sphere) => { sphere.position.x == xy[0] && sphere.position.y == xy[1] })) {
      console.log("Sphere already exists");
    } else if(notOutOfBounds(xy) == false) { writeString("<font color='red'>place in boundary</font>","node-id");
  } else if(isInArray(notOutOfBounds(xy),currentSpheres) != false) {
      writeString("sphere already exists","node-id");
    } else {
      spheres.add(sphere);
      let coords = notOutOfBounds(xy);
      coords.push(sphere.id)
      currentSpheres.push(coords);
    }
}

function highlightSphere(x,y){
  xy = returnCoords(x,y);
  writeNodes(xy);
  trackball.position.set(xy[0],xy[1],-10);
  trackball.visible = true;
}

function removeSphere(x,y){
  document.body.style.cursor = "img/cursor-eraser.png" // ...
  xy = returnCoords(x,y);

  if(isInArray(notOutOfBounds(xy),currentSpheres) != false) {
    let id = isInArray(notOutOfBounds(xy),currentSpheres);
    spheres.remove(spheres.getObjectById(id[0]))
    console.log(id[1],'id');
    currentSpheres.splice(id[1],1)
  } else { console.log("no sphere at xy") }
}

function removeAllSpheres(){
  //scene.remove(scene.getObjectByName( "spheres", true ));
  for (var i = spheres.children.length - 1; i >= 0; i--) {
      spheres.remove(spheres.children[i]);
  }
  currentSpheres = [];
}
