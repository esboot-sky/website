import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import Link from '@docusaurus/Link';
import Typewriter from '../components/Typewriter';

const tools = ['Vite', 'Webpack', 'Rspack', 'Others you want...'];

export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={`Welcome to ${siteConfig.title}`}
      description="Frontend Infrastructure Toolkit - Easy to use, blazing fast, and extensible"
    >
      <main className={styles.main}>
        <div className={styles.starsContainer}>
          <div className={styles.starsLeft}></div>
          <div className={styles.starsRight}></div>
          <div className={styles.starsCenter}></div>
          <div className={styles.particlesContainer}>
            <div className={styles.particle}></div>
            <div className={styles.particle}></div>
            <div className={styles.particle}></div>
            <div className={styles.particle}></div>
            <div className={styles.particle}></div>
            <div className={styles.particle}></div>
            <div className={styles.particle}></div>
            <div className={styles.particle}></div>
            <div className={styles.particle}></div>
            <div className={styles.particle}></div>
            <div className={styles.particle}></div>
            <div className={styles.particle}></div>
            <div className={styles.particle}></div>
            <div className={styles.particle}></div>
            <div className={styles.particle}></div>
            <div className={styles.particle}></div>
            <div className={styles.particle}></div>
            <div className={styles.particle}></div>
            <div className={styles.particle}></div>
            <div className={styles.particle}></div>
            <div className={styles.particle}></div>
            <div className={styles.particle}></div>
            <div className={styles.particle}></div>
            <div className={styles.particle}></div>
          </div>
        </div>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>ESBoot</h1>
          <span className={styles.productTag}>Frontend Infrastructure Toolkit</span>
        </div>
        <div className={styles.subtitle}>
          <span className={styles.highlight}>Easy to use</span>,
          <span className={styles.highlight}>blazing fast</span>,
          <span>support for</span>
          <span className={styles.highlight}>
            <Typewriter words={tools} />
          </span>
        </div>

        <div className={styles.ctaContainer}>
          <Link
            to="/docs/4.0/docs/intro"
            className={styles.ctaButton}
          >
            <span className={styles.ctaText}>
              <span>Get Started</span>
              <span className={styles.versionBadge}>v4.0</span>
            </span>
            <span className={styles.ctaArrow}>→</span>
          </Link>
        </div>
      </main>
    </Layout>
  );
}
