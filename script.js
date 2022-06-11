const canvas = document.querySelector("canvas.webgl")


/*Scene*/
const scene = new THREE.Scene()

/*Sizes*/
const sizes={
    width:window.innerWidth,
    height:window.innerHeight
}

/*Camera*/
const camera = new THREE.PerspectiveCamera(45,sizes.width/sizes.height,0.1,100)
camera.position.z = 5
scene.add(camera)

/*Renderer*/
const renderer = new THREE.WebGLRenderer({
    canvas
})
renderer.setSize(sizes.width,sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))

/*Resize*/
window.addEventListener("resize",()=>{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.ascpect = sizes.width/sizes.height
    // camera.updatePerspectiveRatio()
    
    renderer.setSize(sizes.width,sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
})



/*ElapsedTime*/
const clock = new THREE.Clock()


/*Blink*/
function blink(){
    /*Particles*/
    const particleCount = 600
    const positions = new Float32Array(particleCount * 3)

    for(let i=0; i<particleCount; i++){
        positions[i * 3 + 0] = (Math.random() - 0.5 ) * 10
        positions[i * 3 + 1] = 100 * .04 - Math.random() *10
        positions[i * 3 + 2] = (Math.random() - 0.5 )  * 10
    }

    const particlesGeometry = new THREE.BufferGeometry()
    particlesGeometry.setAttribute('position',new THREE.BufferAttribute(positions,3))

    const particlesMaterial = new THREE.PointsMaterial({
        color:"white",
        sizeAttenuation:true,
        size:0.01
    })

    const particles = new THREE.Points(particlesGeometry,particlesMaterial)
    scene.add(particles)
}

/*Reload Function*/
function relo(){
    location.reload()
}

/*TickFunction*/
const tick = () =>{
    
    const elapsedTime = clock.getElapsedTime()

    renderer.render(scene,camera)

    window.requestAnimationFrame(tick)
}

setInterval(blink,500)
setInterval(relo,20000)
tick()