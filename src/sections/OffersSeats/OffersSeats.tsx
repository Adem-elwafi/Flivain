import React from 'react';
import { Container, Button } from '../../components/ui';
import { useI18n } from '../../i18n';
import styles from './OffersSeats.module.css';

export interface OffersSeatsProps {
  className?: string;
}

export default function OffersSeats({ className = '' }: OffersSeatsProps): React.JSX.Element {
  const { t } = useI18n();

  const flightDeals = [
    {
      id: 'deal-1',
      fromCode: 'DXB',
      fromCity: 'Dubai',
      toCode: 'LHR',
      toCity: 'London',
      duration: '7h 15m',
      price: '$480',
      badge: 'Popular',
    },
    {
      id: 'deal-2',
      fromCode: 'CDG',
      fromCity: 'Paris',
      toCode: 'HND',
      toCity: 'Tokyo',
      duration: '12h 40m',
      price: '$850',
      badge: 'Best Value',
    },
    {
      id: 'deal-3',
      fromCode: 'JFK',
      fromCity: 'New York',
      toCode: 'FCO',
      toCity: 'Rome',
      duration: '8h 20m',
      price: '$620',
      badge: 'Limited',
    },
  ];

  const cabinClasses = [
    {
      id: 'economy',
      name: t('booking.tabs.economy'),
      desc: t('offers.perks.economyPerk'),
      isPopular: false,
      features: [
        'Standard 32" seat pitch',
        'Inflight Wi-Fi & entertainment',
        'Complimentary meals & drinks',
        '1 carry-on + 1 checked bag',
      ],
    },
    {
      id: 'business',
      name: t('booking.tabs.business'),
      desc: t('offers.perks.businessPerk'),
      isPopular: true,
      features: [
        'Full 180° lie-flat beds',
        'VIP lounge access worldwide',
        'Chef-curated gourmet dining',
        'Priority boarding & 2 checked bags',
      ],
    },
    {
      id: 'firstClass',
      name: t('booking.tabs.firstClass'),
      desc: t('offers.perks.firstPerk'),
      isPopular: false,
      features: [
        'Private closed suite & double bed',
        'Personal chauffeur service',
        'Uncapped luxury champagne & caviar',
        'Dedicated 24/7 cabin attendant',
      ],
    },
  ];

  return (
    <section id="offers" className={`${styles.offersSection} ${className}`.trim()} aria-labelledby="offers-heading">
      <Container size="standard">
        {/* Section Heading */}
        <div className={styles.headerCol}>
          <span className={styles.sectionBadge}>Curated Journeys</span>
          <h2 id="offers-heading" className={styles.sectionTitle}>
            {t('offers.title')}
          </h2>
          <p className={styles.sectionSubtitle}>{t('offers.subtitle')}</p>
        </div>

        {/* 1. Featured Deals Grid */}
        <div className={styles.offersGrid}>
          {flightDeals.map((deal) => (
            <article key={deal.id} className={styles.offerCard}>
              <div className={styles.offerRoute}>
                <div className={styles.cityCol}>
                  <span className={styles.cityCode}>{deal.fromCode}</span>
                  <span className={styles.cityName}>{deal.fromCity}</span>
                </div>

                <div className={styles.flightPath}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="flipOnRtl"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                  <span className={styles.flightDuration}>{deal.duration}</span>
                </div>

                <div className={styles.cityCol} style={{ textAlign: 'end' }}>
                  <span className={styles.cityCode}>{deal.toCode}</span>
                  <span className={styles.cityName}>{deal.toCity}</span>
                </div>
              </div>

              <div className={styles.offerFooter}>
                <div className={styles.priceCol}>
                  <span className={styles.priceLabel}>Starting from</span>
                  <span className={styles.priceValue}>{deal.price}</span>
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    const el = document.getElementById('main-content');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {t('offers.bookNow')}
                </Button>
              </div>
            </article>
          ))}
        </div>

        {/* 2. Cabin Class Comparison */}
        <div id="seats" className={styles.comparisonHeader}>
          <h3 className={styles.sectionTitle}>{t('offers.classComparisonTitle')}</h3>
        </div>

        <div className={styles.comparisonGrid}>
          {cabinClasses.map((item) => (
            <div
              key={item.id}
              className={`${styles.classCard} ${item.isPopular ? styles.classCardHighlighted : ''}`.trim()}
            >
              {item.isPopular && <span className={styles.popularBadge}>Most Booked</span>}
              <div className={styles.classHeader}>
                <h4 className={styles.className}>{item.name}</h4>
                <p className={styles.classDesc}>{item.desc}</p>
              </div>

              <ul className={styles.perksList}>
                {item.features.map((feat, i) => (
                  <li key={i} className={styles.perkItem}>
                    <svg
                      className={styles.checkIcon}
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <div style={{ marginBlockStart: 'auto' }}>
                <Button
                  variant={item.isPopular ? 'primary' : 'outline'}
                  size="md"
                  style={{ inlineSize: '100%' }}
                  onClick={() => {
                    const el = document.getElementById('main-content');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {t('offers.bookNow')}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
