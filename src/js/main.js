import Tempo from './modules/Tempo.js'

const canvas = document.getElementById('canvas')
const pixelRatio = devicePixelRatio
canvas.width = canvas.clientWidth * pixelRatio
canvas.height = canvas.clientHeight * pixelRatio

const webgl = document.getElementById('webgl')
const glContext = webgl.getContext('webgl', {
	powerPreference: 'high-performance'
})

const ctx = canvas.getContext('2d')

const colors = ['#FFE7E5', '#FFBDAF', '#E65F5C', '#E8FFEE', '#36EFB1', '#32D789', '#E8F4FF', '#6EE4FF', '#41C0EC', '#72FFF9', '#67E6E0', '#387D7A']
ctx.strokeStyle = colors[Math.floor(Math.random() * colors.length)]

const space = 40
const size = 32

const heightSegments = Math.floor(canvas.height / space)
const widthSegments = Math.floor(canvas.width / space)

const pixels = []

ctx.fillStyle = colors[5]

for (let i = 0; i < heightSegments; i++) {
	for (let j = 0; j < widthSegments; j++) {
		pixels.push({
			x: (space * j),
			y: (space * i),
			size
		})
	}
}


let scrollProgress = 0

const draw = () => {
	pixels.forEach(pixel => {
		ctx.fillRect(pixel.x + (size - pixel.size / 2), pixel.y + (size - pixel.size / 2), pixel.size, pixel.size)
	})
}

const update = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	draw()
	requestAnimationFrame(update)
	composition.setProgress(scrollProgress)
}

requestAnimationFrame(update)

let composition = new Tempo.composition()

composition.from(pixels, { size: 0 }, { duration: 1.6, ease: 'easeOutSine', stagger: 0.001 })

const scrollMultiplier = 1
const content = document.querySelector('aside')
content.style.height = `${(scrollMultiplier * composition.duration) + window.innerHeight}px`
const scrollHeight = (scrollMultiplier * composition.duration)

window.addEventListener('scroll', (event) => {
	const scrollDistance = event.target.scrollingElement.scrollTop
	scrollProgress = Math.min(Math.max(scrollDistance / scrollHeight, 0), 1)
})