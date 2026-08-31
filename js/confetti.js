/* ============================================================
   confetti.js
   Celebration effect using HTML5 Canvas
   ============================================================ */

function triggerConfetti() {
    // Create canvas overlay
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width = window.innerWidth;
    const height = canvas.height = window.innerHeight;
    
    const particles = [];
    const colors = ['#F26522', '#FFB830', '#7C5CFC', '#EA580C', '#34C759', '#FF3B30', '#5AC8FA', '#FF9500'];
    
    for (let i = 0; i < 120; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height - height,
            size: Math.random() * 6 + 2,
            speedY: Math.random() * 4 + 2,
            speedX: (Math.random() - 0.5) * 3,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 10,
            color: colors[Math.floor(Math.random() * colors.length)],
            life: 1
        });
    }
    
    let animationId = null;
    let startTime = Date.now();
    const duration = 3000;
    
    function animate() {
        const elapsed = Date.now() - startTime;
        if (elapsed > duration) {
            ctx.clearRect(0, 0, width, height);
            canvas.remove();
            if (animationId) cancelAnimationFrame(animationId);
            return;
        }
        
        ctx.clearRect(0, 0, width, height);
        
        let allDead = true;
        particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            p.rotation += p.rotationSpeed;
            p.life = 1 - (elapsed / duration);
            
            if (p.y < height + 20) allDead = false;
            
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.globalAlpha = p.life * 0.9;
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
            ctx.restore();
        });
        
        if (allDead && elapsed > 1000) {
            ctx.clearRect(0, 0, width, height);
            canvas.remove();
            if (animationId) cancelAnimationFrame(animationId);
            return;
        }
        
        animationId = requestAnimationFrame(animate);
    }
    
    animate();
    
    // Clean up after 5 seconds max
    setTimeout(() => {
        if (canvas.parentNode) {
            ctx.clearRect(0, 0, width, height);
            canvas.remove();
            if (animationId) cancelAnimationFrame(animationId);
        }
    }, 5000);
}