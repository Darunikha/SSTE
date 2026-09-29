import React, { useEffect, useRef, useState } from 'react';

// Splits "2.5K+" into { prefix: '', value: 2.5, decimals: 1, suffix: 'K+' }
const parse = (raw) => {
  const match = String(raw).match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  const decimals = (match[2].split('.')[1] || '').length;
  return { prefix: match[1], value: parseFloat(match[2]), decimals, suffix: match[3] };
};

const StatItem = ({ number, label }) => {
  const ref = useRef(null);
  const parsed = parse(number);
  const [display, setDisplay] = useState(parsed ? 0 : number);

  useEffect(() => {
    if (!parsed) return undefined;
    const node = ref.current;
    let frame;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const duration = 1600;
        const tick = (now) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 4);
          setDisplay(parsed.value * eased);
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [number]);

  const text = parsed
    ? `${parsed.prefix}${Number(display).toFixed(parsed.decimals)}${parsed.suffix}`
    : display;

  return (
    <div className="trust-item" ref={ref}>
      <span className="trust-number">{text}</span>
      <span className="trust-label">{label}</span>
    </div>
  );
};

export default StatItem;
