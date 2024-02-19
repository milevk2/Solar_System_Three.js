import { OrbitControls } from "../../../node_modules/three/examples/jsm/controls/OrbitControls.js" //"../../node_modules/three/examples/jsm/controls/OrbitControls.js"
import { camera } from "./camera.js";
import planetRenderer from "../renderers/renderer.js";

//I came across this functionality, which made me consider rewriting all the camera logic: https://threejs.org/docs/#examples/en/controls/OrbitControls
let cameraControls = null;

function initiateControls() {

    cameraControls = new OrbitControls(camera, planetRenderer.domElement);
    cameraControls.maxZoom = 800;
    cameraControls.autoRotate = true;
    cameraControls.autoRotateSpeed = 0.5;
    cameraControls.maxDistance = 800;
    cameraControls.minDistance = 100;
    cameraControls.zoomSpeed = 2;
    cameraControls.zoomToCursor = true;
}

export { initiateControls, cameraControls };