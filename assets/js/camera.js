import { Object3D, PerspectiveCamera } from "three";
import pause_ms from "./utility/pause_ms.js";

//ensure that the initial state of the scroller is always the top of the viewport
window.scroll(0, 0);


/*-------------------------CAMERA SETTINGS---------------------*/

const fov = 60;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 3000;

const camera = new PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 60;
camera.position.x = 0;
camera.layers.set(1);
const cameraPivot = new Object3D();
cameraPivot.add(camera)

/*-------------------------CAMERA POSITION FUNCTIONALITY---------------------*/
let lastKnownScrollPosition = 0;
let ticking = false;
let zoomIn = false;

//zoomIn - bool, pause_ms - callback function
async function adjustCammeraPosition(zoomIn, pause_ms) {

    // limits the Z position of the camera and the scrollY (as they are dependant on one another);
    if (camera.position.z > 800) {
        camera.position.z = 800;
        window.scrollTo(0, 7000);
    }

    //added a for loop for smooth zoomIn/zoomOut effect. The multiplier is positive or negative 1, depending on which direction we zoom.     
    let multiplyer = zoomIn ? 1 : -1 ;

    for (let i = 1; i <= 100; i++) {
        await pause_ms(5);
        camera.position.z += multiplyer * 0.1;
    }
}

window.addEventListener("scroll", () => {

    let scrollDelta = lastKnownScrollPosition - window.scrollY;

    if (lastKnownScrollPosition + scrollDelta > lastKnownScrollPosition) {

        zoomIn = false;
    }
    else {
        zoomIn = true;
    }

    /*
    Here I helped myself with 
    https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event and 
    https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY
    */
    if (!ticking) {
        window.requestAnimationFrame(() => {
            adjustCammeraPosition(zoomIn, pause_ms)
            ticking = false;
        });
        ticking = true;
    }

    // update scrollY after all the logic and calculations have been processed;
    lastKnownScrollPosition = window.scrollY;
});

export  {camera, cameraPivot};