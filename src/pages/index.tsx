import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import Link from '@docusaurus/Link';

const tools = ['Webpack', 'Vite', 'Rspack'];

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const [currentTool, setCurrentTool] = useState(0);
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    const currentText = tools[currentTool];
    let charIndex = -1;
    const typeInterval = setInterval(() => {
      setDisplayedText((prevText) => {
        charIndex += 1;

        if (charIndex === currentText.length) {
          clearInterval(typeInterval);
          setTimeout(() => {
            setCurrentTool((prevTool) => (prevTool + 1) % tools.length);
          }, 500);
          return prevText;
        }

        return prevText + currentText[charIndex] || '';
      });
    }, 200);

    return () => {
      setDisplayedText('');
    };
  }, [currentTool]);

  return (
    <Layout
      title={`Welcome to ${siteConfig.title}`}
      description="Discover and share inspiring quotes from around the world"
    >
      <main className={`${styles.main} ${styles.frostedBackground}`}>
        <h1 className={`${styles.title} ${styles.gradientText}`}>ESBoot</h1>
        <h1 className={`${styles.title} ${styles.gradientText}`}>
          Frontend Infrastructure Toolkit
        </h1>
        <p className={styles.subtitle}>
          <span className={styles.highlight}>Easy to use</span>,
          <span className={styles.highlight}>Explore blazing fast</span>,
          <span className={styles.highlight}>Support for</span>
          <p style={{ height: '25px', marginTop: '15px' }}>
            <span className={styles.typewriter}>{displayedText}</span>
          </p>
        </p>

        <div>
          <Link
            to="/docs/3.0/docs/intro"
            className={`${styles.quoteButton} ${styles.glassButton}`}
          >
            Explore Now
          </Link>
        </div>
      </main>
    </Layout>
  );
}
