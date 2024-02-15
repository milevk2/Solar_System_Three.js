import { FrontSide, IcosahedronGeometry, MeshLambertMaterial } from "three";
import { OrbitingPlanet, RingPlanet } from "../SpaceObjectBuilder.js";
import { attach_name_labels } from "./fonts.js";




const mercury = new OrbitingPlanet('Mercury', IcosahedronGeometry, [3, 4], MeshLambertMaterial, 'mercury.png', FrontSide, false, [10, 0, 25], 1, 2.5, 1.5);
const venus = new OrbitingPlanet('Venus', IcosahedronGeometry, [4, 4], MeshLambertMaterial, 'venus.png', FrontSide, false, [4, 15, 40], 1, 2.5, 1);
const earth = new OrbitingPlanet('Earth', IcosahedronGeometry, [7, 4], MeshLambertMaterial, 'earth.png', FrontSide, false, [15, -15, 75], 1, 2.5, 0.6);
const moon = new OrbitingPlanet('Moon', IcosahedronGeometry, [2, 4], MeshLambertMaterial, 'moon.png', FrontSide, false, [0, 0, 0], 1, 2.5, 10);
const mars = new OrbitingPlanet('Mars', IcosahedronGeometry, [6, 4], MeshLambertMaterial, 'mars.png', FrontSide, false, [5, 10, 125], 1, 2.5, 0.2);
const jupiter = new OrbitingPlanet('Jupiter', IcosahedronGeometry, [10, 4], MeshLambertMaterial, 'jupiter.png', FrontSide, false, [-40, 20, 250], 1, 2.5, 0);
const saturn = new RingPlanet('Saturn', IcosahedronGeometry, [9, 4], MeshLambertMaterial, 'saturn.png', FrontSide, false, [45, 20, 320], 1, 2.5, -2);
const uranus = new OrbitingPlanet('Uranus', IcosahedronGeometry, [5, 4], MeshLambertMaterial, 'uranus.png', FrontSide, false, [45, 40, 390], 1, 2.5, -3);
const neptune = new OrbitingPlanet('Neptune', IcosahedronGeometry, [6, 4], MeshLambertMaterial, 'neptune.png', FrontSide, false, [25, -10, 420], 1, 2.5, -3.5);
const pluto = new OrbitingPlanet('Pluto', IcosahedronGeometry, [2, 4], MeshLambertMaterial, 'pluto.png', FrontSide, false, [30, -5, 450], 1, 2.5, -4);

//Moon is bound to Earth:
earth.mesh.add(moon.pivot);
moon.pivot.position.set(0, 0, 0)
moon.mesh.position.set(11, 0, 0)

const planets = [mercury, venus, earth, mars, jupiter, saturn, uranus, neptune, pluto];

attach_name_labels(planets); // attaching the name labels to the planets only after the planets array has been constructed;


export { planets, moon } //exporting the moon separately so I can animate it in the animationLoop