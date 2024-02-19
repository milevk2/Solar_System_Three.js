import { FrontSide, IcosahedronGeometry, MeshLambertMaterial } from "three";
import { OrbitingPlanet, PlanetWithSatellite, RingPlanet } from "../SpaceObjectBuilder.js";
import { attach_name_labels } from "./fonts.js";
import { rotationPivotConfig, rotationSelfConfig } from "../animation/rotationMultiplier.js";

//creating the planets with their respective parameters, passed to their respective class constructors
const mercury = new OrbitingPlanet('Mercury', IcosahedronGeometry, [4, 4], MeshLambertMaterial, 'mercury.png', FrontSide, false, [25, 0, 60], 1, 2.5 * rotationSelfConfig, 180 * rotationPivotConfig);
const venus = new OrbitingPlanet('Venus', IcosahedronGeometry, [5, 4], MeshLambertMaterial, 'venus.png', FrontSide, false, [75, 15, 75], 1, 2.5 * rotationSelfConfig, 160 * rotationPivotConfig);

//first creating the moon and then passing the object to the earth's PlanetWithSatellite constructor
const moon = new OrbitingPlanet('Moon', IcosahedronGeometry, [3, 4], MeshLambertMaterial, 'moon.png', FrontSide, false, [0, 0, 0], 1, 2.5 * rotationSelfConfig, 180 * rotationPivotConfig);
const earth = new PlanetWithSatellite('Earth', IcosahedronGeometry, [8, 4], MeshLambertMaterial, 'earth.png', FrontSide, false, [125, -15, 125], 1, 1 * rotationSelfConfig, 130 * rotationPivotConfig, moon);
const mars = new OrbitingPlanet('Mars', IcosahedronGeometry, [7, 4], MeshLambertMaterial, 'mars.png', FrontSide, false, [175, 10, 175], 1, 2.5 * rotationSelfConfig, 100 * rotationPivotConfig);
const jupiter = new OrbitingPlanet('Jupiter', IcosahedronGeometry, [11, 4], MeshLambertMaterial, 'jupiter.png', FrontSide, false, [225, 20, 225], 1, 2.5 * rotationSelfConfig, 80 * rotationPivotConfig);
const saturn = new RingPlanet('Saturn', IcosahedronGeometry, [10, 4], MeshLambertMaterial, 'saturn.png', FrontSide, false, [350, 20, 300], 1, 0 * rotationSelfConfig, 60 * rotationPivotConfig);
const uranus = new OrbitingPlanet('Uranus', IcosahedronGeometry, [6, 4], MeshLambertMaterial, 'uranus.png', FrontSide, false, [10, 40, 350], 1, 2.5 * rotationSelfConfig, 30 * rotationPivotConfig);
const neptune = new OrbitingPlanet('Neptune', IcosahedronGeometry, [7, 4], MeshLambertMaterial, 'neptune.png', FrontSide, false, [25, -10, 385], 1, 2.5 * rotationSelfConfig, 15 * rotationPivotConfig);
const pluto = new OrbitingPlanet('Pluto', IcosahedronGeometry, [5, 4], MeshLambertMaterial, 'pluto.png', FrontSide, false, [30, -5, 405], 1, 2.5 * rotationSelfConfig, 5 * rotationPivotConfig);

//Moon is bound to Earth:
// earth.mesh.add(moon.pivot);
// moon.pivot.position.set(0, 0, 0)
// moon.mesh.position.set(11, 0, 0)

/*
attaching the name labels to the planets only after the planets array has been constructed; 
The function returns a promise which fullfills only after all textMeshes have been created 
*/
const planets = [mercury, venus, earth, mars, jupiter, saturn, uranus, neptune, pluto];
let nameLabelsLoaded =  await attach_name_labels(planets); 


export { planets, moon, nameLabelsLoaded} //exporting the moon separately so I can animate it in the animationLoop