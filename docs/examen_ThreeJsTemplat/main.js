
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as dat from 'dat.gui'
 
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

//Color fondo
scene.background = new THREE.Color(0.95,0.6,0.5);

//Luz ambiental
const ambientLight = new THREE.AmbientLight(0xe0e0e0,1);
scene.add(ambientLight);

//Luz direccional
const light = new THREE.DirectionalLight(0xffffff,0.6);
light.position.set(0,4,2);
scene.add(light);
light.castShadow = true;

const renderer = new THREE.WebGLRenderer();
renderer.toneMapping = THREE.ACESFilmicToneMapping; //opciones aestethic
renderer.outputColorSpace = THREE.SRGBColorSpace; //opciones aestethic
renderer.setPixelRatio(window.devicePixelRatio); //opciones aestethic
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;

const controls = new OrbitControls( camera, renderer.domElement );

document.body.appendChild( renderer.domElement );

const planeG = new THREE.PlaneGeometry(30,30,2,2);
const planeMat = new THREE.MeshStandardMaterial( {color:0xffddc0} )
const plane = new THREE.Mesh(planeG,planeMat);
scene.add(plane);
plane.rotateX(-90*(Math.PI/180))
plane.position.set(0,-5,0);
plane.receiveShadow=true;



const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshPhongMaterial( { color: 0xffffff } );  
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
cube.castShadow=true;

const arregloEsferas = []


for(let i=0; i<30; i++){


  const sphereG = new THREE.SphereGeometry(0.5, 16, 8)
  const sphereM = new THREE.MeshPhongMaterial({color: 0xffffff * Math.random()})
  const shpere = new THREE.Mesh(sphereG,sphereM)
  shpere.castShadow = true
  scene.add(shpere)

  shpere.position.set(
  Math.random() *30 - 15, 
  Math.random() * 10,
  Math.random() *30 - 15)

  arregloEsferas.push(shpere)
}





const solG = new THREE.SphereGeometry(3,16,8);
const solM = new THREE.MeshBasicMaterial({color:0xffff99});
const sol = new THREE.Mesh(solG,solM);
scene.add(sol);

// const grid = new THREE.GridHelper(10,10);
// scene.add( grid );

camera.position.z = 15;

// Instantiate a loader
const gltfloader = new GLTFLoader();
let shipModel;

// Load a glTF resource
gltfloader.load(
	// resource URL
	'models/ship/spaceship.gltf',
	// called when the resource is loaded
	function ( gltf ) {
    shipModel = gltf.scene
		scene.add( shipModel );

		shipModel.scale.set(0.15,0.15,0.15);

		shipModel.traverse(subobjeto => {
			if(subobjeto.isMesh)//checamos si tiene mesh, si si, entonces le decimos que emita sombras
				subobjeto.castShadow = true;
		})
	},
	// called while loading is progressing
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	// called when loading has errors
	function ( error ) {
		console.log( 'An error happened' );
	}
);

const gui = new dat.GUI()
let options ={
  xPos: 0,
  yPos: 0,
  zPos: 0,
}

gui.add(options, 'xPos', -20, 20)
gui.add(options, 'yPos', -20, 20)
gui.add(options, 'zPos', -20, 20)

const clock = new THREE.Clock();

// document.addEventListener('mousemove',onMouseClick)
// document.addEventListener('click',onMouseClick)
document.addEventListener('mousedown',onMouseClick)

const raycaster = new THREE.Raycaster();
const mouseCoodinates = new THREE.Vector2();

function onMouseClick( event ) {

let clickderecho = false
if(event.button === 2){
  clickderecho = true
}

	// calculate mouseCoodinates position in normalized device coordinates
	// (-1 to +1) for both components

	mouseCoodinates.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouseCoodinates.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  console.log(mouseCoodinates)
  raycaster.setFromCamera( mouseCoodinates, camera );
  // const objetosIntercetados = raycaster.intersectObjects( scene.children )
  const objetosIntercetados = raycaster.intersectObjects( arregloEsferas )

  if(objetosIntercetados.length > 0){

    // console.log(objetosIntercetados[0].object)
    objetosIntercetados[0].object.material.color.set(0xff0000)
    

    if(clickderecho){
      scene.attach(objetosIntercetados[0].object)
    }else{
      sol.attach(objetosIntercetados[0].object)
    }

  }
}



function animate() { 
  requestAnimationFrame( animate );
	let delta = clock.getDelta();
	let time = clock.getElapsedTime();

  cube.position.set(
      options.xPos, 
      options.yPos,
      options.zPos,
    )

	if(shipModel!=undefined){

    if(shipModel.position.distanceTo(cube.position) > 2){
      shipModel.lookAt(cube.position)
      shipModel.translateZ(delta * 2)

    }

	
   }

   sol.rotateY(delta*0.2)


   arregloEsferas.forEach((esfera, indice)=> {

    esfera.position.y = Math.sin(time + indice)

   })

  controls.update();
  renderer.render( scene, camera );
}

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){ //funcion para redimensionar ventana si el usuario le anda moviendo
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );
}

animate(); //Iniciamos el loop

//vectores
//suma de vectores
//multiplicación por un escalar
//normalizacion
//seno y coseno
//lerp
//distance
//translate
//lookAt