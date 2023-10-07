import styles from './page.module.scss';
import LandingHero1 from './hero1';

export default function Home() {
  return (
    <>
      <section className={styles.hero1}>
        <LandingHero1 />
      </section>
    </>
  );
}
