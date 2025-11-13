import React, { useState, useEffect, memo, useRef } from 'react';
import styles from './styles.module.css';

interface TypewriterProps {
  words: string[];
  switchSpeed?: number;
  pauseTime?: number;
}

const Typewriter: React.FC<TypewriterProps> = memo(({
  words,
  switchSpeed = 600,
  pauseTime = 2500,
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const wordsRef = useRef(words);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    wordsRef.current = words;
  }, [words]);

  useEffect(() => {
    const switchWord = () => {
      setIsVisible(false);
      
      timeoutRef.current = setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % wordsRef.current.length);
        setIsVisible(true);
      }, switchSpeed / 2);
    };

    const interval = setInterval(switchWord, pauseTime + switchSpeed);

    return () => {
      clearInterval(interval);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [switchSpeed, pauseTime]);

  const currentWord = wordsRef.current[currentWordIndex] || '';

  return (
    <span className={styles.wordSwitcher}>
      {currentWord && (
        <span 
          className={`${styles.word} ${isVisible ? styles.visible : styles.hidden}`}
          key={currentWordIndex}
        >
          {currentWord}
        </span>
      )}
    </span>
  );
});

Typewriter.displayName = 'Typewriter';

export default Typewriter;

