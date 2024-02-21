# Solar System Three.js 

**This is my first Three.js project. I still have a lot to learn, but I think I discovered my new passion. This project was prepared as a part of an interview process.**

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Animation Functions](#animation-functions)
- [Camera Functions](#camera-functions)
- [Listeners-and-DOM-manipulation](#listeners-and-dom-manipulation)
- [Space Object Builder and its Classes](#space-object-builder-and-its-classes)
- [MAIN-FUNCTIONALITY-AND-ANIMATION-LOOP](#main-functionality-and-animation-loop)
- [Raycaster](#raycaster)
- [Technologies Used](#technologies-used)
- [To be done (In Progress)](#to-be-done-in-progress)


**Key Features:**
0. Prompts the user to confirm whether they are on a desktop computer or on a touchscreen device and adds a listener either to the scene for desktop or to the window for
    touchscreens.
1. Pointlight object with unlimited reach and no light dimming with the passed distance.
2. 3d models of the Sun, Moon, Planets, Galaxy and 3d models of Font (text) meshes.
    - The planets spin arond themselves.
    - The planets rotate around their pivots (each planet has a pivot, which is the center of the scene XYZ - 0,0,0) where the pointlight and the Sun mesh stand.
    - Each planet is mapped to a certain documentY position.
    - The camera starts at Sun's position. On user input mouse "wheel" or touchscreen slide, the camera changes it's position to the first planet - Mercury. After a certain document position has been reached the camera changes position to the next or to the previous planet (depending on scroll direction).
    - If user hovers over a planet with their mouse, the planet emits blue light and a name label appears above it (the label appears only on freelook camera in the end).
    - A planet information text appears on the screen for each planet.

3. Camera
    - When certain documentY boundary has been reached, a camera control object is being initialized with  THREE OrbitControls and a short information about the camera controls pops up on the screen. User could see a button redirecting to "About" page there.
    - The camera has a function taking care of the rotation direction, so sometimes the spinning of a planet a camera has been attached to slows/ speeds down, which adds dynamic.
    - OrbitControls have a limitation of the Z direction, thus the camera can not leave the galaxy mesh (which is a giant sphere)

4. RayCaster
    - The raycaster omits Saturn's ring and namelabels of the planets.


**Namelabels only show after OrbitControls are deployed in the end. By default they stay on layer 2 and the applyVisualEffect(intersected) function changes them to layer 1 if intersection occur**

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Open the index.html with Live Server or other application.


## Project Structure

- **Solar System /**
  - `Index.html`
   - **assets/**
      - **css/**
        - `responsive.css`
        - `styles.css`

      - **js/**
        - **animation/**
            - `cssTextAnimate.js`
            - `rotation.js`
            - `rotationMultiplier.js`
            - `VisualEffects.js`
            - **camera/**
                - `camera.js`
                - `controls.js`
            - **event-listeners/**
                - `listeners.js`
            - **meshes/**
                - `fonts.js`
                - `galaxy.js`
                - `planets.js`
                - `sun.js`

            - **renderers/**
                - `renderer.js`
            - **utility/**
                - `pause_ms.js`

            - `main.js`
            - `rayCast.js`
            - `scene.js`
            - `SpaceObjectBuilder.js`


      - **music/**
        - `spacemusic.mp3`
      - **textures/**
        - `sun.png`
        - `mercury.png`
        - `venus.png`
        - `moon.png`
        - `earth.png`
        - `mars.png`
        - `jupiter.png`
        - `saturn.png`
        - `saturnRing.png`
        - `uranus.png`
        - `neptune.png`
        - `pluto.png`
        - `galaxy1.png`
    
   - **dist/**
        - `Bundle.js`



## Animation Functions

1. `cssTextAnimate.js`
    - **function animateText(planetId, previousPlanetId = null)** - receives two DOM ID's - of the current planet and of the previousPlanet. PreviousPlanet could be null due to the fact there is no planet before Mercury as it is the first planet.

2. `rotation.js`
    - **function rotateSelf(spaceObjectsArray, deltaTime)** - receives an array of objects and applies spaceObj.mesh.rotateY(self rotation speed * deltaTime)
    - **function rotatePivot(spaceObjectsArray, deltaTime)** - receives an array of objects and applies spaceObj.pivot.rotateY(spaceObj.rotation_pivot * deltaTime) to make planets spin around their pivot objects.

3. `rotationMultiplier.js` - a multiplier in case fast change of the rotation_self and rotation_pivot or all planets is needed.

4. `VisualEffects.js`
    1. **function applyVisualEffect(intersected)** 
        - receives the first intersected object of the rayCaster. function returns if the intersectes has isLabel or isRing bool flags as we do not apply any effects to name labels and to Saturn's ring. Then function checks if nameLabels should be shown  at this point of the site.
        If showNameLabels.show is true then we change the layer of the intersected namelabel to 1 (default is 2); 
        - The function apply emissive color 0x3D85C6 to the rayCaster's intersected object.

    2. **function resetVisualEffects(spaceObjectsArray)** 
        - changes the emissive of all passed objects to mesh.material.emissive.set(0x000000);
        - checks if the object has a nameMesh and if it does changes it to layer 2 (default layer for nameMesh);
    
    3. **function pointNameLabelToCamera(planets)**
        - function returns if showNameLabels.show == false;
        - if showNameLabels.show == true it applies planet.nameMesh.lookAt(camera.position) so the nameMeshes are pointing towards the camera to ensure readability.


## Camera Functions

1. `camera.js`
    - initialized variables in the outer scope of the function let previousCameraPivot = null;  let previousPlanetName = null

    - **setInterval(adjustRotationY, 10 * 1000)** - on every 10 seconds changes the direction of Y.
    - **function cameraAutoRotate(deltaTime)** -  called from animate function where the deltaTime is passed from. Rotates around Y axis;
    - **function updatePivot(newPivotPlanet)** 
        - updates currentPivot object and saves it as a previousPivot for the next function call  thus 
            newPivotPlanet = cameraPivot = previousCameraPivot;
        - if previousCameraPivot !== null then removes the camera and restores the original rotation speed from previousCameraPivot.savedRotation_self;
        - adds the camera as a child to the newPivotPlanet.mesh;
        - saves  cameraPivot.rotation_self to cameraPivot.savedRotation_self ;
        - sets the rotation speed of the current pivot to 0.1; 
        - updates previousPlanetName = cameraPivot.name.toLowerCase() (it will be passed as a param to animateText(planetId, previousPlanetId = null));
    - **function cameraMainFunction(deltaTime, documentDeltaY)** - This is the main camera function. It takes care of the documentY position to match with the planet
         text  and it's planet 3d model:
        - It checks the current documentPositionY. If the cameraPivot is the current planet in the expected documentY range it calls rotatePivotOnScroll(planet.mesh, documentDeltaY, deltaTime) and if it is not then updates the pivot withthe expected planet from the documentY range, sets camera.position.z (as some planets are larger and need to be observed from far place) and then calls   animateText('planetName', previousPlanetName) to show off the text;
        - if documentPosition Y > 13000 calls  onCameraInitialize() to prepare the scene for the camera OrbitControls functionality;
    - **function rotatePivotOnScroll(planet, documentDeltaY, deltaTime)** - rotates the camera round the currentPivot planet; 
        it is called from cameraMainFunction(deltaTime, documentDeltaY);
    - **function onCameraInitialize()**:
        - camera.position.z = 100;
        - calls  animateText('freeLook', previousPlanetName) to show the cameraControls information to the user;
        - removes pluto.mesh.remove(camera);
        -  showNameLabels.show = true;
        - calls initiateControls() from ./controls.js - it is just a function with preparation of OrbitControls options like max z range, autorotation etc.
        
## Listeners and DOM manipulation

1. `listeners.js` = they are self explanatory, just buttons deleting their parent elements or changing the classes of other elements. window "resize" listener could be
     found there.

## Space Object Builder and its Classes

   `SpaceObjectBuilder.js`
    Classes here are objects who contain information and parameters for each planet so we could customize them.
    Each spaceObject has a .mesh key which contains the reference to the actual three.js mesh.
    Some of the classes have rings or satellites who are actually a meshes attached as a children to this.mesh.

1. **Class SpaceObject creates**:
        this.name = name;
        this.mesh = new Mesh(new Geometry new Material) - geometry and material are passed as parameters
        this.mesh.position.set(...positionArr) - sets the position of the mesh
        this.mesh.layers.set(layer);
        this.rotation_self = rotation_self / 1000; //rotation around self;
        this.savedRotation_self = 0; //this will be needed for the cameraMainFunction, because we will be changing the rotation speed of the planets (as the camera will be attached to it)

2. **Class OrbitingPlanet extends SpaceObject**:
      //creating the pivot the space object will rotate around:
        this.pivot = new Object3D();
        this.pivot.layers.set(1);
        this.pivot.add(this.mesh);
        this.rotation_pivot = rotation_pivot / 1000; //rotation around the pivot
        this.name_label_id = null // this will be populated with UUID of the font mesh when the font mesh is created in attach_name_labels functionality.

3. **Class IcePlanet extends OrbitingPlanet**:
        //this is class for Neptune and Uranus
        this.mesh.material.roughness = 0;
        this.mesh.material.metalness = 0.4;

4. **Class RingPlanet extends OrbitingPlanet**:

        //we directly create the ring with constant values
        this.ringMesh = new Mesh( new RingGeometry(17, 27, 32, 1),new MeshLambertMaterial( map: textureLoader.load(textureRoot + 'saturnRing.png'),
            side: DoubleSide));
        this.ringMesh.isRing = true; - this will be needed for rayCaster and visualEffects logic as ring must be omited.
        this.ringMesh.layers.set(1); - to make sure ring is on the same layer;
        this.ringMesh.rotateX(20); - rotate the ring so it looks correct before we attach it to parent mesh;
        this.mesh.add(this.ringMesh); - add the ring as a child to this.mesh

5. **Class PlanetWithSatellite extends OrbitingPlanet**:
        satellite.pivot.position.set(0, 0, 0);
        satellite.mesh.position.set(20, 0, 0);
        satellite.mesh.castShadow = true; - this do not work.
        this.mesh.add(satellite.pivot);
        this.mesh.receiveShadow = true; - this too do not work, I have to learn more :D
           
## MAIN FUNCTIONALITY AND ANIMATION LOOP
   `main.js`

1. const isTouch = window.confirm(is this device touchScreen or desktop pc?) if desktop => scene.addEventListener wheel, else window.addEventListener scroll
2.  Initialize variables which will be used for storing the documentDeltaY and isWheeling bool;
    let isWheeLing = false;
    let documentDeltaY = 0;
3. **function isWheeling(e)** - gets documentDeltaY and passes it to the documentDeltaY variable in the outer scope; also changes isWheeLing = true;
4.  const clock = new Clock();
    let deltaTime; //self explanatory
5. **const animate = ()** - the game/scene loop; it returns if nameLabels are not loaded (yet);
6. if (pause.value == true) pauses the scene (on mouse click);
    7. if (isWheeLing == true) calls cameraMainFunction(deltaTime, documentDeltaY);
    8. if (cameraControls !== null) calls cameraControls.update(); // update controls only if orbitcontrols have been initialized
    9.  calls cameraAutoRotate(deltaTime);
    10. calls rotateSelf([galaxy, moon, sun, ...planets], deltaTime) to spin the passed objects around themselves;
    11. calls rotatePivot([moon, ...planets], deltaTime);to rotate the passed objects around their pivots;
    12. calls resetVisualEffects([moon, ...planets]); to reset the visual effects of the passed objects;
    13. calls  pointNameLabelToCamera([...planets]) to make sure the nameLabels are always fliped to camera for readability.
    14. sets documentDeltaY = 0;  -- zeroing out the deltaY, otherwise the cameraMainFunction will continue affecting the camera position;
    15. sets isWheeLing = false;  -- just like the above comment - I want to be sure there won't be any side effects;
16. calls rayCast() in order to intercept objects;
17. planetRenderer.render(scene, camera) - self explanatory; render is alwats last after all transformations;

## Raycaster
`rayCast.js`
Used the below links to teach myself on how to use the raycasting:
   https://www.youtube.com/watch?v=CbUhot3K-gc
   https://threejs.org/docs/#api/en/core/Raycaster
Most of the logic I copied from the site and adapted it for my purposes - function onPointerMove(e) 

0. function onPointerMove(e) 
1. document.querySelector('.webgl').addEventListener('pointermove', onPointerMove);
2. function rayCast():
    - const intersected = raycaster.intersectObjects(scene.children)[0]? raycaster.intersectObjects(scene.children)[0].object : false; 
    // making sure the first intersected entity has an object because we need it in applyVisualEffect, otherwise everything explodes
    - if (intersected == false) return;
    - if (intersected.uuid == moon.mesh.uuid) return; if intersected is moon - no visual effects - return
    - if (intersected.uuid == sun.mesh.uuid) return; if intersected is sun - no visual effects - return
    - if (intersected.uuid == galaxy.mesh.uuid) return; if intersected is galaxy - no visual effects - return
    - if (intersected.hasOwnProperty('isRing')) return; if intersected is saturn's ring - no visual effects - return
    - calls applyVisualEffect(intersected) after making sure the visual effects will be applied only to planets
    **Now writing this documentation it made me realize I have to put the nameMesh conditional check here but I'm too tired now...**

## Technologies Used

- CSS
- HTML
- JavaScrit
- Three.js
- Webpack bundler

## To be done (In Progress)

1. move the nameMesh conditional check in rayCaster logic;
2. improve visuals on small screens;
3. make moon drop a shadow on Earth;
4. debug / test more;