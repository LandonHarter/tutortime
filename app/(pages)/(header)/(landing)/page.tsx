import styles from './page.module.scss';
import LandingHero1 from './hero1';
import LandingBackground from './background';

export default function Home() {
  return (
    <>
      <section className={styles.hero1}>
        <LandingBackground />
        <LandingHero1 />
      </section>
    </>
  );
}
