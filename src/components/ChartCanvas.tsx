import React, { useEffect, useRef, useState } from 'react';

type Props = { isGrowing: boolean };

export default function ChartCanvas({ isGrowing }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ready, setReady] = useState(false);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const particles = useRef<any[]>([]);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const resize = () => {
      const el = canvasRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setSize({ w: rect.width, h: rect.height });
      setReady(true);
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    if (!ready || !canvasRef.current) return;
    const cvs = canvasRef.current;
    const ctx = cvs.getContext('2d');
    if (!ctx) return;

    const dpr = Math.max(1, window.devicePixelRatio || 1);
    cvs.width = size.w * dpr;
    cvs.height = size.h * dpr;
    ctx.scale(dpr, dpr);

    const createParticle = (x: number, y: number) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 0.15;
      return {
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: Math.random(),
        alpha: 0,
        size: Math.random() * 1.5 + 0.5,
        hue: 255 + Math.random() * 15
      };
    };

    if (particles.current.length === 0) {
      for (let i = 0; i < 40; i++) {
        particles.current.push(createParticle(Math.random() * size.w, Math.random() * size.h));
      }
    }

    const loop = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.25)';
      ctx.fillRect(0, 0, size.w, size.h);

      particles.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.003;
        p.alpha = Math.sin(p.life * Math.PI) * 0.25;

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        gradient.addColorStop(0, `hsla(${p.hue},80%,70%,${p.alpha})`);
        gradient.addColorStop(1, `hsla(${p.hue},80%,40%,0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fill();
      });

      particles.current = particles.current.filter((p) => p.life > 0);

      while (particles.current.length < 40) {
        particles.current.push(createParticle(Math.random() * size.w, Math.random() * size.h));
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [ready, size.w, size.h]);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />;
}