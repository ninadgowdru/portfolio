import React, { useRef, useEffect } from 'react';

// Pseudo-random deterministic shader-style noise
function pseudoRandom(e) {
  const t = 43758.5453 * Math.sin(12.9898 * e);
  return t - Math.floor(t);
}

export default function ParticlePortrait({ onOpenSummary, onOpenCoding }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const sampleCanvas = document.createElement('canvas');
    sampleCanvas.width = 120;
    sampleCanvas.height = 120;
    const sampleCtx = sampleCanvas.getContext('2d', { willReadFrequently: true });
    if (!sampleCtx) return;

    const pointer = { x: 240, y: 240, active: false };
    let particles = [];
    let frameCount = 0;
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
    };

    const initProceduralParticles = () => {
      const newParticles = [];
      const centerX = 240;
      const centerY = 240;

      for (let i = 0; i < 900; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.pow(Math.random(), 0.6) * 190;
        const homeX = centerX + Math.cos(angle) * radius;
        const homeY = centerY + Math.sin(angle) * radius;

        let color = 'rgb(243, 198, 77)'; // Straw hat yellow
        if (i % 4 === 0) color = 'rgb(218, 59, 43)'; // Luffy coat red
        if (i % 6 === 0) color = 'rgb(30, 41, 59)'; // Luffy hair black
        if (i % 8 === 0) color = 'rgb(245, 215, 178)'; // Skin tone

        newParticles.push({
          homeX,
          homeY,
          x: homeX + (Math.random() - 0.5) * 120,
          y: homeY + (Math.random() - 0.5) * 120,
          vx: 0,
          vy: 0,
          size: 4.35,
          color,
          delay: Math.floor(Math.random() * 25)
        });
      }
      particles = newParticles;
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

            const u = idx + 1;
            const homeX = (x + 0.5) * 4;
            const homeY = (y + 0.5) * 4;
            const distOffset = prefersReducedMotion ? 90 + 120 * pseudoRandom(u) : 250 + 420 * pseudoRandom(u);
            const spread = (pseudoRandom(2.37 * u) - 0.5) * (prefersReducedMotion ? 22 : 54);
            const startX = homeX - 0.8775825618903728 * distOffset + spread;
            const startY = homeY - -0.479425538604203 * distOffset + 0.35 * spread;
            const normDist = (homeX + (480 - homeY) * 0.42) / 681.6;
            const delay = prefersReducedMotion
              ? Math.floor(6 * pseudoRandom(5.1 * u))
              : Math.floor(34 * normDist + 11 * pseudoRandom(5.1 * u));

            newParticles.push({
              homeX,
              homeY,
              x: startX,
              y: startY,
              vx: 0.8775825618903728 * (prefersReducedMotion ? 4 : 7 + 4 * pseudoRandom(3.11 * u)),
              vy: -0.479425538604203 * (prefersReducedMotion ? 4 : 7 + 4 * pseudoRandom(4.73 * u)),
              size: 4.35,
              color: `rgb(${pr}, ${pg}, ${pb})`,
              delay
            });
          }
        }

        if (newParticles.length > 100) {
          particles = newParticles;
        } else {
          initProceduralParticles();
        }
      } catch (err) {
        initProceduralParticles();
      }
    };

    img.onerror = () => {
      initProceduralParticles();
    };

    img.src = '/ninad_avatar.png';

    // Animation render loop
    const render = () => {
      if (isDestroyed) return;
      frameCount += 1;

      ctx.fillStyle = '#0d0e0f';
      ctx.fillRect(0, 0, 480, 480);

      // Intro laser beam sweep effect
      const beamFrames = prefersReducedMotion ? 28 : 48;
      if (frameCount <= beamFrames) {
        const progress = Math.min(frameCount / (prefersReducedMotion ? 22 : 38), 1);
        const sinProg = Math.sin(Math.min(1, frameCount / beamFrames) * Math.PI);
        const lx = -90 + 720 * progress;
        const ly = 440 - 360 * progress;
        const sx = lx - 175;
        const sy = ly + 88;

        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        ctx.lineCap = 'round';
        ctx.shadowBlur = 22;
        ctx.shadowColor = 'rgba(180, 214, 157, .55)';
        ctx.strokeStyle = `rgba(166, 198, 143, ${0.28 * sinProg})`;
        ctx.lineWidth = 18 - 10 * progress;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(lx, ly);
        ctx.stroke();

        ctx.shadowBlur = 8;
        ctx.strokeStyle = `rgba(244, 239, 217, ${0.92 * sinProg})`;
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(sx - 18, sy + 9);
        ctx.lineTo(lx, ly);
        ctx.stroke();

        for (let s = 0; s < 7; s += 1) {
          const offset = 150 * pseudoRandom(31 * s + 7);
          const px = lx - offset;
          const py = ly + 0.5 * offset + (pseudoRandom(17 * s) - 0.5) * 60;
          ctx.fillStyle = `rgba(216, 204, 172, ${0.42 * sinProg})`;
          ctx.fillRect(px, py, 10 + 18 * pseudoRandom(9 * s), 1.4);
        }
        ctx.restore();
      }

      // Particle physics & rendering
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (frameCount < p.delay) continue;

        const isWarming = frameCount < 90;
        const springRate = isWarming ? 0.05 : 0.014;
        p.vx += (p.homeX - p.x) * springRate;
        p.vy += (p.homeY - p.y) * springRate;

        if (pointer.active) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist > 0 && dist < 54) {
            const force = (1 - dist / 54) * 7;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        p.vx *= isWarming ? 0.78 : 0.86;
        p.vy *= isWarming ? 0.78 : 0.86;
        p.x += p.vx;
        p.y += p.vy;

        const alphaProg = Math.min(1, (frameCount - p.delay + 1) / (prefersReducedMotion ? 6 : 10));
        const size = p.size * alphaProg;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, size, size);
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
