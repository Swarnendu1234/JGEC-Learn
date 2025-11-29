import { useEffect, useState } from 'react'

const ConfettiCanvas = ({ show, onComplete }) => {
    const [confetti, setConfetti] = useState([])
    const [animationId, setAnimationId] = useState(null)

    useEffect(() => {
        if (!show) return

        const canvas = document.getElementById('confettiCanvas')
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const confettiPieces = []
        const confettiCount = 150
        const colors = ['#4C57FF', '#00D4FF', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']

        // Create confetti pieces
        for (let i = 0; i < confettiCount; i++) {
            confettiPieces.push({
                x: Math.random() * canvas.width,
                y: -20 - Math.random() * 100,
                width: Math.random() * 10 + 5,
                height: Math.random() * 15 + 5,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * 360,
                rotationSpeed: Math.random() * 10 - 5,
                velocity: Math.random() * 3 + 2,
                sway: Math.random() * 2 - 1
            })
        }

        let animId

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            let activePieces = 0

            confettiPieces.forEach(piece => {
                if (piece.y < canvas.height) {
                    activePieces++

                    ctx.save()
                    ctx.translate(piece.x, piece.y)
                    ctx.rotate((piece.rotation * Math.PI) / 180)
                    ctx.fillStyle = piece.color
                    ctx.fillRect(-piece.width / 2, -piece.height / 2, piece.width, piece.height)
                    ctx.restore()

                    piece.y += piece.velocity
                    piece.x += piece.sway
                    piece.rotation += piece.rotationSpeed
                    piece.velocity += 0.1
                }
            })

            if (activePieces > 0) {
                animId = requestAnimationFrame(animate)
                setAnimationId(animId)
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                if (onComplete) onComplete()
            }
        }

        animate()

        // Clean up after 5 seconds
        const timeout = setTimeout(() => {
            if (animId) {
                cancelAnimationFrame(animId)
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                if (onComplete) onComplete()
            }
        }, 5000)

        return () => {
            clearTimeout(timeout)
            if (animId) {
                cancelAnimationFrame(animId)
            }
        }
    }, [show, onComplete])

    return <canvas id="confettiCanvas"></canvas>
}

export default ConfettiCanvas
