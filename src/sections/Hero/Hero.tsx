import React from 'react';
import { Container } from '../../components/ui';
import { useI18n } from '../../i18n';
import skyImg from '../../assets/sky.jpg';
import planeImg from '../../assets/plane.png';
import styles from './Hero.module.css';

export interface HeroProps {
  className?: string;
}

export default function Hero({ className = '' }: HeroProps): React.JSX.Element {
  const { t } = useI18n();

  return (
    <section id="home" className={`${styles.heroSection} ${className}`.trim()} aria-labelledby="hero-heading">
      <Container size="hero">
        <div className={styles.heroContent}>
          {/* Centered Two-Line H1 */}
          <h1 id="hero-heading" className={styles.heroTitle}>
            <span>{t('hero.titleLine1')}</span>
            <span className={styles.titleBreak}>{t('hero.titleLine2')}</span>
          </h1>

          {/* Visual Stage: Fully Rounded Sky Pill with Overlapping Plane */}
          <div className={styles.heroVisualStage}>
            <div className={styles.skyPill}>
              <img
                src={skyImg}
                alt={t('hero.skyAlt')}
                className={styles.skyImage}
                loading="eager"
                width="1200"
                height="400"
              />
            </div>

            <div className={styles.planeWrapper}>
              <img
                src={planeImg}
                alt={t('hero.planeAlt')}
                className={styles.planeImage}
                loading="eager"
                width="1400"
                height="400"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
