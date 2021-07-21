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

const circles = []

for (let i = 0; i < 3; i++) {
	for (let j = 0; j < 3; j++) {
		circles.push({
			fill: colors[Math.floor(Math.random() * colors.length)],
			x: (canvas.width / 4) * (j + 1),
			y: (canvas.height / 4) * (i + 1),
			scale: 0
		})
	}
}

const ringColor = colors[Math.floor(Math.random() * colors.length)]

const ring = {
	angle: -Math.PI / 2,
	scale: canvas.width / 4
}

const lineColor = colors[Math.floor(Math.random() * colors.length)]

const lineTop = {
	start: (canvas.width / 5) * 3,
	end: (canvas.width / 5) * 3
}

const lineBottom = {
	start: (canvas.width / 5) * 2,
	end: (canvas.width / 5) * 2
}

const lineLeft = {
	start: (canvas.height / 5) * 2,
	end: (canvas.height / 5) * 2
}

const lineRight = {
	start: (canvas.height / 5) * 3,
	end: (canvas.height / 5) * 3
}

const crossBarColor = colors[Math.floor(Math.random() * colors.length)]

const crossBarX = {
	start: 0,
	end: 0,
}

const crossBarY = {
	start: 0,
	end: 0,
}

const crossBarRotation = {
	angle: -Math.PI / 4
}

let scrollProgress = 0

const draw = () => {
	ctx.strokeStyle = ringColor
	ctx.lineWidth = 1
	ctx.beginPath()
	ctx.arc(canvas.width / 2, canvas.height / 2, ring.scale, -Math.PI / 2, ring.angle)
	ctx.stroke()


	ctx.translate(canvas.width / 2, canvas.height / 2)
	ctx.rotate(crossBarRotation.angle)

	ctx.strokeStyle = crossBarColor
	ctx.lineWidth = 2

	ctx.beginPath()
	ctx.moveTo(crossBarX.start, 0)
	ctx.lineTo(crossBarX.end, 0)
	ctx.closePath()
	ctx.stroke()

	ctx.beginPath()
	ctx.moveTo(0, crossBarY.start)
	ctx.lineTo(0, crossBarY.end)
	ctx.closePath()
	ctx.stroke()

	ctx.resetTransform()

	circles.forEach(circle => {
		ctx.fillStyle = circle.fill
		ctx.beginPath()
		ctx.arc(circle.x, circle.y, circle.scale, 0, Math.PI * 2)
		ctx.closePath()
		ctx.fill()
	})

	ctx.strokeStyle = lineColor
	ctx.lineWidth = 4

	ctx.beginPath()
	ctx.moveTo(lineTop.start, canvas.height / 9)
	ctx.lineTo(lineTop.end, canvas.height / 9)
	ctx.closePath()
	ctx.stroke()

	ctx.beginPath()
	ctx.moveTo(lineBottom.start, (canvas.height / 9) * 8)
	ctx.lineTo(lineBottom.end, (canvas.height / 9) * 8)
	ctx.closePath()
	ctx.stroke()

	ctx.beginPath()
	ctx.moveTo(canvas.width / 9, lineLeft.start)
	ctx.lineTo(canvas.width / 9, lineLeft.end)
	ctx.closePath()
	ctx.stroke()

	ctx.beginPath()
	ctx.moveTo((canvas.width / 9) * 8, lineRight.start)
	ctx.lineTo((canvas.width / 9) * 8, lineRight.end)
	ctx.closePath()
	ctx.stroke()
}

const update = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	draw()
	requestAnimationFrame(update)
	scene.setProgress(scrollProgress)
}

requestAnimationFrame(update)

let scene

scene = new Tempo.scene()

scene.to(circles, { scale: 32 }, { duration: 2.4, ease: 'easeOutSpring', stagger: 0.05, onComplete: () => { console.log('done') } })
scene.to(ring, { angle: Math.PI * 1.5 }, { duration: 1.6, ease: 'easeOutExpo' }, 0.4)
scene.to(lineTop, { end: (canvas.width / 5) * 2 }, { duration: 0.8, ease: 'easeOutExpo' }, 1.2)
scene.to(lineTop, { start: (canvas.width / 5) * 2 }, {duration: 0.8, ease: 'easeOutExpo' }, 1)
scene.to(lineBottom, { end: (canvas.width / 5) * 3 }, { duration: 0.8, ease: 'easeOutExpo' }, 1.2)
scene.to(lineBottom, { start: (canvas.width / 5) * 3 }, {duration: 0.8, ease: 'easeOutExpo' }, 1)
scene.to(lineLeft, { end: (canvas.height / 5) * 3 }, { duration: 0.8, ease: 'easeOutExpo' }, 1.2)
scene.to(lineLeft, { start: (canvas.height / 5) * 3 }, {duration: 0.8, ease: 'easeOutExpo' }, 1)
scene.to(lineRight, { end: (canvas.height / 5) * 2 }, { duration: 0.8, ease: 'easeOutExpo' }, 1.2)
scene.to(lineRight, { start: (canvas.height / 5) * 2 }, {duration: 0.8, ease: 'easeOutExpo' }, 1)
scene.to(crossBarRotation, { angle: Math.PI * 1.75 }, { duration: 1.6, ease: 'easeOutExpo' }, 1.2)
scene.to(crossBarX, { start: -96, end: 96 }, { duration: 1.6, ease: 'easeOutExpo' }, 1.2)
scene.to(crossBarY, { start: -96, end: 96 }, { duration: 1.6, ease: 'easeOutExpo' }, 1.2)

const content = document.querySelector('aside')

const contentHeight = content.offsetHeight - window.outerHeight

window.addEventListener('scroll', (event) => {
	const scrollDistance = event.target.scrollingElement.scrollTop
	scrollProgress = Math.min(Math.max(scrollDistance / contentHeight, 0), 1)
})