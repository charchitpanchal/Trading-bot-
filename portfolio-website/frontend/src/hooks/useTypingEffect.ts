"use client";

import { useEffect, useState } from "react";

export function useTypingEffect(phrases: string[], typingSpeed = 80, pause = 2000) {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIndex % phrases.length];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          const next = current.slice(0, text.length + 1);
          setText(next);
          if (next === current) {
            setTimeout(() => setIsDeleting(true), pause);
          }
        } else {
          const next = current.slice(0, text.length - 1);
          setText(next);
          if (next === "") {
            setIsDeleting(false);
            setPhraseIndex((i) => (i + 1) % phrases.length);
          }
        }
      },
      isDeleting ? typingSpeed / 2 : typingSpeed
    );
    return () => clearTimeout(timeout);
  }, [text, isDeleting, phraseIndex, phrases, typingSpeed, pause]);

  return text;
}
