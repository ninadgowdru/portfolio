import React, { useRef, useEffect } from 'react';
import luffyAvatarSrc from '../assets/ninad_avatar.png';

export default function ParticlePortrait({ onOpenSummary, onOpenCoding }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const sampleCanvas = document.createElement('canvas');
    sampleCanvas.width = 120;
    sampleCanvas.height = 120;
    const sampleCtx = sampleCanvas.getContext('2d', { willReadFrequently: true });
    if (!sampleCtx) return;

    const pointer = { x: -999, y: -999, active: false };
    let particles = [];
    let isDestroyed = false;
    let animId = 0;

    const img = new Image();
    img.crossOrigin = 'anonymous';

    const handlePointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 480;
      pointer.y = ((e.clientY - rect.top) / rect.height) * 480;
      pointer.active = true;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
      pointer.x = -999;
      pointer.y = -999;
    };

    img.onload = () => {
      try {
        sampleCtx.clearRect(0, 0, 120, 120);
        sampleCtx.drawImage(img, 0, 0, 120, 120);
        const imgData = sampleCtx.getImageData(0, 0, 120, 120);
        const data = imgData.data;

        const newParticles = [];
        for (let y = 0; y < 120; y += 1) {
          for (let x = 0; x < 120; x += 1) {
            const idx = 120 * y + x;
            const pIdx = 4 * idx;
            // Clean alpha check: only character pixels
            if (data[pIdx + 3] < 128) continue;

            const pr = data[pIdx];
            const pg = data[pIdx + 1];
            const pb = data[pIdx + 2];

            const homeX = (x + 0.5) * 4;
            const homeY = (y + 0.5) * 4;

            newParticles.push({
              homeX,
              homeY,
              x: homeX,
              y: homeY,
              vx: 0,
              vy: 0,
              size: 4.25,
              color: `rgb(${pr}, ${pg}, ${pb})`
            });
          }
        }

        particles = newParticles;
      } catch (err) {
        console.error('Error generating portrait particles:', err);
      }
    };

    img.onerror = () => {
      console.warn('Avatar image failed to load, retrying with fallback path');
      img.src = './ninad_avatar.png';
    };

    img.src = luffyAvatarSrc;

    // Animation render loop
    const render = () => {
      if (isDestroyed) return;

      ctx.fillStyle = '#0d0e0f';
      ctx.fillRect(0, 0, 480, 480);

      // Render & update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Smooth spring force returning to home
        p.vx += (p.homeX - p.x) * 0.08;
        p.vy += (p.homeY - p.y) * 0.08;

        // Pointer repulsion interaction
        if (pointer.active) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist > 0 && dist < 58) {
            const force = (1 - dist / 58) * 6.5;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        // Friction damping
        p.vx *= 0.82;
        p.vy *= 0.82;

        p.x += p.vx;
        p.y += p.vy;

        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      }

      animId = window.requestAnimationFrame(render);
    };

    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerenter', handlePointerMove);
    canvas.addEventListener('pointerleave', handlePointerLeave);

    render();

    return () => {
      isDestroyed = true;
      window.cancelAnimationFrame(animId);
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
