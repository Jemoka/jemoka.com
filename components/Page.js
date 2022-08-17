import { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";

import styles from "../styles/Page.module.scss";

import Head from "next/head";

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
        </>
    );
}

