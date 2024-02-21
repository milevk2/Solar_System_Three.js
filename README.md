# Solar System Three.js 


**This is my first Three.js project. I still have a lot to learn, but I think I discovered my new passion. This project was prepared as a part of an interview process.**

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [To be done (In Progress)](#to-be-done-in-progress)

**Key Features:**
0. Prompts the user to confirm whether they are on a desktop computer or on a touchscreen device.
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
                - `cssTextAnimate.css`
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
        it is called from cameraMainFunction(deltaTime, documentDeltaY)
           
        

           


## Technologies Used

- CSS
- HTML
- JavaScrit
- Three.js
- Webpack bundler