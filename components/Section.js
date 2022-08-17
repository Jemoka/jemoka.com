import { useEffect, useState, useRef } from "react";
import { useSpring, animated } from "react-spring";

import styles from "../styles/Section.module.scss";

// Utility to add offsets
// https://stackoverflow.com/questions/288699/get-the-position-of-a-div-span-tag
function getPos(el) {
    // yay readability
    for (var lx=0, ly=0;
         el != null;
         lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
    return {x: lx,y: ly};
}

// This is a section on a page
export default function Section(props) {

    // frame information
    const [getFrame, setFrame] = useState(1);
    // height of the image/frame
    const [height, setHeight] = useState(0);

    // ref to cavas
    const canvasRef = useRef(null);

    // spring to blur, slight difference to make it act later
    // spring to blur text, shifted to make it blur much later
    const delayBlur = (by) => Math.max(((getFrame-props.frameCount*by)/(props.frameCount-props.frameCount*by)), 0);
    const canvasStyle = useSpring({filter: `blur(${0.3*delayBlur(0.3)}em)`});
    const blurStyle = useSpring({
        backdropFilter: `blur(${100*delayBlur(0.6)}px)`,
        backgroundColor: `rgba(255,255,255, ${0.7*delayBlur(0.6)})`,
    });
    const subtitleStyle = useSpring({
        opacity: 1.4*delayBlur(0.95),
    });


    // Image fetch utility
    const currentFrame = index => (
        `${props.sequence}/thumb${index}.png`
    );

    const scrollmagic = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // set height
        setHeight(canvas.offsetHeight);

        // Get the bottom of the doc
        const elem = document.documentElement;
        const scrollBottom = window.innerHeight+elem.scrollTop;
        // Calculate how much is shown
        // if nothing shown, its 0; if all of it has been shown, its
        // the height
        const shown = Math.min(Math.max(scrollBottom-getPos(canvas).y, 0),
                               canvas.offsetHeight);
        // calculate percentage shown
        const scrollFraction = shown/canvas.offsetHeight;
        // get frame
        const F = (Math.min(
            props.frameCount - 2,
            Math.floor(scrollFraction * props.frameCount)
        ))+1;
        // create image
        const img = new Image();
        img.src = currentFrame(F);
        // set!
        setFrame(F);
        // calculate scale-appropriate height
        img.onload = () => {
            context.drawImage(img, 0, 0, img.width, Math.min((img.width/canvas.width)*canvas.height, img.height),
                              0, 0, canvas.width, canvas.height);
        };

    };

    // seed canvas and preload images
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        canvas.width = window.screen.width;
        canvas.height = Math.min(window.screen.width*0.85, 800);

        scrollmagic();

        setHeight(canvas.offsetHeight);

        const preloadImages = () => {
            for (let i = 1; i < frameCount; i++) {
                const img = new Image();
                img.src = currentFrame(i);
            }
        };
    }, []);

    // scrollmagic
    useEffect(() => {
        const onScroll = e => {
            scrollmagic();
        };
        window.addEventListener("scroll", onScroll);
        window.addEventListener("resize", onScroll);

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, [getFrame]);
    
    return (
        <div className={styles.section}>
          <div className={styles.content} style={{height}}>
            <animated.h1 className={styles.sectionCall}
                style={{clipPath: `url(#${props.id})`,
                       ...blurStyle}}>
              <div className={styles.hide}>
                {props.name.split(" ").map(i =>
                    <div x="0" dy="1em">{i}</div>)}
              </div>
              <svg aria-hidden="true" className={styles.hide}>
                <style>
                </style>
                <clipPath id={props.id}>
                  <text x="0" y="0">
                    {props.name.split(" ").map((i, indx) =>
                        <tspan key={indx+props.id}
                               x="0" dy="1em">{i}</tspan>)}
                  </text>
                </clipPath>
              </svg>

            </animated.h1>
            <animated.div className={styles.sectionSub}
                 style={{color: props.color,
                         ...subtitleStyle}}>{props.position}</animated.div>
          </div>
          <animated.canvas ref={canvasRef} className={styles.canvas} style={canvasStyle}/>
        </div>
    );
}

