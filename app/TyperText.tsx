"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

// Easing function: Quint InOut.
const easeQuintInOut = (t: number): number =>
  t < 0.5 ? 16 * t ** 5 : 1 - Math.pow(-2 * t + 2, 5) / 2;

// Tween engine.
interface TweenOptions {
  duration?: number;
  delay?: number;
  ease?: (t: number) => number;
  onUpdate: (progress: number) => void;
  onComplete?: () => void;
}

const tween = ({
  duration = 2000,
  delay = 0,
  ease = easeQuintInOut,
  onUpdate,
  onComplete,
}: TweenOptions) => {
  const startTime = performance.now() + delay;
  const animate = (now: number) => {
    const elapsed = now - startTime;
    if (elapsed < 0) {
      requestAnimationFrame(animate);
      return;
    }
    const progress = Math.min(elapsed / duration, 1);
    onUpdate(ease(progress));
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      if (onComplete) {
        onComplete();
      }
    }
  };
  requestAnimationFrame(animate);
};

// Decode options.
export interface DecodeOptions {
  duration?: number;
  delay?: number;
  scramble?: string;
  useInput?: boolean;
  mutation?: number;
  showPower?: number;
  mashPower?: number;
  donePower?: number;
  cursor?: string;
  ease?: (t: number) => number;
  onComplete?: () => void;
}

// Process text into an array and queue.
const processText = (text: string) => {
  const chars = text.split("");
  const start = chars.map((ch) => (ch === " " ? "&nbsp;" : ""));
  const queue: { index: number; char: string; temp: string | null }[] = [];
  chars.forEach((ch, i) => {
    if (ch !== " ") {
      queue.push({ index: i, char: ch, temp: null });
    }
  });
  return { start, queue };
};

const randomScramble = (scrambleArr: string[]): string =>
  scrambleArr[Math.floor(Math.random() * scrambleArr.length)];

const decodeText = (
  el: HTMLElement,
  text: string,
  options: DecodeOptions = {}
) => {
  const duration = options.duration ?? 2000;
  const delay = options.delay || 0;
  const scrambleChars = options.scramble || "__-—/\\|<>";
  const useInput = options.useInput ?? true;
  const mutation = options.mutation ?? 0.15;
  const showPower = options.showPower ?? 0.5;
  const mashPower = options.mashPower ?? 2;
  const donePower = options.donePower ?? 15;
  const cursorSymbol = options.cursor || "-";

  let scrambleSet = scrambleChars;
  if (useInput) {
    for (const ch of text.toLowerCase()) {
      if (/[a-z]/.test(ch) && scrambleSet.indexOf(ch) === -1) {
        scrambleSet += ch;
      }
    }
  }
  const scrambleArr = scrambleSet
    .split("")
    .map((ch) => `<span class="temp opacity-25">${ch}</span>`);
  const cursorHTML = `<span class="temp opacity-25">${cursorSymbol}</span>`;

  const { start, queue } = processText(text);
  const shuffledQueue = [...queue].sort(() => Math.random() - 0.5);
  const output = [...start];
  el.innerHTML = output.join("");

  tween({
    duration,
    delay,
    ease: options.ease || easeQuintInOut,
    onUpdate: (progress) => {
      const qLength = shuffledQueue.length;
      const revealCount = Math.floor(Math.pow(progress, showPower) * qLength);
      const mashCount = Math.floor(Math.pow(progress, mashPower) * qLength);
      const doneCount = Math.floor(Math.pow(progress, donePower) * qLength);
      for (let i = 0; i < revealCount; i++) {
        const q = shuffledQueue[i];
        let charToShow: string;
        if (i < doneCount) {
          charToShow = q.char;
        } else if (i < mashCount) {
          if (!q.temp || Math.random() < mutation) {
            q.temp = randomScramble(scrambleArr);
          }
          charToShow = q.temp;
        } else {
          charToShow = cursorHTML;
        }
        // @ts-expect-error - TODO: fix this later
        output[q.index] = charToShow;
      }
      el.innerHTML = output.join("");
    },
    onComplete: () => {
      if (options.onComplete) {
        options.onComplete();
      }
    },
  });
};

const breakTextIntoLines = (el: HTMLElement, text: string): string[] => {
  el.dataset.finalText = text;
  el.innerHTML = text
    .split(" ")
    .map((word) => `<span class="__chunk__">${word}</span>`)
    .join(" ");
  const chunks = Array.from(el.querySelectorAll(".__chunk__"));
  const lines: string[] = [];
  let currentLine: string[] = [];
  let lastOffsetTop: number | null = null;
  chunks.forEach((chunk) => {
    const chunkEl = chunk as HTMLElement;
    if (lastOffsetTop === null) {
      lastOffsetTop = chunkEl.offsetTop;
      currentLine.push(chunkEl.innerHTML);
    } else if (chunkEl.offsetTop !== lastOffsetTop) {
      lines.push(currentLine.join(" "));
      currentLine = [chunkEl.innerHTML];
      lastOffsetTop = chunkEl.offsetTop;
    } else {
      currentLine.push(chunkEl.innerHTML);
    }
  });
  if (currentLine.length) lines.push(currentLine.join(" "));
  el.innerHTML = "";
  lines.forEach((line) => {
    const lineDiv = document.createElement("div");
    lineDiv.className = "typer-line block";
    lineDiv.setAttribute("data-text", line);
    el.appendChild(lineDiv);
  });
  return lines;
};

interface TyperTextProps {
  text: string;
  duration?: number;
  delay?: number;
  className?: string;
}

const TyperText: React.FC<TyperTextProps> = ({
  text,
  duration,
  delay = 0,
  className,
}) => {
  const compRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (compRef.current) {
      // Break text into lines.
      breakTextIntoLines(compRef.current, text);
      // Pre-measure the final width.
      const measuredWidth = compRef.current.offsetWidth;
      compRef.current.style.width = measuredWidth + "px";

      const lines = compRef.current.querySelectorAll(".typer-line");
      let completedLines = 0;
      lines.forEach((lineEl, idx) => {
        const lineText = lineEl.getAttribute("data-text") || "";
        decodeText(lineEl as HTMLElement, lineText, {
          duration,
          delay: idx * 100 + delay,
          scramble: "__-—/\\|<>",
          useInput: true,
          mutation: 0.25,
          showPower: 0.7,
          mashPower: 2,
          donePower: 15,
          cursor: "-",
          onComplete: () => {
            completedLines++;
            if (completedLines === lines.length && compRef.current) {
              // Replace with final text and remove the fixed width.
              compRef.current.innerHTML =
                compRef.current.dataset.finalText || text;
              compRef.current.style.width = "";
            }
          },
        });
      });
    }
  }, [delay, duration, text]);

  return (
    <div
      ref={compRef}
      className={cn(
        "typer-component inline-block font-mono font-extralight w-full",
        className
      )}
    ></div>
  );
};

export default TyperText;
