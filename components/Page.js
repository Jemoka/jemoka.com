import { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";

import styles from "../styles/Page.module.scss";

import Head from "next/head";

import Router from 'next/router';

// This is an animated intro hero, which all pages use
export default function Page(props) {
    // check animated
    const [heroSlided, setHeroSlide] = useState(false);
    const [heroShown, setHeroShown] = useState(false);
    const [heroColored, setHeroColored] = useState(false);
    const [caretShown, setCaretShown] = useState(false);
    // create a spring to animate slide in
    const heroSlide = useSpring({ backgroundColor: props.backgroundColor, // these two are the same because 
                                  color: props.backgroundColor,           // all we want to do is take up space
                                  transform: heroSlided ?
                                  "skew(-5deg) scaleX(1)" :
                                  "skew(-5deg) scaleX(0.1)"});
    const heroColor = useSpring({ backgroundColor: heroColored ?
                                  `${props.backgroundColor}` :
                                  "white"});
    const caretStyle = useSpring({ display: caretShown ? "block" : "none",
                                   color: props.color });
    const bodyStyle = useSpring({ opacity: heroShown ? 1 : 0});


    // On render, animate
    useEffect(() => {
        // window.scrollTo(0, 0);
        setHeroSlide(true);
    }, []);

    // on hero slide, we hide hero
    useEffect(() => {
        // if we have slid
        if (heroSlided)
            // we wait a second and fade background in and fade box out
            // and we wait another to fade the content in
            setTimeout(() => {
                setHeroColored(true);
                setCaretShown(true);
                setTimeout(() => {
                    setHeroShown(true);
                }, 700);
            }, 700);
        
    }, [heroSlided]);

    return (
        <>
          <animated.div className={styles.hero} style={heroColor}>
            <div className={styles.header} onClick={()=>Router.push("/")}>
              <span id="uname">jemoka.com</span>
              <br />
              <span>
                <span id="name" className="font-bold">Houjun Liu</span>
              </span>
            </div>
            <div className={styles.heroCenter}>
              <animated.div style={heroSlide}
                            className={styles.heroBg+" "+styles.heroText}>&nbsp;{props.tab}&nbsp;

              </animated.div>
              <div className={styles.heroCenterText+" "+styles.heroText}
                   style={{color: props.color}}>&nbsp;{props.tab}&nbsp;</div>
            </div>
          </animated.div>
          <animated.i className={styles.caret+" fa-solid fa-caret-down"} style={caretStyle} onClick={(e) => {
              window.scroll({
                  top: window.innerHeight*0.75,
                  behavior: 'smooth'
              });
          }}/>
          <animated.div
            style={bodyStyle}>
            <div className={styles.callout}>
              <p style={{fontWeight: 600}}>{props.calloutA}</p>
              <p style={{fontWeight: 500}}>{props.calloutB}</p>
            </div>
            {props.children}
          </animated.div>
          <div className={styles.bottom}
               style={{backgroundColor: props.backgroundColor,
                       color: props.color}}>
            <div>
              🙌&nbsp;&nbsp;<span className="font-bold">Thanks for visiting!</span>
              &nbsp;
              <div id="socialpanel" style={{transform: "scale(0.9) translateY(3px)"}}>
                <a href="https://www.jemoka.com/search/" style={{borderRight: 0, marginRight: 0, paddingRight: 0}}
                   className="header-social" id="header-search"><i className="ic fa-solid fa-magnifying-glass" /></a>
                <a href="https://github.com/Jemoka/" className="header-social" id="header-github"><i className="ic fa-brands fa-github" /></a>
                <a href="https://twitter.com/jemokajack" className="header-social" id="header-twitter"><i className="ic fa-brands fa-twitter" /></a>
                <a href="https://www.reddit.com/user/Jemoka/" className="header-social" id="header-reddit"><i className="ic fa-brands fa-reddit" /></a>
              </div>
              <div>
                <a onClick={()=>Router.push("/")} className="link" style={{borderColor: "var(--green)"}}>Projects</a> / &nbsp;
                <a href="https://www.jemoka.com/posts/kbhresearch_index/" className="link" style={{borderColor: "var(--blue)"}}>Research</a> / &nbsp;
                <a href="https://www.jemoka.com/posts/kbhproduction_index/" className="link" style={{borderColor: "var(--red)"}}>Production</a> / &nbsp;
                <a href="https://www.jemoka.com/posts/kbhindex/" className="link" style={{borderColor: "var(--yellow)"}}>About</a>
              </div>
            </div>
          </div>
        </>
    );
}

