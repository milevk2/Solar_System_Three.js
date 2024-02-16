import scene from "./assets/js/scene.js";
import sun from "./assets/js/meshes/sun.js";
import galaxy from "./assets/js/meshes/galaxy.js";
import rayCast from "./assets/js/rayCast.js";
import { pause } from "./assets/js/utility/pause_ms.js";
import { camera, rotateCamera } from "./assets/js/camera.js"
import planetRenderer  from "./assets/js/renderers/renderer.js";
import { planets, moon, nameLabelsLoaded } from "./assets/js/meshes/planets.js";
import { lookAtCamera, resetVisualEffects } from "./assets/js/animation/VisualEffects.js";
import {rotateSelf, rotatePivot} from "./assets/js/animation/rotation.js";
import { Clock } from "three";


//pause logic on scene click:
document.querySelector('.webgl').addEventListener("mousedown", (e) => pause.value = true);
document.querySelector('.webgl').addEventListener("mouseup", (e) => pause.value = false);

window.addEventListener(
    "resize",
    () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        planetRenderer.setSize(window.innerWidth, window.innerHeight);
    },
);

const clock = new Clock();
let deltaTime;

const animate = () => {
    requestAnimationFrame(animate);

    deltaTime = clock.getDelta();
  
    if (pause.value == false) {
        
        rotateCamera(deltaTime);
        rotateSelf([galaxy, moon, sun, ...planets], deltaTime);
        rotatePivot([moon, ...planets], deltaTime);
        resetVisualEffects([moon, ...planets]);
        lookAtCamera([...planets]); 
    }
    rayCast();
    planetRenderer.render(scene, camera);
};

setTimeout(animate,1500) // waits 1.5 seconds before animation start just to make sure all the modules have loaded;



