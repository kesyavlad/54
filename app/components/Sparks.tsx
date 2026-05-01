'use client';
import { useEffect, useRef } from 'react';

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
}

export default function Sparks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let raf: number;
    const sparks: Spark[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = Math.round(window.innerHeight * 0.4);
    };
    resize();
    window.addEventListener('resize', resize);

    const spawn = () => {
      if (sparks.length >= 60) return;
      sparks.push({
        x: Math.random() * canvas.width,
        y: canvas.height * (0.6 + Math.random() * 0.4),
        vx: (Math.random() - 0.5) * 0.65,
        vy: -(Math.random() * 0.93 + 0.27),
        life: 0,
        maxLife: 150 + Math.random() * 180,
        size: 0.7 + Math.random() * 2.0,
        hue: 15 + Math.random() * 45,
      });
    };

    const frame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (Math.random() < 0.22) spawn();

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.life++;
        s.x += s.vx + Math.sin(s.life * 0.06) * 0.27;
        s.y += s.vy;
        s.vy -= 0.0033;

        if (s.life >= s.maxLife || s.y < -10) {
          sparks.splice(i, 1);
          continue;
        }

        const t = s.life / s.maxLife;
        const alpha = Math.sin(t * Math.PI) * 0.75;

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = `hsl(${s.hue}, 100%, 62%)`;
        ctx.shadowBlur = s.size * 5;
        ctx.shadowColor = `hsl(${s.hue}, 100%, 70%)`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      raf = requestAnimationFrame(frame);
    };

    frame();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '40%',
        pointerEvents: 'none',
        zIndex: 9998,
      }}
    />
  );
}
