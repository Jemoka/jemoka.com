import Router from 'next/router';
import styles from "../styles/Home.module.scss";

import { useSpring, animated } from 'react-spring';

function InfoBar() {
    return (
        <div className={styles.infobar}>
          <span id="uname">jemoka.com</span>
          <span>
            <span id="name" className="font-bold">Houjun Liu</span>
          </span>
        </div>
    );
}

function MainNav() {
    const [ps, psAPI] = useSpring(() => ({ width: "25vw", height: "25vh" }));
    const [rs, rsAPI] = useSpring(() => ({ width: "25vw", height: "25vh" }));
    const [prods, prodsAPI] = useSpring(() => ({ width: "25vw", height: "25vh" }));
    const [as, asAPI] = useSpring(() => ({ width: "25vw", height: "25vh" }));

    console.log(ps);

    return (
        <div className={styles.navbar}>
          <animated.span className={styles.navbaritem} id={styles.projects} style={ps}
                         onMouseEnter={() => psAPI.start({width: "40vw", height: "40vh"})}
                         onMouseLeave={() => psAPI.start({width: "25vw", height: "25vh"})}
                         onClick={()=> {
                             psAPI.start({width: "400vw"});
                             Router.push("/projects");
                         }}><a>Projects</a></animated.span>

          <animated.span className={styles.navbaritem} id={styles.research} style={rs}
                         onMouseEnter={() => rsAPI.start({width: "40vw", height: "40vh"})}
                         onMouseLeave={() => rsAPI.start({width: "25vw", height: "25vh"})}
                         onClick={()=> {
                             rsAPI.start({width: "400vw"});
                             Router.push("/research");
                         }}><a>Research</a></animated.span>

          <animated.span className={styles.navbaritem} id={styles.production} style={prods}
                         onMouseEnter={() => prodsAPI.start({width: "40vw", height: "40vh"})}
                         onMouseLeave={() => prodsAPI.start({width: "25vw", height: "25vh"})}
                         onClick={()=> {
                             prodsAPI.start({width: "400vw"});
                             Router.push("/production");
                         }}><a>Production</a></animated.span>

          <animated.span className={styles.navbaritem} id={styles.about} style={as}
                         onMouseEnter={() => asAPI.start({width: "40vw", height: "40vh"})}
                         onMouseLeave={() => asAPI.start({width: "25vw", height: "25vh"})}
                         onClick={()=> {
                             asAPI.start({width: "400vw"});
                             Router.push("/production");
                         }}><a>About</a></animated.span>
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
