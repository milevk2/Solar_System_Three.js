import { Object3D, PerspectiveCamera, Vector3 } from "three";
import { pause_ms } from "./utility/pause_ms.js";
import {OrbitControls} from "../../node_modules/three/examples/jsm/controls/OrbitControls.js"
import planetRenderer from "./renderers/renderer.js";
import sun from "./meshes/sun.js";
//ensure that the initial state of the scroller is always the top of the viewport
window.scroll(0, 0);

/*-------------------------CAMERA SETTINGS---------------------*/

const fov = 60;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 3000;

const camera = new PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 200;
camera.position.x = 0;
camera.layers.set(1);
const cameraPivot = new Object3D();
cameraPivot.pivotName = 'pivotName'

/*-------------------------CAMERA POSITION FUNCTIONALITY---------------------*/

let directionX = -0.1;
let directionY = -0.1;
let cameraWorldPosition = new Vector3();

//I came across this functionality, which made me consider rewriting all the camera logic: https://threejs.org/docs/#examples/en/controls/OrbitControls
const controls = new OrbitControls( camera, planetRenderer.domElement )
controls.maxZoom = 800;
controls.autoRotate = true;
controls.autoRotateSpeed =0.8;
controls.maxDistance = 800;
controls.minDistance = 100;
controls.zoomSpeed = 2;
controls.zoomToCursor = true;
//changes the direction of the rotation of the camera around it's pivot Y axis on every 10 secs.
function adjustRotationY () {
   
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

    if (cameraWorldPosition.y >= 70 ){
        directionX = 0.1;
    }
    else if (cameraWorldPosition.y < -70 ) {
        directionX = -0.1;
    }
}


function rotateCamera(deltaTime) {

    adjustRotationX();
    cameraPivot.rotateY(directionY * deltaTime);
    cameraPivot.rotateX(directionX * deltaTime);
    controls.update(deltaTime);
    camera.updateProjectionMatrix();
}


export { camera, cameraPivot, rotateCamera, controls};