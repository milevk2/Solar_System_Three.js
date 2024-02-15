import { WebGLRenderer, Vector2 } from "three";
import { EffectComposer } from "/node_modules/three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "/node_modules/three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "/node_modules/three/examples/jsm/postprocessing/UnrealBloomPass.js";
import scene from "../scene.js";
import camera from "../camera.js";


const canvas = document.getElementsByTagName("canvas")[0];

//default renderer
const renderer = new WebGLRenderer({
    canvas: canvas,
    antialias: true,
});
renderer.autoClear = false;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
renderer.setClearColor(0x000000, 0.0);


const sunRenderer = new WebGLRenderer({ canvas: canvas, });
sunRenderer.setSize(window.innerWidth, window.innerHeight);

// Create renderer for planets without glow effect
const planetRenderer = new WebGLRenderer({ canvas: canvas, });
planetRenderer.setSize(window.innerWidth, window.innerHeight);

const bloomComposer = new EffectComposer(sunRenderer);
  const bloomPass = new UnrealBloomPass(new Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
  bloomPass.threshold = 0;
  bloomPass.strength = 2;
  bloomPass.radius = 0;
  bloomComposer.addPass(new RenderPass(scene, camera));
  bloomComposer.addPass(bloomPass);


export  {bloomComposer, planetRenderer};