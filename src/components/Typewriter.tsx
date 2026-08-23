"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

export function Typewriter({
  text,
  className,
  speed = 65,
  startDelay = 150,
  start = true,
  onDone,
}: {
  text: string;
  className?: string;
  speed?: number;
  startDelay?: number;
  start?: boolean;
  onDone?: () => void;
}) {
  const shouldReduceMotion = useReducedMotion();
  const [count, setCount] = useState(shouldReduceMotion ? text.length : 0);

  useEffect(() => {
    if (!start) return;

    if (shouldReduceMotion) {
      onDone?.();
      return;
    }

    let i = 0;
    let interval: ReturnType<typeof setInterval>;
    const startTimeout = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length) {
          clearInterval(interval);
          onDone?.();
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed, startDelay, start, shouldReduceMotion]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true" style={{ whiteSpace: "pre" }}>
        {text.split("").map((char, i) => (
          <span
            key={i}
            className="inline-block transition-[opacity,transform] duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              opacity: i < count ? 1 : 0,
              transform: i < count ? "translateY(0)" : "translateY(0.4em)",
            }}
          >
            {char}
          </span>
        ))}
      </span>
    </span>
  );
}
