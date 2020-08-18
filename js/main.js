let scene, camera, renderer, controls, light, model;

function init() {

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdddddd);

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 5000);
    camera.position.set(0, 50, 25);
    controls = new THREE.OrbitControls(camera);

    light = new THREE.AmbientLight(0xffa95c);
    light.position.set(-50, 50, 50);
    scene.add(light);

    hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 4);
    scene.add(hemiLight);

    renderer = new THREE.WebGLRenderer();
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 2.3;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.antialias = true;
    document.body.appendChild(renderer.domElement);


    new THREE.GLTFLoader().load('assets/scene.gltf', result => {
        model1 = result.scene.children[0];
        console.log(result.scene)
        model1.position.set(0, 0, 0);
        model1.traverse(n => {
            if (n.isMesh) {
                n.castShadow = true;
                n.receiveShadow = true;
                if (n.material.map) n.material.map.anisotropy = 1;
            }
        });
        scene.add(model1);
        animate();
    });
}
function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
init();

document.getElementById('control-1').addEventListener('click', () => {
    gsap.to(camera.position, .5, {
        x: camera.position.x, y: camera.position.y, z: camera.position.z -25
    })
})

document.getElementById('control-2').addEventListener('click', () => {
    gsap.to(camera.position, .5, {
        x: 0, y: camera.position.y, z: camera.position.z + 25
    })
})