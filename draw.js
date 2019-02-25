var mx = -10;

function returnX(x,y){
  var material = new THREE.LineBasicMaterial({ color: 0xff0000 });
  for (i = 0; i < 2; i++) {
    let k;
    if(i % 2 == 0) { k = 1 } else { k = -1 }
    let geometry = new THREE.Geometry();
    geometry.vertices.push(
      new THREE.Vector3( -.05*k, -.05, -10 ),
      new THREE.Vector3( .05*k, .05, -10 )
    );
    let xLine = new THREE.Line( geometry, material );
    xLine.position.set(x,y,mx)
    scene.add( xLine );
  }
}

var points = []
var tmpPoints = []
var group;
var MAX_PTS = 3;

function placeTmpPoint(x,y){
  var geometry = new THREE.BoxGeometry( .015, .015, .0001 );
  var material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
  var tmpPoint = new THREE.Mesh( geometry, material );
  tmpPoint.position.set(x,y,mx)
  tmpPoint.name = 'temp';
  scene.add( tmpPoint );
}

function drawDot(x,y){
  var material = new THREE.LineBasicMaterial({ color: 0xffffff });
  if(points.length == 0) {
    let geometry = new THREE.Geometry();
    geometry.vertices.push( new THREE.Vector3( x, y, mx ) );
    points.push(geometry)
    placeTmpPoint(x,y)
  } else {
    points[0].vertices.push( new THREE.Vector3( x, y, mx ) );
    placeTmpPoint(x,y)
    if(points[0].vertices.length > MAX_PTS){
      let xLine = new THREE.Line( points[0], material );
      xLine.name = 'xlinemarker';
      scene.add( xLine );
      createConvexGeo(points[0].vertices);
      points = []
      for(i=0; i<MAX_PTS+1; i++) { scene.children.forEach(child => child.name == "temp" ? scene.remove(child) : null) }
    }
  }
  let str = writeInfo();
  writeString(str,"functions-id")
}

function handleVertices(vertices){
  let testVerts = [];
  vertices.forEach((vert => { testVerts.push( new THREE.Vector3().copy(vert), new THREE.Vector3().copy(vert.setZ(vert.z+=1))) }));
  return testVerts;
}

var meshCount = 0;
var subMeshCount = 0;

function writeInfo(){
  let mpts = MAX_PTS+1, cpts, add, add2;

  if(points.length <= 0) { cpts = 0 }
  else{ cpts = points[0].vertices.length }

  if(mpts == cpts){ subMeshCount += 1 }
  if(subMeshCount > 0){ add = "<a onclick='finishMesh()'>press F to finish mesh</a>" }
  else{ add = "" }
  if(meshCount >= 1){ add2 = "<br>use W A S D to rotate<br>use C to scroll mat color" } else { add2=""}

  str = "max pts: "+mpts+"<br>"
        +"current pts: "+cpts+"<br>"
        +"mesh count: "+meshCount+"<br>"
        +"submesh count: "+subMeshCount+"<br>"
        +add+add2
  return str;
}

function createConvexGeo(vertices){
  let group = new THREE.Group();
  let verts = handleVertices(vertices)
  //writeString("snap disabled "+verts[1].x,"functions-id")
  //writeString("<a onclick='finishMesh()'>finish mesh</a> "+verts[1].x,"functions-id")
  let str = writeInfo();
  writeString(str,"functions-id")
  //scene.children.forEach((child) => { scene.remove(scene.getObjectByName("convexgeo", true)) })
  var meshMaterial = new THREE.MeshLambertMaterial( { color: 0xffffff, opacity: 0.5, transparent: true } );
  var meshGeometry = new THREE.ConvexBufferGeometry( verts );
  var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
  mesh.material.side = THREE.BackSide; // back faces
  mesh.renderOrder = 0;
  group.add( mesh );
  var mesh = new THREE.Mesh( meshGeometry, meshMaterial.clone() );
  mesh.material.side = THREE.FrontSide; // front faces
  mesh.renderOrder = 1;
  group.add( mesh );
  group.name = "convexgeo"+meshCount;
  scene.add(group);
}

const returnMesh = () => { let count = meshCount-1, name = "customMesh"+count, obj = scene.getObjectByName(name);
  return obj;
}

function rotateMesh(c){
  let obj = returnMesh();
  if(c=='up'){ obj.rotation.x-=.01; }
  else if(c=='down'){ obj.rotation.x+=.01; }
  else if(c=='left'){ obj.rotation.y+=.01; }
  else{ obj.rotation.y-=.01; }
}

var colors = [0xffffff,0xff0000,0x00ff00,0x0000ff,0xff00e4,0xffff00,0xa200ff,0x00eaff,0xff9000,0x000000]
var ci = 0;
function enumerate(){
  if((ci+1)>colors.length) { ci = 0 }
  else{ ci+=1 }
}

function scrollColor(){
  let obj = returnMesh();
  enumerate();
  obj.children.forEach((child) => {
    child.children.forEach((c) => {
      c.material.color.setHex( colors[ci] )
    })
  })
}

function finishMesh(){
  if(subMeshCount>=1){
    nameIndex = "convexgeo"+meshCount;
    if(scene.getObjectByName(nameIndex) == null) { console.log("no meshes currently active") }
    let customMesh = new THREE.Group();
    customMesh.name = "customMesh"+meshCount;
    scene.children.forEach((child) => { if (child.name == nameIndex) { customMesh.add(child) } });
    scene.add(customMesh);

    customMesh.children.forEach((child) => {
      child.children.forEach((c) => {
        c.geometry.center();
      })
    })

    meshCount += 1;
    subMeshCount = 0;
    let str = writeInfo("mesh added");
    writeString(str,"functions-id")
    console.log(scene.children,'scene.children');
  } 
}

function removeAllLines(){
  for (var i = scene.children.length - 1; i >= 0; i--) {
      scene.remove(scene.getObjectByName('xlinemarker'));
  }
  writeString('removed all lines','left-id')
}
