let scene;
let camera;
let renderer;

function scene_setup() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
}
scene_setup();

const shaderCode = document.getElementById("fragShader").innerHTML;

const textureURL = "Grid.png";
const normalURL = "aerial_rocks_02_nor_gl_4k.png";
THREE.ImageUtils.crossOrigin = '';

const texture = THREE.ImageUtils.loadTexture(textureURL);
const normal = THREE.ImageUtils.loadTexture(normalURL);

let uniforms = {
	norm: {type:'t', value:normal},
	light: {type:'v3', value: new THREE.Vector3()},
	tex: { type:'t', value:texture },
	res: { type:'v2', value:new THREE.Vector2(window.innerWidth,window.innerHeight)}
};




let material = new THREE.ShaderMaterial({uniforms:uniforms, fragmentShader:shaderCode});
let geometry = new THREE.PlaneGeometry(10,10);
let sprite = new THREE.Mesh(geometry, material);

scene.add(sprite);
camera.position.z = 2;

uniforms.light.value.z = 0.5;

function render() {
	requestAnimationFrame( render );
	renderer.render( scene, camera );
}
render();

document.onmousemove = function(event) {
	uniforms.light.value.x = event.clientX;
	uniforms.light.value.y = -event.clientY + window.innerHeight;
	console.log(uniforms.light.value.y);
}