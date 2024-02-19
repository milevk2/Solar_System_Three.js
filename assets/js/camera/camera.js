import { Object3D, PerspectiveCamera, Vector3 } from "three";
import { planets } from "../meshes/planets.js";
import sun from "../meshes/sun.js";
import scene from "../scene.js";
import { cameraControls, initiateControls } from "./controls.js";
import { showNameLabels } from "../animation/VisualEffects.js";

const [mercury, venus, earth, mars, jupiter, saturn, uranus, neptune, pluto] = planets;

const canvas = document.querySelector('.webgl')
//ensure that the initial state of the scroller is always the top of the viewport
window.scroll(0, 0);

/*-------------------------CAMERA SETTINGS---------------------*/

const fov = 60;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 3000;

const camera = new PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 50;
camera.position.x = 50;
camera.position.y = 0;
camera.layers.set(1);

//cameraPivot.pivotName = 'pivotName'

/*-------------------------CAMERA POSITION FUNCTIONALITY---------------------*/

let directionX = -0.1;
let directionY = -0.1;
let cameraWorldPosition = new Vector3();

//changes the direction of the rotation of the camera around it's pivot Y axis on every 10 secs.
function adjustRotationY() {

    if (directionY < 0) {

        directionY = 0.1;
        return;
    }
    directionY = -0.1;
}
setInterval(adjustRotationY, 10 * 1000);


//changes the direction of the rotation of the camera around it's pivot X axis if camera position is above/below certain boundary.
function adjustRotationX() {

    camera.getWorldPosition(cameraWorldPosition);

    if (cameraWorldPosition.y >= 70) {
        directionX = 0.1;
    }
    else if (cameraWorldPosition.y < -70) {
        directionX = -0.1;
    }
}


function cameraAutoRotate(deltaTime) {

    if (cameraControls !== null) return // stop autoRotations on cameraControls initialization as cameraControls have their own rotation method;
    adjustRotationX();
    cameraPivot.mesh.rotateY(directionY * deltaTime);
    cameraPivot.mesh.rotateX(directionX * deltaTime);
    camera.updateProjectionMatrix();
}


let cameraPivot = sun;
let previousCameraPivot = null;

function updatePivot(newPivotPlanet) {

    if (previousCameraPivot !== null) {
        previousCameraPivot.mesh.remove(camera);
        previousCameraPivot.rotation_self = previousCameraPivot.savedRotation_self;
    }

    cameraPivot = newPivotPlanet;
    cameraPivot.mesh.add(camera);
    cameraPivot.savedRotation_self = cameraPivot.rotation_self;
    cameraPivot.rotation_self = 0.1;
    previousCameraPivot = cameraPivot;
}


function cameraMainFunction(deltaTime, documentDeltaY) {

    const documentPosition = window.scrollY;

    //if (cameraControls == null && scrollY > 13500) return;

    if (documentPosition > 50 && documentPosition <= 1500) {

        if (cameraPivot.name == 'Mercury') {

            rotatePivotOnScroll(mercury.mesh, documentDeltaY, deltaTime);
            return
        }

        updatePivot(mercury);
    }
    else if (documentPosition > 1500 && documentPosition <= 3000) {

        if (cameraPivot.name == 'Venus') {

            rotatePivotOnScroll(venus.mesh, documentDeltaY, deltaTime);
            return
        }

        updatePivot(venus);
    }
    else if (documentPosition > 3000 && documentPosition <= 4500) {

        if (cameraPivot.name == 'Earth') {

            rotatePivotOnScroll(earth.mesh, documentDeltaY, deltaTime);
            return
        }

        updatePivot(earth);
    }
    else if (documentPosition > 4500 && documentPosition <= 6000) {

        if (cameraPivot.name == 'Mars') {

            rotatePivotOnScroll(mars.mesh, documentDeltaY, deltaTime);
            return
        }

       updatePivot(mars);
    }
    else if (documentPosition > 6000 && documentPosition <= 7500) {

        if (cameraPivot.name == 'Jupiter') {

            rotatePivotOnScroll(jupiter.mesh, documentDeltaY, deltaTime);
            return
        }

        updatePivot(jupiter);
    }
    else if (documentPosition > 7500 && documentPosition <= 9000) {

        if (cameraPivot.name == 'Saturn') {

            rotatePivotOnScroll(saturn.mesh, documentDeltaY, deltaTime);
            return
        }

       updatePivot(saturn);
    }
    else if (documentPosition > 9000 && documentPosition <= 10500) {

        if (cameraPivot.name == 'Uranus') {

            rotatePivotOnScroll(uranus.mesh, documentDeltaY, deltaTime);
            return
        }

        updatePivot(uranus);
    }
    else if (documentPosition > 10500 && documentPosition <= 12000) {

        if (cameraPivot.name == 'Neptune') {

            rotatePivotOnScroll(neptune.mesh, documentDeltaY, deltaTime);
            return
        }

        updatePivot(neptune);
    }
    else if (documentPosition > 12000 && documentPosition <= 13000) {

        if (cameraPivot.name == 'Pluto') {

            rotatePivotOnScroll(pluto.mesh, documentDeltaY, deltaTime);
            return
        }

        updatePivot(pluto);
    }
    else if (documentPosition > 13000) {

       
        if (cameraControls !== null) return;
        pluto.mesh.remove(camera);
        showNameLabels.show = true;
        console.log('camera initiated');
        initiateControls();
    }
}

function rotatePivotOnScroll(planet, documentDeltaY, deltaTime) {

    let multiplier = documentDeltaY > 0 ? 1 : -1;  //determines the spinning direction of the camera around it's pivot planet
    planet.rotateY(20 * multiplier * deltaTime);
    camera.updateProjectionMatrix();
}

export { camera, cameraPivot, cameraAutoRotate, cameraMainFunction };