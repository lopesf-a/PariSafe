let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('scene').appendChild(renderer.domElement);

let geometry = new THREE.PlaneGeometry(2, 2);
let uniforms = {
    time: { type: "f", value: 1.0 },
};

let material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    fragmentShader: `
        uniform float time;
        void main()	{
            vec2 uv = gl_FragCoord.xy / vec2(800.,600.);
            gl_FragColor = mix(vec4(0.8, 0.9, 0.8, 1.0), vec4(1.0, 0.2, 0.5, 1.0), uv.y + 0.5*sin(time));
        }
    `,
    vertexShader: `
        void main()	{
            gl_Position = vec4( position, 1.0 );
        }
    `,
});

let mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
camera.position.z = 1;

function animate() {
    requestAnimationFrame(animate);
    uniforms.time.value += 0.05;
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    let width = window.innerWidth;
    let height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});


document.addEventListener('DOMContentLoaded', function() {
    var modal = document.getElementById('myModal');
    var btn = document.querySelector('.signaler-btn');
    var span = document.querySelector('.close-btn');
    var problemType = document.getElementById('problemType');
    var otherProblem = document.getElementById('otherProblem');
    var lineType = document.getElementById('lineType');
    var specificLine = document.getElementById('specificLine');
    var yesPhoto = document.getElementById('yesPhoto');
    var noPhoto = document.getElementById('noPhoto');
    var photoUpload = document.getElementById('photoUpload');

    btn.onclick = function() {
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }

    problemType.addEventListener('change', function() {
        if (this.value === 'autre') {
            otherProblem.style.display = "block";
        } else {
            otherProblem.style.display = "none";
        }

        // Handle other selections...
    });

    lineType.addEventListener('change', function() {
        var lines;
        switch (this.value) {
            case 'RER':
                lines = ['A', 'B', 'C', 'D', 'E'];
                break;
            case 'Transilien':
                lines = ['H', 'J', 'K', 'L', 'N', 'P', 'R', 'U'];
                break;
            case 'Metro':
                lines = ['1', '2', '3', '3b', '4', '5', '6', '7', '7b', '8', '9', '10', '11', '12', '13', '14', '15 - 2030', '16 - 2026', '17-2026', '18-2026'];
                break;
            case 'Tram':
                lines = ['1', '2', '3a', '3b', '4', '5', '6', '7', '8', '9', '10', '11e', '13e'];
                break;
            default:
                lines = [];
        }

        specificLine.innerHTML = '';
        for (let line of lines) {
            let option = document.createElement('option');
            option.value = line;
            option.textContent = line;
            specificLine.appendChild(option);
        }
    });

    yesPhoto.addEventListener('change', function() {
        if (this.checked) {
            photoUpload.style.display = 'block';
        }
    });

    noPhoto.addEventListener('change', function() {
        if (this.checked) {
            photoUpload.style.display = 'none';
        }
    });
});
