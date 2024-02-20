import scene from "./assets/js/scene.js";
import sun from "./assets/js/meshes/sun.js";
import galaxy from "./assets/js/meshes/galaxy.js";
import rayCast from "./assets/js/rayCast.js";
import { pause } from "./assets/js/utility/pause_ms.js";
import { camera, cameraMainFunction, cameraAutoRotate} from "./assets/js/camera/camera.js"
import planetRenderer from "./assets/js/renderers/renderer.js";
import { planets, moon, nameLabelsLoaded } from "./assets/js/meshes/planets.js";
import { pointNameLabelToCamera, resetVisualEffects } from "./assets/js/animation/VisualEffects.js";
import { rotateSelf, rotatePivot } from "./assets/js/animation/rotation.js";
import { Clock } from "three";
import { cameraControls } from "./assets/js/camera/controls.js";
import { canvas } from "./assets/js/event-listeners/listeners.js";


let isWheeLing = false;
let documentDeltaY = 0;

canvas.addEventListener("wheel", (e) => {
    //extracting the data to the outer scope so we can pass it to the animation loop to ensure smooth rotation;
    documentDeltaY = e.deltaY;
    isWheeLing = true;
})

const clock = new Clock();
let deltaTime;

const animate = () => {
    requestAnimationFrame(animate);

    if (nameLabelsLoaded == undefined) return;

    deltaTime = clock.getDelta();

    if (pause.value == false) {

        if (isWheeLing) {

            cameraMainFunction(deltaTime, documentDeltaY);
        }

        if(cameraControls !== null) {

            cameraControls.update();
        }

        cameraAutoRotate(deltaTime);
        rotateSelf([galaxy, moon, sun, ...planets], deltaTime);
        rotatePivot([moon, ...planets], deltaTime);
        resetVisualEffects([moon, ...planets]);
        pointNameLabelToCamera([...planets]);     //it is the planets nameLabels we are making look at the camera;
        documentDeltaY = 0;             //zeroing out the deltaY, otherwise the cameraMainFunction will continue affecting the camera position
        isWheeLing = false;             //just like the below comment - I want to be sure there won't be any side effects;
    }
    rayCast();
    planetRenderer.render(scene, camera);
};
animate();

//setTimeout(animate,1500) // waits 1.5 seconds before animation start just to make sure all the modules have loaded;

