import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as dat from 'dat.gui'
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader.js'
 
const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
scene.fog = new THREE.Fog( 0xcccccc, 15, 205 );
//Color fondo
scene.background = new THREE.Color(0.95,0.6,0.5);

//Luz ambiental
const ambientLight = new THREE.AmbientLight(0xe0e0e0,1);
scene.add(ambientLight);

//Luz direccional
// const light = new THREE.DirectionalLight(0xffffff,0.6);
// light.position.set(0,4,2);
// scene.add(light);
// light.castShadow = true;

// Luz direccional
const directionalLight = new THREE.DirectionalLight(0xe0e0e0,6.25)
directionalLight.position.set(0,55,0)
scene.add(directionalLight)
directionalLight.castShadow = true
directionalLight.shadow.camera.right = 60
directionalLight.shadow.camera.left = -60
directionalLight.shadow.camera.bottom = -60
directionalLight.shadow.camera.top = 60


const dLightHelpert = new THREE.DirectionalLightHelper(directionalLight,5)
scene.add(dLightHelpert)

const camaraHelpert = new THREE.CameraHelper(directionalLight.shadow.camera)
scene.add(camaraHelpert)

// luz spotlight
const spotlight = new THREE.SpotLight('white', 1000)
spotlight.position.set(0,75,0)
scene.add(spotlight)
spotlight.castShadow=true

// spotlight.angle = Math.PI/10
// spotlight.penumbra = 0.5

const spotlightHelper = new THREE.SpotLightHelper(spotlight)
scene.add(spotlightHelper)

//neblina
// const scene = new THREE.Scene();
// scene.fog = new THREE.Fog( 0xcccccc, 10, 15 );

const renderer = new THREE.WebGLRenderer({ antialias: true});

// const imag = new URL('../images/LoftIndustrial.hdr', import.meta.url)

//HDR
const loader = new RGBELoader()
loader.load( './imag/LoftIndustrial.hdr', function (texture){
  texture.mapping = THREE.EquirectangularReflectionMapping
  scene.background = texture
  scene.environment = texture
})



renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

// const scene = new THREE.scene()

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
scene.add( camera )

// const zoomcamera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
// scene.add( zoomcamera );

// const renderer = new THREE.WebGLRenderer()
renderer.toneMapping = THREE.ACESFilmicToneMapping; //opciones aestethic
renderer.outputColorSpace = THREE.SRGBColorSpace; //opciones aestethic
renderer.setPixelRatio(window.devicePixelRatio); //opciones aestethic
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;

const controls = new OrbitControls( camera, renderer.domElement );

document.body.appendChild( renderer.domElement );

const planeG = new THREE.PlaneGeometry(150,150,2,2);
const planeMat = new THREE.MeshStandardMaterial( {color:0xffddc0} )
const plane = new THREE.Mesh(planeG,planeMat);
scene.add(plane);
plane.rotateX(-90*(Math.PI/180))
plane.position.set(0,-10,0);
plane.receiveShadow=true;



// const geometry = new THREE.BoxGeometry(4,4,4);
// const material = new THREE.MeshStandardMaterial( { color: 0xffffff, roughness: 0, metalness:1  } );  
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );
// cube.castShadow=true;
// cube.position.set(3,-25)


const arregloEsferas = []

let shpere

for(let i=0; i<30; i++){


  const sphereG = new THREE.SphereGeometry(3.5, 16, 8)
  const sphereM = new THREE.MeshPhongMaterial({color: 0xffffff * Math.random()})
  const shpere = new THREE.Mesh(sphereG,sphereM)
  shpere.castShadow = true
  scene.add(shpere)

  shpere.position.set(
  Math.random() * 150 - 75, 
  Math.random() * 120 - 60,
  Math.random() * 30 -90)

  arregloEsferas.push(shpere)
}





// const solG = new THREE.SphereGeometry(3,16,8);
// const solM = new THREE.MeshBasicMaterial({color:0xffff99});
// const sol = new THREE.Mesh(solG,solM);
// scene.add(sol);

// const grid = new THREE.GridHelper(10,10);
// scene.add( grid );

camera.position.z = 255;

// Instantiate a loader
const gltfloader = new GLTFLoader();
let shipModel;
let Cyrax;
let spiderman;
let electro;
let mew;
let mysterio;
let loadedModels = 0;

// for(let i=0; i<30; i++){

// 	gltfloader.load(
// 		// resource URL
// 		'public/Mysterio/mysterio.gltf',
// 		// called when the resource is loaded
// 		function ( gltf ) {
// 		mysterio = gltf.scene
// 			scene.add( mysterio );
	
// 			mysterio.scale.set(6.15,6.15,6.15);
// 			mysterio.position.set(-5, -4)
// 			mysterio.castShadow = true
			
	
// 			mysterio.traverse(subobjeto => {
// 				if(subobjeto.isMesh)//checamos si tiene mesh, si si, entonces le decimos que emita sombras
// 					subobjeto.castShadow = true;
// 			})
// 		},
// 		// called while loading is progressing
// 		function ( xhr ) {
// 			console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
// 		},
// 		// called when loading has errors
// 		function ( error ) {
// 			console.log( 'An error happened' );
// 		}
// 	);
	
// 	arregloModelos.push( modelo )
//   }

// Load a glTF resource
gltfloader.load(
	// resource URL
	'public/cyrax/Cyrax.gltf',
	// called when the resource is loaded
	function ( gltf ) {
    Cyrax = gltf.scene
		scene.add( Cyrax );

		Cyrax.scale.set(0.055,0.055,0.055);
		Cyrax.position.set(-55, -5)
		Cyrax.castShadow = true
		loadedModels++;
		

		Cyrax.traverse(subobjeto => {
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

// Load a glTF resource
gltfloader.load(
	// resource URL
	'public/spidermanweb/spiderman.gltf',
	// called when the resource is loaded
	function ( gltf ) {
    spiderman = gltf.scene
		scene.add( spiderman );

		spiderman.scale.set(6.15,6.15,6.15);
		spiderman.position.set(-37, -5)
		

		spiderman.traverse(subobjeto => {
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

// Load a glTF resource
gltfloader.load(
	// resource URL
	'public/Electro/electro.gltf',
	// called when the resource is loaded
	function ( gltf ) {
    electro = gltf.scene
		scene.add( electro );

		electro.scale.set(6.15,6.15,6.15);
		electro.position.set(-20, -6)
		electro.castShadow = true		

		electro.traverse(subobjeto => {
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

// Load a glTF resource
gltfloader.load(
	// resource URL
	'public/Mysterio/mysterio.gltf',
	// called when the resource is loaded
	function ( gltf ) {
    mysterio = gltf.scene
		scene.add( mysterio );

		mysterio.scale.set(6.15,6.15,6.15);
		mysterio.position.set(-5, -4)
		mysterio.castShadow = true
		

		mysterio.traverse(subobjeto => {
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

// Load a glTF resource
gltfloader.load(
	// resource URL
	'public/Mew/mew.gltf',
	// called when the resource is loaded
	function ( gltf ) {
    mew = gltf.scene
		scene.add( mew );

		mew.scale.set(0.095,0.095,0.095);
		mew.position.set(12, -5)
		mew.castShadow = true
		

		mew.traverse(subobjeto => {
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

// Load a glTF resource
gltfloader.load(
	// resource URL
	'public/Magikarp/Magikarp.gltf',
	// called when the resource is loaded
	function ( gltf ) {
    shipModel = gltf.scene
		scene.add( shipModel );

		shipModel.scale.set(1.15,1.15,1.15);
		shipModel.position.set(30, -3)
		shipModel.castShadow = true


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



// const gui = new dat.GUI()
// let options ={
// 	xPos: 0,
// 	yPos: 0,
// 	zPos: 0,
// }

// gui.add(options, 'xPos', -20, 20)
// gui.add(options, 'yPos', -20, 20)
// gui.add(options, 'zPos', -20, 20)

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
	// console.log(mouseCoodinates)
	raycaster.setFromCamera( mouseCoodinates, camera );
	// const objetosIntercetados = raycaster.intersectObjects( scene.children )
	// const objetosIntercetados = raycaster.intersectObjects( arregloEsferas )
	// const objetosIntercetados = raycaster.intersectObjects( arregloModelos )
	// const cube = raycaster.intersectObject(cube)
	// const objetoaseguir = raycaster.intersectObjects( shipModel )
	
	
	
	// if(objetosIntercetados.length > 0){
		
	// 	if(ultimoClickado != undefined){
			
	// 		ultimoClickado.material.color.set(0xff0000 * Math.random)
			
	// 	}
		
		
		
		// console.log(ultimoClickado)
	// 	ultimoClickado = objetosIntercetados[0].object;//asigno al ultimo que le di click
	// 	objetosIntercetados[0].object.material.color.set(0xff0000)
	
	// ultimoClickado = cube[0].object.position

	// }
	// if(objetosIntercetados.length > 0){
	// 	ultimoClickado = cube[0].object
	// }
	
	
}

let ultimoClickado

function animate() { 
	requestAnimationFrame( animate );
	let delta = clock.getDelta();
	let time = clock.getElapsedTime();
	
	// cube.position.set(
		//     options.xPos, 
		//     options.yPos,
		//     options.zPos,
		//   )
		
	

	if(mew!=undefined){
		
		if(ultimoClickado != undefined){
			
			if(mew.position.distanceTo(ultimoClickado.position) > 2){
				mew.lookAt(ultimoClickado.position)
				mew.translateZ(delta * 2)
			}
			
		}
		
		
	}
	if(Cyrax!=undefined){
		
		if(ultimoClickado != undefined){
			
			if(Cyrax.position.distanceTo(ultimoClickado.position) > 2){
				Cyrax.lookAt(ultimoClickado.position)
				Cyrax.translateZ(delta * 2)
			}
			
		}
		
		
	}
		
	if(electro!=undefined){
		
		if(ultimoClickado != undefined){
			
			if(electro.position.distanceTo(ultimoClickado.position) > 2){
				electro.lookAt(ultimoClickado.position)
				electro.translateZ(delta * 2)
			}
			
		}
		
		
	}

	if(spiderman!=undefined){
		
		if(ultimoClickado != undefined){
			
			if(spiderman.position.distanceTo(ultimoClickado.position) > 2){
				spiderman.lookAt(ultimoClickado.position)
				spiderman.translateZ(delta * 2)
			}
			
		}
		
		
	}

	if(shipModel!=undefined){
		
		if(ultimoClickado != undefined){
			
			if(shipModel.position.distanceTo(ultimoClickado.position) > 2){
				shipModel.lookAt(ultimoClickado.position)
				shipModel.translateZ(delta * 2)
			}
			
		}
		
		
	}

	if(mysterio!=undefined){
		
		if(ultimoClickado != undefined){
			
			if(mysterio.position.distanceTo(ultimoClickado.position) > 2){
				mysterio.lookAt(ultimoClickado.position)
				mysterio.translateZ(delta * 2)
			}
			
		}
		
		
	}

		
		
		
  //  sol.rotateY(delta*0.2)
  
  if(Cyrax!=undefined){

	  Cyrax.rotateY(delta*0.5)
  }

  if(spiderman!=undefined){

	spiderman.rotateY(delta*0.5)
	}

	if(electro!=undefined){

	electro.rotateY(delta*0.5)
	}

	if(mysterio!=undefined){

	mysterio.rotateY(delta*0.5)
	}

	if(mew!=undefined){

	mew.rotateY(delta*0.5)
	}

  
	if(shipModel!=undefined){
	shipModel.rotateY(delta*0.5)
	}
  

	// arregloEsferas[0].lookAt(0,0,0);
	// arregloEsferas[0].translateZ(delta*2);

	arregloEsferas.forEach((esfera)=>{
		esfera.lookAt(0,0,0);
		esfera.translateZ(delta*20);
	})

	camera.position.set(Math.sin(time),0,155)
	// camera.position.lerpVectors()

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