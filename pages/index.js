import Head from "next/head";
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

          <div id="socialpanel">
            <a href="https://www.jemoka.com/search/" className="header-social" id="header-search"><i className="ic fa-solid fa-magnifying-glass" /></a>
            <a href="https://github.com/Jemoka/" className="header-social" id="header-github"><i className="ic fa-brands fa-github" /></a>
            <a href="https://twitter.com/jemokajack" className="header-social" id="header-twitter"><i className="ic fa-brands fa-twitter" /></a>
            <a href="https://www.reddit.com/user/Jemoka/" className="header-social" id="header-reddit"><i className="ic fa-brands fa-reddit" /></a>
          </div>
        </div>
    );
}

function MainNav() {
    const [ps, psAPI] = useSpring(() => ({ width: "25vw", height: "25vh", mixBlendMode:"normal" }));
    const [rs, rsAPI] = useSpring(() => ({ width: "25vw", height: "25vh", mixBlendMode:"normal" }));
    const [prods, prodsAPI] = useSpring(() => ({ width: "25vw", height: "25vh", mixBlendMode:"normal" }));
    const [as, asAPI] = useSpring(() => ({ width: "25vw", height: "25vh", mixBlendMode:"normal" }));

    console.log(ps);

    return (
        <div className={styles.navbar}>
          <animated.span className={styles.navbaritem} id={styles.projects} style={ps}
                         onMouseEnter={() => psAPI.start({width: "40vw", height: "40vh", mixBlendMode:"normal"})}
                         onMouseLeave={() => psAPI.start({width: "25vw", height: "25vh", mixBlendMode:"normal"})}
                         onClick={()=> {
                             psAPI.start({width: "1000vw", height: "400vh"});
                             Router.push("/projects");
                         }}><animated.a style={{mixBlendMode: ps.mixBlendMode}}>Projects</animated.a></animated.span>

          <animated.span className={styles.navbaritem} id={styles.research} style={rs}
                         onMouseEnter={() => rsAPI.start({width: "40vw", height: "40vh", mixBlendMode:"normal"})}
                         onMouseLeave={() => rsAPI.start({width: "25vw", height: "25vh", mixBlendMode:"normal"})}
                         onClick={()=> {
                             rsAPI.start({width: "1000vw", height: "400vh"});
                             Router.push("https://www.jemoka.com/posts/kbhresearch_index/");
                         }}><animated.a style={{mixBlendMode: rs.mixBlendMode}}>Research</animated.a></animated.span>

          <animated.span className={styles.navbaritem} id={styles.production} style={prods}
                         onMouseEnter={() => prodsAPI.start({width: "40vw", height: "40vh", mixBlendMode:"normal"})}
                         onMouseLeave={() => prodsAPI.start({width: "25vw", height: "25vh", mixBlendMode:"normal"})}
                         onClick={()=> {
                             prodsAPI.start({width: "1000vw", height: "400vh"});
                             Router.push("https://www.jemoka.com/posts/kbhproduction_index/");
                         }}><animated.a style={{mixBlendMode: prods.mixBlendMode}}>Production</animated.a></animated.span>

          <animated.span className={styles.navbaritem} id={styles.about} style={as}
                         onMouseEnter={() => asAPI.start({width: "40vw", height: "40vh"})}
                         onMouseLeave={() => asAPI.start({width: "25vw", height: "25vh"})}
                         onClick={()=> {
                             asAPI.start({width: "1000vw", height: "400vh"});
                             Router.push("https://www.jemoka.com/posts/kbhindex/");
                         }}><animated.a style={{mixBlendMode: as.mixBlendMode}}>About</animated.a></animated.span>
        </div>
    );
}

export default function Home() {
    return (
        <div className={styles.home}>
          <Head>
            <link rel="preload" href="/images/Research.gif" as="image"/>
            <link rel="preload" href="/images/Production.gif" as="image"/>
            <link rel="preload" href="/images/Projects.gif" as="image"/>
            <link rel="preload" href="/images/Projects.gif" as="image"/>
          </Head>
          <MainNav />
          <InfoBar />
        </div>
    );
}
