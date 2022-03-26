import Link from "next/link";
import styles from "../styles/Home.module.css";

function InfoBar() {
    return (
        <div className={styles.infobar}>
          <span id="name">Houjun Liu</span>
        </div>
    );
}

function MainNav() {
    return (
        <div className={styles.navbar}>
          <span className={styles.navbaritem} id={styles.projects}><Link href="/projects">Projects</Link></span>
          <span className={styles.navbaritem} id={styles.research}><Link href="/research">Research</Link></span>
          <span className={styles.navbaritem} id={styles.production}><Link href="/production">Production</Link></span>
          <span className={styles.navbaritem} id={styles.about}><Link href="/about">About</Link></span>
        </div>
    );
}

export default function Home() {
    return (
        <div className={styles.home}>
          <MainNav />
          <InfoBar />
        </div>
    );
}
