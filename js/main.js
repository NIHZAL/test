document.addEventListener('DOMContentLoaded', function () {
    const object3D = document.querySelector('.object3D');
    let scrollPos = 0;

    // Initialize the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    object3D.appendChild(renderer.domElement);

    // Add lighting to the scene
    const light = new THREE.AmbientLight(0x404040, 5);
    scene.add(light);

    // Load the 3D object using GLTFLoader
const loader = new THREE.GLTFLoader();
let humanModel;

loader.load('assets/HUMAN.gltf', function (gltf) {
    humanModel = gltf.scene;
    scene.add(humanModel);

    // Set the initial position and size of the 3D object
    humanModel.scale.set(0.2, 0.2, 0.2); // Set the size to 20% of the original
    humanModel.position.set(0, 0, 0); // Center the object in the scene

    // Position the camera to view the 3D object
    camera.position.z = 2;

    animate();
}, undefined, function (error) {
    console.error(error);
});


    // Function to handle the animation
    function animate() {
        requestAnimationFrame(animate);

        // Calculate rotation and position changes based on scroll direction
        const rotationSpeed = 0.02;
        const positionChange = 0.5;

        const scrollY = window.scrollY;
        const scrollDirection = scrollY > scrollPos ? 'down' : 'up';
        scrollPos = scrollY;

        if (scrollDirection === 'down') {
            humanModel.rotation.y += rotationSpeed;
            humanModel.position.y -= positionChange;
        } else {
            humanModel.rotation.y -= rotationSpeed;
            humanModel.position.y += positionChange;
        }

        renderer.render(scene, camera);
    }

    // Function to handle window resize and adjust camera and renderer
    function onWindowResize() {
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;
        renderer.setSize(newWidth, newHeight);
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
    }

    // Handle window resize
    window.addEventListener('resize', onWindowResize);
});
