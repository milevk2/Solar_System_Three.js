import { camera } from "../camera.js";

function applyVisualEffect(intersected) {

    intersected.material.emissive.set(0x3D85C6);
    intersected[intersected['name_label_id']].lookAt(camera.position);
    intersected[intersected['name_label_id']].layers.set(1);
}

function resetVisualEffects(spaceObjectsArray) {

    for (let spaceObj of spaceObjectsArray) {

        spaceObj.mesh.material.emissive.set(0x000000);

        if (spaceObj.hasOwnProperty('nameMesh')){

            spaceObj.nameMesh.layers.set(2)
        }
    }
}

function lookAtCamera (planets) {

    for (let planet of planets) {

        planet.nameMesh.lookAt(camera.position);
    }
}

export {applyVisualEffect, resetVisualEffects, lookAtCamera}