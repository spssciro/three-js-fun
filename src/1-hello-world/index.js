import { QuickCamera } from "../lib/QuickCamera.js";

class HelloThreeJs {
  constructor() {
    let scene = new THREE.Scene();
    let qc = new QuickCamera();
    let renderer = new THREE.WebGLRenderer({
      alpha: true, // transparent background
      antialias: true // smooth edges
    });

    const maxAmt = 50;
    const childrenList = [];

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    for (let i = 0; i < maxAmt; i++) {
      let geometry = new THREE.BoxBufferGeometry(
        Math.random() * 5,
        Math.random() * 5,
        Math.random() * 5
      );

      let material = new THREE.MeshNormalMaterial();
      let cube = new THREE.Mesh(geometry, material);
      childrenList.push(cube);

      cube.neg = Math.random() > 0.5 ? 1 : -1;

      cube.translateX(Math.random() * 7 * cube.neg);
      cube.translateY(Math.random() * 7 * cube.neg);
      cube.translateZ(Math.random() * 30 * cube.neg);
      scene.add(cube);
    }

    qc.c.position.z = 10; // move camera back so we can see the cube
    let render = function() {
      requestAnimationFrame(render);
      renderer.render(scene, qc.c);
      // rotate cube a little each frame
      for (let i = 0; i < childrenList.length; i++) {
        childrenList[i].position.z += 0.2;
        childrenList[i].rotation.x += 0.02 * childrenList[i].neg;
        childrenList[i].rotation.z += 0.02 * childrenList[i].neg;
        childrenList[i].rotation.y += 0.02 * childrenList[i].neg;
      }
    };
    render();
  }
}

// new up three js
new HelloThreeJs();
