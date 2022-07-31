import { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";

import styles from "../styles/Hero.module.scss";

// This is an animated intro hero, which all pages use
export default function Hero(props) {
    // check animated
    const [heroSlided, setHeroSlide] = useState(false);
    const [heroShown, setHeroShown] = useState(true);
    const [heroColored, setHeroColored] = useState(false);
    const [caretShown, setCaretShown] = useState(false);
    // create a spring to animate slide in
    const heroSlide = useSpring({ backgroundColor: props.backgroundColor, // these two are the same because 
                                  color: props.backgroundColor,           // all we want to do is take up space
                                  transform: heroSlided ?
                                  "translateX(-10vw) translateY(-5vw) skew(-5deg) scaleX(1)" :
                                  "translateX(-10vw) translateY(-5vw) skew(-5deg) scaleX(0.1)"});
    const heroColor = useSpring({ backgroundColor: heroColored ?
                                  `${props.backgroundColor}` :
                                  "white"});
    const caretStyle = useSpring({ display: caretShown ? "block" : "none",
                                   color: props.color });

    // On render, animate
    useEffect(() => {
        setHeroSlide(true);
    }, []);

    // on hero slide, we hide hero
    useEffect(() => {
        // if we have slid
        if (heroSlided)
            // we wait a second and fade background in and fade box out
            setTimeout(() => {
                setHeroShown(false);
                setHeroColored(true);
            }, 700);
        
    }, [heroSlided]);

    // after everything, show caret
    useEffect(() => {
        // if we have slid
        if (heroColored)
            // we wait a second and fade background in and fade box out
            setTimeout(() => {
                setCaretShown(true);
            }, 500);
        
    }, [heroColored]);

    return (
        <animated.div className={styles.hero} style={heroColor}>
          <div className={styles.heroCenter}>
            <div className={styles.heroCenterText+" "+styles.heroText}
                 style={{color: props.color}}>&nbsp;{props.tab}&nbsp;</div>
            <animated.div style={heroSlide}
                          className={styles.heroBg+" "+styles.heroText}>&nbsp;{props.tab}&nbsp;
              <animated.i className={styles.caret+" fa-solid fa-caret-down"} style={caretStyle}/>
            </animated.div>
          </div>
        </animated.div>
    );
}

