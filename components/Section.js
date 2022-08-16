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
    const canvasStyle = useSpring({filter: `blur(${0.4*(getFrame/(props.frameCount*1.25))}em)`});
    // spring to blur text, shifted to make it blur much later
    const delayBlur = Math.max(((getFrame-props.frameCount*0.5)/(props.frameCount-props.frameCount*0.5)), 0);
    const blurStyle = useSpring({
        backdropFilter: `blur(${40*delayBlur}px)`,
        backgroundColor: `rgba(255,255,255, ${0.5*delayBlur})`,
    });

    // Image fetch utility
    const currentFrame = index => (
        `${props.sequence}/thumb${index}.png`
    );

    // seed canvas and preload images
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        canvas.width = window.screen.width;
        canvas.height = Math.min(window.screen.width*0.85, 800);

        const img = new Image();
        img.src = currentFrame(1);
        img.onload = () => {
            context.drawImage(img, 0, 0, img.width, Math.max(Math.min((img.width/canvas.width)*canvas.height, img.height)),
                              0, 0, canvas.width, canvas.height);
        };

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
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        const onScroll = e => {
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
        window.addEventListener("scroll", onScroll);
        window.addEventListener("resize", onScroll);

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, [getFrame]);
    
    return (
        <div className={styles.section}>
          <div className={styles.content} style={{height, justifyContent: props.variant}}>
            <div className={styles.sectionSub}>{props.position}</div>
            <animated.h1 className={styles.sectionCall}
                style={{textAlign: props.variant,
                        clipPath: `url(#${props.id})`,
                       ...blurStyle}}>
              <div className={styles.hide}>{props.name}</div>
              <svg aria-hidden="true" className={styles.hide}>
                <clipPath id={props.id}>
                  <text dominantBaseline="hanging" textAnchor="middle" >{props.name}</text>
                </clipPath>
              </svg>

            </animated.h1>
          </div>
          <animated.canvas ref={canvasRef} className={styles.canvas} style={canvasStyle}/>
        </div>
    );
}

