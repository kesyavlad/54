'use client';

import { useEffect, useRef, useState } from 'react';

const GROUND_H  = 28;   // height of ground strip
const CANVAS_H  = 220;
const ZOMBIE_SPEED = 0.45;
const SHELL_SPEED  = 7;

interface Shell {
  x: number; y: number;
  vx: number; vy: number;
  trail: { x: number; y: number }[];
}

interface Zombie {
  x: number; y: number;
  w: number; h: number;
  frame: number; tick: number;
  hit: number;
}

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  life: number; r: number; color: string;
}

export default function MiniGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef  = useRef({
    shells:    [] as Shell[],
    zombies:   [] as Zombie[],
    particles: [] as Particle[],
    score:     0,
    mouseX:    400,
    mouseY:    100,
    lastSpawn: 0,
    cooldown:  0,
    img:       null as HTMLImageElement | null,
    running:   false,
    gameOver:  false,
    frameId:   0,
    lastTime:  0,
  });

  const [score,  setScore]  = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [hp, setHp] = useState(5);

  // load bogdana image
  useEffect(() => {
    const img = new Image();
    img.src = '/bogdana.png';
    img.onload = () => { stateRef.current.img = img; };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    function resizeCanvas() {
      canvas!.width  = canvas!.offsetWidth;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // ── helpers ──────────────────────────────────────────────────
    const W = () => canvas!.width;
    const groundY = CANVAS_H - GROUND_H;
    const artX = 20;
    const artW = 180;
    const artH = 90;
    const artY = groundY - artH + 14;
    // barrel pivot (where the gun rotates from)
    const pivotX = artX + 110;
    const pivotY = artY + 28;

    function spawnZombie() {
      const h = 64 + Math.random() * 16;
      const w = h * 0.45;
      stateRef.current.zombies.push({
        x: W() + w,
        y: groundY - h,
        w, h,
        frame: 0,
        tick: 0,
        hit: 0,
      });
    }

    function spawnParticles(x: number, y: number, color: string) {
      for (let i = 0; i < 14; i++) {
        const a = Math.random() * Math.PI * 2;
        const s = 1.5 + Math.random() * 4;
        stateRef.current.particles.push({
          x, y,
          vx: Math.cos(a) * s,
          vy: Math.sin(a) * s,
          life: 1,
          r: 2 + Math.random() * 4,
          color,
        });
      }
    }

    function fireShell() {
      const s = stateRef.current;
      if (s.cooldown > 0 || s.gameOver) return;
      const dx = s.mouseX - pivotX;
      const dy = s.mouseY - pivotY;
      const len = Math.hypot(dx, dy) || 1;
      s.shells.push({
        x: pivotX + (dx / len) * 55,
        y: pivotY + (dy / len) * 55,
        vx: (dx / len) * SHELL_SPEED,
        vy: (dy / len) * SHELL_SPEED,
        trail: [],
      });
      spawnParticles(pivotX + (dx / len) * 55, pivotY + (dy / len) * 55, '#c8a84b');
      s.cooldown = 600;
    }

    // ── update ───────────────────────────────────────────────────
    function update(dt: number, now: number) {
      const s = stateRef.current;
      s.cooldown = Math.max(0, s.cooldown - dt);

      // spawn zombies
      const interval = Math.max(1200, 2800 - s.score * 40);
      if (now - s.lastSpawn > interval) {
        spawnZombie();
        s.lastSpawn = now;
      }

      // shells
      s.shells.forEach(sh => {
        sh.trail.push({ x: sh.x, y: sh.y });
        if (sh.trail.length > 10) sh.trail.shift();
        sh.x += sh.vx;
        sh.y += sh.vy;
        sh.vy += 0.06; // slight gravity arc
      });
      s.shells = s.shells.filter(sh =>
        sh.x > -20 && sh.x < W() + 20 && sh.y < CANVAS_H + 20
      );

      // zombies
      s.zombies.forEach(z => {
        z.x -= ZOMBIE_SPEED + s.score * 0.005;
        z.tick += dt;
        if (z.tick > 180) { z.frame = (z.frame + 1) % 4; z.tick = 0; }
        if (z.hit > 0) z.hit -= dt;
      });

      // collisions
      for (let i = s.shells.length - 1; i >= 0; i--) {
        for (let j = s.zombies.length - 1; j >= 0; j--) {
          const sh = s.shells[i];
          const z  = s.zombies[j];
          if (
            sh.x > z.x && sh.x < z.x + z.w &&
            sh.y > z.y && sh.y < z.y + z.h
          ) {
            spawnParticles(z.x + z.w / 2, z.y + z.h / 2, '#c0392b');
            s.shells.splice(i, 1);
            s.zombies.splice(j, 1);
            s.score++;
            setScore(s.score);
            break;
          }
        }
      }

      // zombie reaches artillery
      let hpLost = false;
      s.zombies = s.zombies.filter(z => {
        if (z.x + z.w < artX + 30) {
          spawnParticles(z.x + z.w / 2, z.y + z.h / 2, '#ff4444');
          hpLost = true;
          return false;
        }
        return true;
      });
      if (hpLost) {
        setHp(prev => {
          const next = prev - 1;
          if (next <= 0) {
            s.running = false;
            setGameOver(true);
          }
          return next;
        });
      }

      // particles
      s.particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        p.vx *= 0.92; p.vy *= 0.92;
        p.life -= 0.035;
      });
      s.particles = s.particles.filter(p => p.life > 0);
    }

    // ── draw helpers ─────────────────────────────────────────────
    function drawZombie(ctx: CanvasRenderingContext2D, z: Zombie) {
      const { x, y, w, h, frame, hit } = z;
      const cx = x + w / 2;
      const hit01 = hit > 0;

      // leg swing
      const legSwing = Math.sin(frame * Math.PI / 2) * 0.28;

      ctx.save();
      ctx.translate(cx, y + h);

      // legs
      const legColor = hit01 ? '#cc2222' : '#2d5a2d';
      ctx.strokeStyle = legColor;
      ctx.lineWidth   = w * 0.22;
      ctx.lineCap     = 'round';
      ctx.beginPath();
      ctx.moveTo(-w * 0.18, 0);
      ctx.lineTo(-w * 0.18 + Math.sin(legSwing) * w * 0.35, h * 0.3);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(w * 0.18, 0);
      ctx.lineTo(w * 0.18 - Math.sin(legSwing) * w * 0.35, h * 0.3);
      ctx.stroke();

      // body
      ctx.fillStyle   = hit01 ? '#aa2222' : '#2d6b2d';
      ctx.strokeStyle = hit01 ? '#ff6666' : '#3d8b3d';
      ctx.lineWidth   = 1.2;
      ctx.beginPath();
      ctx.roundRect(-w * 0.4, -h * 0.72, w * 0.8, h * 0.5, 3);
      ctx.fill(); ctx.stroke();

      // outstretched arm (left, towards artillery)
      ctx.strokeStyle = hit01 ? '#aa2222' : '#2d6b2d';
      ctx.lineWidth   = w * 0.18;
      ctx.beginPath();
      ctx.moveTo(-w * 0.4, -h * 0.55);
      ctx.lineTo(-w * 0.85, -h * 0.45);
      ctx.stroke();
      // right arm down
      ctx.beginPath();
      ctx.moveTo(w * 0.4, -h * 0.55);
      ctx.lineTo(w * 0.6, -h * 0.3);
      ctx.stroke();

      // head
      const headR = w * 0.38;
      ctx.fillStyle   = hit01 ? '#cc3333' : '#d4a87a';
      ctx.strokeStyle = hit01 ? '#ff9999' : '#b8966a';
      ctx.lineWidth   = 1;
      ctx.beginPath();
      ctx.arc(0, -h * 0.72 - headR * 0.8, headR, 0, Math.PI * 2);
      ctx.fill(); ctx.stroke();

      // red eyes
      ctx.fillStyle = '#cc0000';
      ctx.beginPath();
      ctx.arc(-headR * 0.35, -h * 0.72 - headR * 0.85, headR * 0.15, 0, Math.PI * 2);
      ctx.arc( headR * 0.35, -h * 0.72 - headR * 0.85, headR * 0.15, 0, Math.PI * 2);
      ctx.fill();

      // Z badge
      ctx.fillStyle = '#c8a84b';
      ctx.font      = `bold ${Math.round(w * 0.52)}px monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Z', w * 0.55, -h * 0.52);

      ctx.restore();
    }

    function render() {
      const s   = stateRef.current;
      const w   = W();
      const groundY = CANVAS_H - GROUND_H;

      ctx.clearRect(0, 0, w, CANVAS_H);

      // sky gradient
      const sky = ctx.createLinearGradient(0, 0, 0, groundY);
      sky.addColorStop(0, 'rgba(10,1,1,0.0)');
      sky.addColorStop(1, 'rgba(10,1,1,0.0)');
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, w, groundY);

      // ground
      const grd = ctx.createLinearGradient(0, groundY, 0, CANVAS_H);
      grd.addColorStop(0, '#3a2010');
      grd.addColorStop(1, '#1a0a04');
      ctx.fillStyle = grd;
      ctx.fillRect(0, groundY, w, GROUND_H);
      // grass line
      ctx.fillStyle = '#4a3018';
      ctx.fillRect(0, groundY, w, 3);

      // particles (under everything)
      s.particles.forEach(p => {
        ctx.save();
        ctx.globalAlpha = p.life;
        ctx.fillStyle   = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // zombies
      s.zombies.forEach(z => drawZombie(ctx, z));

      // shells
      s.shells.forEach(sh => {
        sh.trail.forEach((t, i) => {
          ctx.save();
          ctx.globalAlpha = (i / sh.trail.length) * 0.55;
          ctx.fillStyle   = '#c8a84b';
          ctx.beginPath();
          ctx.arc(t.x, t.y, 3 * (i / sh.trail.length), 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });
        const g = ctx.createRadialGradient(sh.x, sh.y, 0, sh.x, sh.y, 5);
        g.addColorStop(0, '#fff5aa');
        g.addColorStop(1, '#c8a84b');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(sh.x, sh.y, 5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Bogdana artillery image (multiply blend to strip white)
      if (s.img) {
        ctx.save();
        ctx.globalCompositeOperation = 'multiply';
        ctx.drawImage(s.img, artX, artY, artW, artH);
        ctx.restore();
      }

      // barrel overlay (drawn on top, rotates to mouse)
      const dx  = s.mouseX - pivotX;
      const dy  = s.mouseY - pivotY;
      const ang = Math.atan2(dy, dx);
      ctx.save();
      ctx.translate(pivotX, pivotY);
      ctx.rotate(ang);
      // barrel tube
      ctx.fillStyle   = '#556b2f';
      ctx.strokeStyle = '#c8a84b';
      ctx.lineWidth   = 1.2;
      ctx.beginPath();
      ctx.rect(0, -5, 65, 10);
      ctx.fill(); ctx.stroke();
      // muzzle
      ctx.fillStyle = '#c8a84b';
      ctx.beginPath();
      ctx.rect(65, -6, 10, 12);
      ctx.fill();
      // flash on cooldown end
      if (s.cooldown > 520) {
        ctx.fillStyle = `rgba(255,220,80,${(s.cooldown - 520) / 80 * 0.9})`;
        ctx.beginPath();
        ctx.arc(80, 0, 12, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // cooldown bar
      const barW = 100;
      const fill  = 1 - s.cooldown / 600;
      ctx.fillStyle = 'rgba(0,0,0,0.4)';
      ctx.fillRect(artX, CANVAS_H - 10, barW, 5);
      ctx.fillStyle = fill >= 1 ? '#c8a84b' : '#8b1a1a';
      ctx.fillRect(artX, CANVAS_H - 10, barW * fill, 5);
    }

    // ── loop ─────────────────────────────────────────────────────
    function loop(now: number) {
      const s  = stateRef.current;
      const dt = now - s.lastTime;
      s.lastTime = now;
      if (s.running) update(dt, now);
      render();
      s.frameId = requestAnimationFrame(loop);
    }

    // ── start ────────────────────────────────────────────────────
    const s = stateRef.current;
    s.shells    = [];
    s.zombies   = [];
    s.particles = [];
    s.score     = 0;
    s.lastSpawn = 0;
    s.cooldown  = 0;
    s.running   = true;
    s.lastTime  = performance.now();
    s.frameId   = requestAnimationFrame(loop);

    // ── mouse events ─────────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      stateRef.current.mouseX = e.clientX - rect.left;
      stateRef.current.mouseY = e.clientY - rect.top;
    };
    const onClick = () => fireShell();

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('click', onClick);

    return () => {
      cancelAnimationFrame(s.frameId);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('click', onClick);
      window.removeEventListener('resize', resizeCanvas);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function restart() {
    const s    = stateRef.current;
    s.shells   = [];
    s.zombies  = [];
    s.particles = [];
    s.score    = 0;
    s.lastSpawn = 0;
    s.cooldown = 0;
    s.running  = true;
    s.lastTime = performance.now();
    setScore(0);
    setHp(5);
    setGameOver(false);
  }

  return (
    <div style={{ position: 'relative', width: '100%', background: 'transparent' }}>
      {/* HUD */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0.5rem 1.5rem',
        fontFamily: "'Oswald', sans-serif",
        fontSize: '.85rem',
        letterSpacing: '.12em',
        textTransform: 'uppercase',
        color: 'var(--muted)',
      }}>
        <span style={{ color: 'var(--gold)' }}>Рахунок: <strong style={{ color: '#fff' }}>{score}</strong></span>
        <span style={{ color: 'var(--red-b)', fontFamily: "'Black Ops One', cursive", fontSize: '1rem', letterSpacing: '.15em' }}>
          54 ОАБр · Захист рубежу
        </span>
        <span style={{ color: 'var(--gold)' }}>
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} style={{ opacity: i < hp ? 1 : 0.2 }}>❤️</span>
          ))}
        </span>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        height={CANVAS_H}
        style={{ width: '100%', display: 'block', cursor: 'crosshair' }}
      />

      {/* Game over overlay */}
      {gameOver && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 10,
          background: 'rgba(10,1,1,0.88)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: '1rem',
        }}>
          <div style={{ fontFamily: "'Black Ops One', cursive", fontSize: '2rem', color: '#c0392b', letterSpacing: '.15em' }}>
            РУБІЖ ПРОРВАНО
          </div>
          <div style={{ fontFamily: "'Oswald', sans-serif", color: 'var(--gold)', fontSize: '1.1rem', letterSpacing: '.1em' }}>
            Знищено ворогів: {score}
          </div>
          <button
            onClick={restart}
            style={{
              background: '#c0392b', color: '#fff', border: 'none',
              padding: '.7rem 2rem',
              fontFamily: "'Oswald', sans-serif",
              fontSize: '1rem', letterSpacing: '.14em', textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            Тримати оборону!
          </button>
        </div>
      )}
    </div>
  );
}
