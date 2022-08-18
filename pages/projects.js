import Page from "../components/Page.js";
import Section from "../components/Section.js";

import styles from "../styles/Projects.module.scss";

export default function Projects() {
    return (
        <div>
          <Page tab="Projects"
                color="white"
                backgroundColor="var(--green)"
                calloutA="Hello there! Thanks for stopping by."
                calloutB={<>Here are some of the projects that I've been working on. It's by no means complete, but it gives you a sense of some of the stuff I enjoy doing. If you'd like, <a href="https://www.jemoka.com/posts/kbhprojects/" className="link">this is a laundry-list</a> of every piece of code that I had spend more than a day writing—but its organized in a much more technical way. <br /> If anything catches your attention while reading, feel free to give it a click!</>}>
            <Section
              id="condution"
              title="The Condution Project"
              subtitle="Supercharged to-do lists"
              position="Co-Founder, Core Developer"
              sequence="/sequences/Condution"
              url="https://www.condution.com/"
              titleColorHint="255,255,255"
              subtitleColor="#809ac2"
              positionColor="#eaedad"
              frameCount={60}
            />
            <Section
              id="modap"
              title="MODAP"
              subtitle="Accessible early fire detection"
              position="Project Lead"
              sequence="/sequences/MODAP"
              url="https://github.com/MODAP/stack"
              titleColorHint="247,241,237"
              subtitleColor="rgb(201,242,212)"
              positionColor="rgb(196,82,53)"
              frameCount={49}
            />
            <Section
              id="batchalign"
              title="CMU TalkBank Batchalign"
              subtitle="Automatic clinical speech analysis"
              position="Author"
              sequence="/sequences/MFA"
              url="https://github.com/TalkBank/batchalign"
              titleColorHint="171,41,51"
              subtitleColor="rgb(194,242,206)"
              positionColor="rgb(250,227,233)"
              frameCount={35}
            />
            <Section
              id="research"
              title="Independent Published Research"
              subtitle="NLP and Science Education"
              position=""
              sequence="/sequences/Dictembeds"
              url="https://www.jemoka.com/posts/kbhresearch_index/"
              titleColorHint="75,94,11"
              subtitleColor="rgb(36,46,93)"
              positionColor="rgb(59,134,137)"
              frameCount={39}
            />
            <Section
              id="music"
              title="Music Production"
              subtitle="Classically trained pianist"
              position="...but actually doing EDM"
              sequence="/sequences/Music"
              url="https://linktr.ee/jemoka"
              titleColorHint="248,255,237"
              subtitleColor="rgb(122,255,220)"
              positionColor="rgb(138,255,163)"
              frameCount={48}
            />
            <Section
              id="production"
              title="Content Creation"
              subtitle="Video, Podcast, and Writing"
              sequence="/sequences/Film"
              url="https://www.jemoka.com/posts/kbhproduction_index/"
              titleColorHint="248,255,237"
              subtitleColor="rgb(192,235,124)"
              positionColor="rgb(192,235,124)"
              frameCount={42}
            />

          </Page>
        </div>
    );
}

