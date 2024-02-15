import scene from "./assets/js/scene.js";
import { camera, cameraPivot } from "./assets/js/camera.js"
import { planetRenderer } from "./assets/js/renderers/default_renderer.js";
import { planets, moon } from "./assets/js/meshes/planets.js";
import sun from "./assets/js/meshes/sun.js";
import galaxy from "./assets/js/meshes/galaxy.js";
import { DoubleSide, Mesh, MeshBasicMaterial, PlaneGeometry, Raycaster, TextureLoader, Vector2 } from "three";

const raycaster = new Raycaster();
raycaster.layers.set(1)
const pointer = new Vector2();

function onPointerMove(e) {

    // calculate pointer position in normalized device coordinates
    // (-1 to +1) for both components

    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = - (e.clientY / window.innerHeight) * 2 + 1;

}

window.addEventListener('pointermove', onPointerMove);


// const textureLoader = new TextureLoader();
// let info = new Mesh(new PlaneGeometry(40, 40), new MeshBasicMaterial({
//     map: textureLoader.load('/assets/textures/moontext.png'),
//     side: DoubleSide,
//     transparent: false
// }))
// info.position.set(10,10,10)
// info.layers.set(1)


function rayCast() {

    raycaster.setFromCamera(pointer, camera);

    const intersects = raycaster.intersectObjects(scene.children);
    const intersected = intersects[0].object;

    if (intersected.uuid == moon.mesh.uuid) return;
    if (intersected.uuid == sun.mesh.uuid) return;
    if (intersected.uuid == galaxy.mesh.uuid) return;

    // if the intersected mesh is a namelabel or a ring  - do not apply emissive;
    if (intersected.hasOwnProperty('isNameLabel')) return; 
    if (intersected.hasOwnProperty('isRing')) return;
   intersected.material.emissive.set(0x3D85C6);
   intersected[intersected['name_label_id']].lookAt(camera.position);
   intersected[intersected['name_label_id']].material.visible = true;
 
}








// window.addEventListener('mousemove', (e)=>{


//     if (e.clientX > window.innerWidth / 2) {

//         camera.
//         camera.position.x += 0.1
//         camera.lookAt(sun.mesh.position)
//         camera.updateProjectionMatrix();

//     }
//     else if(e.clientX < window.innerWidth / 2){

//         camera.position.x -= 0.1
//         camera.lookAt(sun.mesh.position)
//         camera.updateProjectionMatrix();
//     }

// })


//pause logic on scene click:
let pause = false;
document.querySelector('.webgl').addEventListener("mousedown", (e) => {

    pause = true;

});

document.querySelector('.webgl').addEventListener("mouseup", (e) => {

    pause = false;

});

//resize listner
window.addEventListener(
    "resize",
    () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        planetRenderer.setSize(window.innerWidth, window.innerHeight);
    },
);


//the animation for the different Objects will be exported in a separate modules;
const animate = () => {

    requestAnimationFrame(animate);

    if (pause == false) {
        galaxy.mesh.rotateY(galaxy.rotation_self);
        moon.mesh.rotateY(moon.rotation_self);
        moon.pivot.rotateY(moon.rotation_pivot);
        sun.mesh.rotateY(sun.rotation_self);
        cameraPivot.rotateY(-0.005)
        cameraPivot.rotateX(0.001)
       
        // camera.lookAt(sun.mesh.position)
        //info.lookAt(camera.position)
        planets.forEach(planet => {
            planet.mesh.rotateY(planet.rotation_self); //rotate around self
            planet.pivot.rotateY(planet.rotation_pivot); //rotate around Sun
            planet.nameMesh.lookAt(camera.position);
            //reseting the planets colors possibly set by the raycaster:
           
            planet.mesh.material.emissive.set(0x000000);
            planet.nameMesh.material.visible = false;
        })

        moon.mesh.material.emissive.set(0x000000);

    }

    rayCast();
    camera.updateProjectionMatrix();
    planetRenderer.render(scene, camera);
};
animate();
