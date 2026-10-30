import React, { useRef, useEffect } from 'react';

export default function ParticlePortrait({ onOpenSummary, onOpenCoding }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let isDestroyed = false;

    const width = 480;
    const height = 480;
    canvas.width = width;
    canvas.height = height;

    const pointer = { x: -999, y: -999, active: false };
    let particles = [];
    let frameCount = 0;

    // Build procedural hacker avatar silhouette if image takes time or as base
    const initParticlesFromImage = (img) => {
      const offscreen = document.createElement('canvas');
      const sampleSize = 100;
      offscreen.width = sampleSize;
      offscreen.height = sampleSize;
      const offCtx = offscreen.getContext('2d');
      if (!offCtx) return;

      offCtx.drawImage(img, 0, 0, sampleSize, sampleSize);
      let imgData;
      try {
        imgData = offCtx.getImageData(0, 0, sampleSize, sampleSize).data;
      } catch (e) {
        initProceduralParticles();
        return;
      }

      const newParticles = [];
      const scaleX = width / sampleSize;
      const scaleY = height / sampleSize;

      for (let y = 0; y < sampleSize; y += 2) {
        for (let x = 0; x < sampleSize; x += 2) {
          const idx = (y * sampleSize + x) * 4;
          const r = imgData[idx];
          const g = imgData[idx + 1];
          const b = imgData[idx + 2];
          const a = imgData[idx + 3];

          // Compute luminance
          const lum = 0.299 * r + 0.587 * g + 0.114 * b;

          // Select particles that form character contours and highlights
          if (a > 120 && lum > 40) {
            const homeX = x * scaleX + (Math.random() - 0.5) * 2;
            const homeY = y * scaleY + (Math.random() - 0.5) * 2;

            let color = 'rgba(168, 182, 111, 0.85)'; // term green
            if (lum > 180) {
              color = 'rgba(225, 207, 178, 0.95)'; // term cream
            } else if (lum > 110) {
              color = 'rgba(212, 161, 95, 0.85)'; // term amber
            } else if (lum > 70) {
              color = 'rgba(131, 185, 139, 0.75)'; // term mint
            } else {
              color = 'rgba(86, 81, 75, 0.6)'; // term dim
            }

            newParticles.push({
              homeX,
              homeY,
              x: homeX + (Math.random() - 0.5) * 120,
              y: homeY + (Math.random() - 0.5) * 120,
              vx: 0,
              vy: 0,
              size: Math.random() > 0.8 ? 2.5 : 1.8,
              color,
              delay: Math.floor(Math.random() * 30)
            });
          }
        }
      }

      if (newParticles.length > 200) {
        particles = newParticles;
      } else {
        initProceduralParticles();
      }
    };

    const initProceduralParticles = () => {
      const newParticles = [];
      const centerX = width / 2;
      const centerY = height / 2;

      for (let i = 0; i < 900; i++) {
        // Generate security shield / hacker node mesh
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.pow(Math.random(), 0.6) * 190;
        const homeX = centerX + Math.cos(angle) * radius;
        const homeY = centerY + Math.sin(angle) * radius;

        let color = 'rgba(168, 182, 111, 0.8)';
        if (i % 5 === 0) color = 'rgba(225, 207, 178, 0.9)';
        if (i % 7 === 0) color = 'rgba(212, 161, 95, 0.8)';

        newParticles.push({
          homeX,
          homeY,
          x: homeX + (Math.random() - 0.5) * 140,
          y: homeY + (Math.random() - 0.5) * 140,
          vx: 0,
          vy: 0,
          size: Math.random() * 2 + 1.2,
          color,
          delay: Math.floor(Math.random() * 25)
        });
      }
      particles = newParticles;
    };

    // Attempt to load photo
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = '/ninad_avatar.jpg';
    img.onload = () => {
      if (!isDestroyed) {
        initParticlesFromImage(img);
      }
    };
    img.onerror = () => {
      if (!isDestroyed) {
        initProceduralParticles();
      }
    };

    // Pointer listeners
    const handlePointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * width;
      pointer.y = ((e.clientY - rect.top) / rect.height) * height;
      pointer.active = true;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
      pointer.x = -999;
      pointer.y = -999;
    };

    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerenter', handlePointerMove);
    canvas.addEventListener('pointerleave', handlePointerLeave);

    // Animation render loop
    const render = () => {
      if (isDestroyed) return;
      frameCount++;

      ctx.fillStyle = '#0d0e0f';
      ctx.fillRect(0, 0, width, height);

      // Subtle background grid
      ctx.strokeStyle = 'rgba(37, 39, 41, 0.35)';
      ctx.lineWidth = 0.5;
      for (let x = 0; x < width; x += 32) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 32) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Render & update particles
      const isWarmup = frameCount < 60;
      const springRate = isWarmup ? 0.05 : 0.018;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (frameCount < p.delay) continue;

        // Spring force towards home
        p.vx += (p.homeX - p.x) * springRate;
        p.vy += (p.homeY - p.y) * springRate;

        // Mouse avoidance physics
        if (pointer.active) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist > 0 && dist < 65) {
            const force = (1 - dist / 65) * 8.5;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        // Friction damping
        p.vx *= isWarmup ? 0.76 : 0.85;
        p.vy *= isWarmup ? 0.76 : 0.85;

        p.x += p.vx;
        p.y += p.vy;

        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      }

      // Subtle scanline effect
      ctx.fillStyle = 'rgba(255, 255, 255, 0.015)';
      ctx.fillRect(0, (frameCount * 2) % height, width, 2);

      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      isDestroyed = true;
      window.cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerenter', handlePointerMove);
      canvas.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  return (
    <div className="profile-console__visual">
      <div className="terminal-portrait">
        <canvas
          ref={canvasRef}
          className="particle-portrait"
          width="480"
          height="480"
          aria-label="Interactive particle portrait of Ninad S P"
          role="img"
        />
      </div>
      <div className="profile-console__controls">
        <button
          type="button"
          title="Recruiter summary"
          onClick={onOpenSummary}
        >
          tl;dr
        </button>
        <button
          type="button"
          title="Current AppSec focus & status"
          onClick={onOpenCoding}
        >
          coding
        </button>
      </div>
    </div>
  );
}
