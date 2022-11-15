import * as three from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
// STARS
import starsTexture from './src/img/stars.jpg';
import sunTexture from './src/img/sun.jpg';
// PLANETS
import mercuryTexture from './src/img/mercury.jpg';
import venusTexture from './src/img/venus.jpg';
import earthTexture from './src/img/earth.jpg';
import marsTexture from './src/img/mars.jpg';
import jupiterTexture from './src/img/jupiter.jpg';
import saturnTexture from './src/img/saturn.jpg';
import saturnRingTexture from './src/img/saturn ring.png';
import uranusTexture from './src/img/uranus.jpg';
import uranusRingTexture from './src/img/uranus ring.png';
import neptuneTexture from './src/img/neptune.jpg';
import plutoTexture from './src/img/pluto.jpg';
// MOONS
import earthMoonTexture from './src/img/moons/earthMoon.jpg';

const renderer = new three.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new three.Scene();
const camera = new three.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(-90, 140, 140);
orbit.update();

const ambientLight = new three.AmbientLight(0x333333);
scene.add(ambientLight);

const cubeTextureLoader = new three.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture
])
const textureLoader = new three.TextureLoader();
// LIGHT
const pointLight = new three.PointLight(0xffffff, 2, 300)
scene.add(pointLight);

// CREATE PLANET FUNC
function createPlanet(size , texture , position , ring){
  const geo = new three.SphereGeometry(size, 30, 30)
  const mat = new three.MeshStandardMaterial({
    map : textureLoader.load(texture)
  })
  const mesh = new three.Mesh(geo, mat);
  const obj = new three.Object3D();
  obj.add(mesh);
  if(ring){
        const ringGeo = new three.RingGeometry(
            ring.innerRad,
            ring.outerRad,
            32
            );
        const ringMat = new three.MeshBasicMaterial({
          map : textureLoader.load(ring.texture),
          side : three.DoubleSide
        })
        const ringMesh= new three.Mesh(ringGeo, ringMat);
        
        obj.add(ringMesh);
        ringMesh.position.x = position;
        ringMesh.rotation.x = -0.5* Math.PI;
    
  }
  scene.add(obj);
  mesh.position.x = position;

  return {mesh, obj}
}



// SUN
const sunGeo = new three.SphereGeometry(16, 30, 30);
const sunMat = new three.MeshBasicMaterial({
  map : textureLoader.load(sunTexture)
})
const sun = new three.Mesh(sunGeo, sunMat);
scene.add(sun);

 /*Mercury*/ const mercury = createPlanet(3.2, mercuryTexture, 28);
 /*Venus*/ const venus = createPlanet(5.8, venusTexture, 44);
 /*Earth*/ const earth = createPlanet(6, earthTexture, 62);
 /*Mars*/ const mars = createPlanet(6, marsTexture, 78);
 /*Jupiter*/ const jupiter = createPlanet(10, jupiterTexture, 100);
 /*Saturn*/ const saturn = createPlanet(10, saturnTexture, 138, {
  innerRad: 10,
  outerRad: 20,
  texture: saturnRingTexture
 });
  /*Uranus*/ const uranus = createPlanet(7, uranusTexture, 176, {
    innerRad: 7,
    outerRad: 12,
    texture: uranusRingTexture
   });
 /*Neptune*/ const neptune = createPlanet(7, neptuneTexture, 200);
 /*Pluto*/ const pluto = createPlanet(7, plutoTexture, 216);














function animate(){


  // SELF ROTATION
  sun.rotateY(0.004)
  mercury.mesh.rotateY(0.004)
  venus.mesh.rotateY(0.002)
  earth.mesh.rotateY(0.02)
  mars.mesh.rotateY(0.018)
  jupiter.mesh.rotateY(0.04)
  saturn.mesh.rotateY(0.038)
  uranus.mesh.rotateY(0.03)
  neptune.mesh.rotateY(0.032)
  pluto.mesh.rotateY(0.008)


  // AROUND SUN ROTATION
  mercury.obj.rotateY(0.04)
  venus.obj.rotateY(0.015)
  earth.obj.rotateY(0.01)
  mars.obj.rotateY(0.008)
  jupiter.obj.rotateY(0.002)
  saturn.obj.rotateY(0.009)
  uranus.obj.rotateY(0.004)
  neptune.obj.rotateY(0.0001)
  pluto.obj.rotateY(0.0007)



  renderer.render(scene,camera)
}
renderer.setAnimationLoop(animate);

window.addEventListener('resize',function(){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});