import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import Link from '@docusaurus/Link';

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
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
          <span className={styles.highlight}>Support for Webpack</span>/
          <span className={styles.highlight}>Vite</span>/
          <span className={styles.highlight}>Rspack</span>
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
