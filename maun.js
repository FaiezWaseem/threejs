import gsap from "https://cdn.skypack.dev/gsap"
import * as THREE from 'https://cdn.skypack.dev/three@0.126.1/build/three.module.js'
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.126.1/examples/jsm/controls/OrbitControls.js'
import * as dat from "https://cdn.skypack.dev/dat.gui"
//------Extra Stufff--------//
function get($){return document.querySelector($);}
function print($){console.log($);}
//-----------XXX--------------------//
var plane , planeMaterial , planeGeom , scene , camera , renderer , raycaster;

createdScene();
createPlan();
frontLight();
backLight();
rotateMesh();
camera.position.z = 5;
render();
sideBarValues();

const mouse = {
    x: undefined,
    y: undefined
}
addEventListener('mousemove', (event)=>{
    mouse.x = (event.clientX / innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / innerHeight) * 2 + 1;
})

animate();


function sideBarValues(){
    const gui = new dat.GUI()
const world = {
    plane: {
        width: 10,
        height: 10,
        widthSegments: 10,
        heightSegments: 10,
        r: 1,
        g: 0,
        b: 0
    }
}

gui.add(world.plane , 'width' , 1 , 20).onChange(() =>{planeOnChange()})
gui.add(world.plane , 'height' , 1 , 20).onChange(() =>{planeOnChange()})
gui.add(world.plane , 'heightSegments' , 1 , 50).onChange(() =>{planeOnChange()})
gui.add(world.plane , 'widthSegments' , 1 , 50).onChange(() =>{planeOnChange()})
gui.add(world.plane , 'r' , 0 , 255).onChange(() =>{planeOnChange()})
gui.add(world.plane , 'g' , 0 , 255).onChange(() =>{planeOnChange()})
gui.add(world.plane , 'b' , 0 , 255).onChange(() =>{planeOnChange()})
function planeOnChange(){
    plane.geometry.dispose();
    // print(plane.geometry.dispose())
    plane.geometry = new THREE.PlaneGeometry(
        world.plane.width,
        world.plane.height ,
        world.plane.widthSegments ,
        world.plane.heightSegments 
          );
          plane.material.color.r = world.plane.r;
          plane.material.color.g = world.plane.g;
          plane.material.color.b = world.plane.b;
    const {array} = plane.geometry.attributes.position;
for(let i = 0 ; i < array.length ; i +=3){
    const x = array[i]
    const y = array[i+1]
    const z = array[i+2]
array[i + 2] = z + Math.random();

}
  render();
}
}
function render(){renderer.render(scene, camera);}
function createdScene(){
    raycaster = new THREE.Raycaster();
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight , 0.1 , 1000);
    renderer = new THREE.WebGLRenderer();
    //----for better pixel
    renderer.setPixelRatio(devicePixelRatio)
    renderer.setSize(window.innerWidth , window.innerHeight)
    document.body.appendChild( renderer.domElement)
}
function rotateMesh(){
    var controls = new OrbitControls(camera , renderer.domElement);
    controls.addEventListener('change', render);
}
function frontLight(){
//-----add light to scenee
const light = new THREE.DirectionalLight(0xffffff, 1)
//x,y,z
light.position.set(0 ,0 ,1)
scene.add(light)
}
function createPlan(){
    planeGeom = new THREE.PlaneGeometry(10, 10 , 10 , 10);
    // const planeMaterial = new THREE.MeshBasicMaterial({color : 0xff0000, side : THREE.DoubleSide})
     planeMaterial = new THREE.MeshPhongMaterial({color : 0xff0000, side : THREE.DoubleSide , flatShading : THREE.FlatShading})
     plane = new THREE.Mesh(planeGeom , planeMaterial );
    
    var {array} = plane.geometry.attributes.position;
    for(let i = 0 ; i < array.length ; i +=3){
        const x = array[i]
        const y = array[i+1]
        const z = array[i+2]
    array[i + 2] = z + Math.random();
    
    }
    scene.add(plane)
}
function backLight(){
const backlight = new THREE.DirectionalLight(0xffffff, 1)
backlight.position.set(0 ,0 ,-1)
scene.add(backlight)
}
function animate() {
    requestAnimationFrame(animate)
    render();
    raycaster.setFromCamera(scene , camera);
    var intersect = raycaster.intersectObject(plane)
    if(intersect.lenght > 0){
        console.log('intersect');
    }
}