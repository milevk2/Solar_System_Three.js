import { IcosahedronGeometry, MeshBasicMaterial, FrontSide } from "three";
import {SpaceObject} from "../SpaceObjectBuilder.js";


const sun = new SpaceObject('Sun',IcosahedronGeometry, [10,5], MeshBasicMaterial, 'sun.png', FrontSide, true, [0,0,0], 1, 5)

export default sun;

