import React from 'react';
import Layout from '@theme/Layout';
import Translate, { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import Link from '@docusaurus/Link';
import Typewriter from '../components/Typewriter';

const tools = [
  'Vite',
  'Webpack',
  'Rspack',
  translate({
    id: 'homepage.tools.more',
    message: '你需要的其他工具...',
  }),
];

export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={translate(
        {
          id: 'homepage.meta.title',
          message: '欢迎来到 {siteTitle}',
        },
        { siteTitle: siteConfig.title },
      )}
      description={translate({
        id: 'homepage.meta.description',
        message: '前端工程化工具箱，开箱即用、极致速度、可扩展。',
      })}
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
          <span className={styles.productTag}>
            <Translate id="homepage.hero.tag">前端工程化工具箱</Translate>
          </span>
        </div>
        <div className={styles.subtitle}>
          <span className={styles.highlight}>
            <Translate id="homepage.hero.easy">开箱即用</Translate>
          </span>
          ,
          <span className={styles.highlight}>
            <Translate id="homepage.hero.fast">极致速度</Translate>
          </span>
          ,
          <span>
            <Translate id="homepage.hero.support">支持</Translate>
          </span>
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
              <span>
                <Translate id="homepage.cta.getStarted">开始使用</Translate>
              </span>
              <span className={styles.versionBadge}>v4.0</span>
            </span>
            <span className={styles.ctaArrow}>→</span>
          </Link>
        </div>
      </main>
    </Layout>
  );
}
