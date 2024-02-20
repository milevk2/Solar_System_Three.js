import { camera } from "../camera/camera.js";
import { pause } from "../utility/pause_ms.js";
import planetRenderer from "../renderers/renderer.js";


const confirmBtn = document.querySelector('#confirm');
const aboutBtn = document.querySelector('#aboutBtn');
const aboutInfo = document.querySelector('#aboutInfo');
const aboutCloseBtn = document.querySelector('#aboutCloseBtn');
const canvas = document.querySelector('.webgl');

//pause logic on scene click:
canvas.addEventListener("mousedown", (e) => pause.value = true);
canvas.addEventListener("mouseup", (e) => pause.value = false);

//buttons listeners
confirmBtn.addEventListener("click", removeParentElement );
aboutCloseBtn.addEventListener("click", removeParentElement);
aboutBtn.addEventListener("click", (e)=> {

    aboutInfo.classList.add("animatedText");
    removeParentElement(e);
})

//window resize listener
window.addEventListener(
    "resize",
    () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        planetRenderer.setSize(window.innerWidth, window.innerHeight);
    },
);

function removeParentElement(e) {

    e.target.parentElement.remove();
}

export {canvas}