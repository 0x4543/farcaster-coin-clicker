import React, { useEffect, useRef, useState, RefObject } from 'react';
import { ICONS } from '../coins';

interface Coin {
  id: number;
  icon: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  heat: number;
  stopped: boolean;
  life: number;
  speedFactor: number;
}

type Side = 'top' | 'bottom' | 'left' | 'right';

interface BorderGlow {
  id: number;
  sides: Side[];
  x: number;
  y: number;
  opacity: number;
  intensity: number;
  corner: boolean;
}

interface Props {
  trigger: number;
  containerRef: RefObject<HTMLDivElement>;
}

export default function CoinBurst({ trigger, containerRef }: Props) {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [glows, setGlows] = useState<BorderGlow[]>([]);
  const [bounds, setBounds] = useState({ w: 0, h: 0 });
  const [ready, setReady] = useState(false);
  const [perf, setPerf] = useState(1);
  const raf = useRef<number | null>(null);
  const iconsRef = useRef<string[]>([]);
  const fpsCheck = useRef({ t: performance.now(), frames: 0 });
  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setBounds({ w: rect.width, h: rect.height });
    }
  }, [containerRef]);

  useEffect(() => {
    const srcs = ICONS.filter(x => typeof x === 'string' && x.trim().length > 0 && !/\/wbt\.svg$/i.test(x));
    let checked = 0;
    const ok: string[] = [];
    srcs.forEach(src => {
      const img = new Image();
      img.onload = () => {
        ok.push(src);
        checked += 1;
        if (checked === srcs.length) {
          iconsRef.current = ok;
          setReady(true);
        }
      };
      img.onerror = () => {
        checked += 1;
        if (checked === srcs.length) {
          iconsRef.current = ok;
          setReady(true);
        }
      };
      img.src = src;
    });
  }, []);

  useEffect(() => {
    if (!bounds.w || !bounds.h) return;
    if (trigger === 0) return;
    if (!ready || iconsRef.current.length === 0) return;

    const angle = Math.random() * 2 * Math.PI;
    const speed = 5 + Math.random() * 6;
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;
    const icon = iconsRef.current[Math.floor(Math.random() * iconsRef.current.length)];
    const id = Date.now() + Math.random();

    setCoins(prev => {
      const updated = [
        ...prev,
        {
          id,
          icon,
          x: bounds.w / 2 - 18,
          y: bounds.h / 2 - 18,
          vx,
          vy,
          heat: 0,
          stopped: false,
          life: 1,
          speedFactor: speed / 10
        }
      ];
      return updated.slice(-Math.floor(40 * perf));
    });
  }, [trigger, bounds, ready, perf]);

  useEffect(() => {
    const step = () => {
      const now = performance.now();
      fpsCheck.current.frames++;
      if (now - fpsCheck.current.t >= 1000) {
        const fps = fpsCheck.current.frames;
        const newPerf = fps < 45 ? Math.max(0.5, perf - 0.1) : Math.min(1, perf + 0.05);
        setPerf(newPerf);
        fpsCheck.current = { t: now, frames: 0 };
      }

      setCoins(prev =>
        prev
          .map(c => {
            let { x, y, vx, vy, heat, stopped, life, speedFactor } = c;
            x += vx;
            y += vy;

            const hitLeft = x <= 0;
            const hitRight = x >= bounds.w - 36;
            const hitTop = y <= 0;
            const hitBottom = y >= bounds.h - 36;

            const speedNow = Math.sqrt(vx * vx + vy * vy);
            const impact = Math.min(1, speedNow / 12);
            const baseIntensity = Math.pow(impact, 1.2) * 1.8 * perf;
            const rand = 0.8 + Math.random() * 0.4;
            const intensity = baseIntensity * rand;

            if (hitLeft || hitRight || hitTop || hitBottom) {
              const sides: Side[] = [];
              let gx = x;
              let gy = y;

              if (hitLeft) {
                vx *= -0.9;
                x = 0;
                gx = 0;
                gy = y + 18;
                sides.push('left');
              }
              if (hitRight) {
                vx *= -0.9;
                x = bounds.w - 36;
                gx = bounds.w;
                gy = y + 18;
                sides.push('right');
              }
              if (hitTop) {
                vy *= -0.9;
                y = 0;
                gx = x + 18;
                gy = 0;
                sides.push('top');
              }
              if (hitBottom) {
                vy *= -0.9;
                y = bounds.h - 36;
                gx = x + 18;
                gy = bounds.h;
                sides.push('bottom');
              }

              const corner = sides.length === 2;
              setGlows(g => {
                const updated = [
                  ...g,
                  { id: Math.random(), sides, x: gx, y: gy, opacity: 1, intensity, corner }
                ];
                return updated.slice(-Math.floor(25 * perf));
              });
            }

            vx *= 0.992;
            vy *= 0.992;

            const spd = Math.sqrt(vx * vx + vy * vy);
            if (!stopped && spd < 0.3) stopped = true;

            if (stopped) {
              heat = Math.min(1, heat + 0.03);
              life -= 0.008 / speedFactor;
            }

            return { ...c, x, y, vx, vy, heat, stopped, life, speedFactor };
          })
          .filter(c => c.life > 0)
      );

      setGlows(prev =>
        prev
          .map(g => ({ ...g, opacity: g.opacity - 0.06 }))
          .filter(g => g.opacity > 0)
      );

      raf.current = requestAnimationFrame(step);
    };

    raf.current = requestAnimationFrame(step);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [bounds, perf]);

  return (
    <>
      {coins.map(c => {
        const intensity = c.heat * perf;
        const glow = `drop-shadow(0 0 ${6 + intensity * (isMobile ? 10 : 18)}px rgba(${180 + intensity * 20}, ${100 + intensity * 40}, 255, ${0.8 - intensity * 0.3}))`;
        const burn = `brightness(${1 + intensity * 1.5}) saturate(${1 + intensity * 2})`;
        const opacity = c.stopped ? c.life : 1;
        const blur = c.stopped ? intensity * (isMobile ? 1 : 2) : 0;
        const scale = 1 + intensity * 0.3;

        return (
          <img
            key={c.id}
            src={c.icon}
            style={{
              position: 'absolute',
              left: `${c.x}px`,
              top: `${c.y}px`,
              width: '36px',
              height: '36px',
              opacity,
              filter: `${glow} ${burn} blur(${blur}px)`,
              transform: `scale(${scale})`,
              pointerEvents: 'none',
              transition: 'opacity 0.1s linear, transform 0.15s ease',
              willChange: 'transform, opacity, filter',
              contain: 'layout paint',
              zIndex: 10
            }}
          />
        );
      })}

      {glows.map(g => {
        const base = (isMobile ? 25 : 40) + g.intensity * (isMobile ? 15 : 25);
        const strip = Math.max(3, 4 + g.intensity * (isMobile ? 1.5 : 2.5));
        const coreColor = `rgba(255,255,255,${Math.min(1, g.opacity * 1.1 * g.intensity * perf)})`;
        const softColor = `rgba(255,255,255,${Math.min(1, g.opacity * 0.5 * g.intensity * perf)})`;

        if (g.corner) return null;

        return g.sides.map((side, i) => {
          if (side === 'top' || side === 'bottom') {
            const left = Math.max(0, g.x - base / 2);
            return (
              <div
                key={`${g.id}-${i}`}
                style={{
                  position: 'absolute',
                  left: `${left}px`,
                  top: side === 'top' ? '0' : `${bounds.h - strip}px`,
                  width: `${base}px`,
                  height: `${strip}px`,
                  background: `linear-gradient(90deg, transparent, ${coreColor}, ${softColor}, transparent)`,
                  filter: `blur(${2 + g.intensity * (isMobile ? 2 : 4)}px)`,
                  pointerEvents: 'none',
                  willChange: 'opacity, filter',
                  contain: 'layout paint',
                  zIndex: 15
                }}
              />
            );
          } else {
            const top = Math.max(0, g.y - base / 2);
            return (
              <div
                key={`${g.id}-${i}`}
                style={{
                  position: 'absolute',
                  top: `${top}px`,
                  left: side === 'left' ? '0' : `${bounds.w - strip}px`,
                  height: `${base}px`,
                  width: `${strip}px`,
                  background: `linear-gradient(180deg, transparent, ${coreColor}, ${softColor}, transparent)`,
                  filter: `blur(${2 + g.intensity * (isMobile ? 2 : 4)}px)`,
                  pointerEvents: 'none',
                  willChange: 'opacity, filter',
                  contain: 'layout paint',
                  zIndex: 15
                }}
              />
            );
          }
        });
      })}
    </>
  );
}