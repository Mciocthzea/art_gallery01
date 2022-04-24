import * as THREE from ".//three/three.module.js"
import * as GLTF from ".//three/GLTFLoader.js"
import {OrbitControls} from ".//three/OrbitControls.js"
import {PointerLockControls} from ".//three/PointerLockControls.js"

const canvas01 = document.getElementById("canvas01");
const my_renderer = new THREE.WebGLRenderer({canvas:canvas01,antialias:true,physicallyCorrectLights:true});
//renderer.physicallyCorrectLights = true;
const scene = new THREE.Scene();
const aspect_ratio= canvas01.clientWidth/canvas01.clientHeight;
const fov=50;
const near=0.1;
const far=100;
const camera= new THREE.PerspectiveCamera(fov,aspect_ratio,near,far);
camera.position.y=0.4;
//const controls = new OrbitControls(camera,canvas01);
const controls = new PointerLockControls(camera, canvas01);
let movDirection ="idle";

function on3DLoad(asset){
    scene.add(asset.scene);
    my_renderer.render(scene,camera);
}

function onClick(){
    controls.lock();
}

function onKeyDown(event){
    
    switch(event.code){
        case("KeyW"):
            movDirection="forward"
            break;
        case("KeyA"):
            movDirection="left"
            break;
        case("KeyD"):
            movDirection="r"
            break;
        case("KeyS"):
            movDirection="backward"
            break;
    }
    console.log(movDirection);
}

function onKeyUp(event){
    
    movDirection="idle";
}

function init(){

    
    const cube_geom= new THREE.BoxGeometry();
    const cube_mat= new THREE.MeshPhongMaterial({color:0x00ff00});
    const cube_mat2= new THREE.MeshBasicMaterial({color:0x00ff00});
    const cube_mesh=new THREE.Mesh(cube_geom,cube_mat);
    //const dir_light = new THREE.DirectionalLight();
    const amb_light = new THREE.AmbientLight(0xffffff,0.4);

    const gltfLoader = new GLTF.GLTFLoader();

    const model = gltfLoader.load(".//assets/van_gogh07.glb",on3DLoad);
    scene.add(amb_light);

    
    my_renderer.render(scene,camera);
    
    canvas01.addEventListener('click',onClick)
    document.addEventListener('keydown',onKeyDown);
    document.addEventListener('keyup',onKeyUp);
}

function animate() {

	requestAnimationFrame( animate );

	// required if controls.enableDamping or controls.autoRotate are set to true
	//controls.update();
    const delta_dist=0.05;
	my_renderer.render( scene, camera );
    let distance=0;

    if (controls.isLocked){
        switch(movDirection){
            case("forward"):
                distance=delta_dist;
                controls.moveForward(distance);
                break;
            case("backward"):
                distance=-delta_dist;
                controls.moveForward(distance);
                break;
            case("r"):
                distance=delta_dist;
                controls.moveRight(distance);
                break;
            case("left"):
                distance=-delta_dist;
                controls.moveRight(distance);
                break;
    }
    


    }

}

function main(){
    init();

    animate();
}

main();