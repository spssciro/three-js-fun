class QuickCamera {
  constructor(fov = 75, nearClip = 0.1, farClip = 1000) {
    this.c = new THREE.PerspectiveCamera(
      fov, // Field of View
      window.innerWidth / window.innerHeight, // aspect ratio
      nearClip, // near clipping plane
      farClip // far clipping plane
    );
  }
}

export { QuickCamera };
