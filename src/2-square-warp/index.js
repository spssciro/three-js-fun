import { QuickCamera } from "../../lib/QuickCamera.js";

class SquareWarp {
  constructor() {
    let scene = new THREE.Scene();
    let qc = new QuickCamera();
    const size = 2;
    let inc = 1;
    const green = "#8CDD81";

    // audio stuff
    let audio = document.getElementById("audio");
    let audioCtx = new AudioContext();
    let audioSrc = audioCtx.createMediaElementSource(audio);
    let analyser = audioCtx.createAnalyser();
    audioSrc.connect(analyser);
    let frequencyData = new Uint8Array(analyser.frequencyBinCount);

    // render settings
    let renderer = new THREE.WebGLRenderer({
      antialias: true // smooth edges
    });
    scene.background = new THREE.Color(0xffffff);

    // renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.shadowMap.type = THREE.BasicShadowMap;

    // add lights
    let ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    let light = new THREE.PointLight(0xffffff, 1.2, 100);
    light.position.set(0, 10, 5);
    light.castShadow = true;
    // add some shadows
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 50;
    scene.add(light);

    // our geometry (cube and square)
    let squareGeo = new THREE.BoxGeometry(size, size, size, 2, 2, 2);
    let cubeGeo = squareGeo.clone();
    cubeGeo.vertices[4].x = 2;
    cubeGeo.vertices[13].x = -2;
    cubeGeo.vertices[19].y = 2;
    cubeGeo.vertices[22].y = -2;
    cubeGeo.vertices[25].z = -2;

    let material = new THREE.MeshLambertMaterial({
      color: `${green}`,
      wireframe: true,
      morphTargets: true
    });

    squareGeo.morphTargets.push({
      name: "target",
      vertices: cubeGeo.vertices
    });

    // append the morph target to the mesh
    let geometryBuffed = new THREE.BufferGeometry().fromGeometry(squareGeo);
    let cube = new THREE.Mesh(squareGeo, material);
    window.test = cube;

    // add cube to the scene
    scene.add(cube);

    // move camera back so we can see the cube
    qc.c.position.z = 10;

    let pulseOnMusic = amount => {
      cube.material.color.set(`rgb(${amount}%, ${255 - amount}%, 0%)`);
      cube.morphTargetInfluences[0] = amount / 255;
    };

    let render = function() {
      requestAnimationFrame(render);

      // analyze the music
      analyser.getByteFrequencyData(frequencyData);
      pulseOnMusic(frequencyData[0]);

      // float the cube
      inc += 0.0015;
      let sineAmt = Math.sin(inc * 40);

      // rotate cube a little each frame
      cube.rotation.x += 0.02;
      cube.rotation.z += 0.02;
      cube.rotation.y += 0.02;
      cube.position.y = sineAmt;

      renderer.render(scene, qc.c);
    };
    render();
  }
}

// new up three js
new SquareWarp();
