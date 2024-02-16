import { BackSide, MeshBasicMaterial, SphereGeometry } from "three";
import { SpaceObject } from "../SpaceObjectBuilder.js";
import { rotationSelfConfig } from "../animation/rotationMultiplier.js";


const galaxy = new SpaceObject(

    'Galaxy',
    SphereGeometry,
    [500, 15, 15],
    MeshBasicMaterial,
    'galaxy1.png',
    BackSide,
    true,
    [0, 0, 0],
    1,
    50)
    
export default galaxy;