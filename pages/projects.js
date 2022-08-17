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
                calloutB={<>Here is a list of some of my large projects that I've been working on. It's by no means complete, but it gives you a sense of some of the stuff I enjoy doing. If you'd like, <a href="https://www.jemoka.com/posts/kbhprojects/" className="link">here's a laundry-list</a> of every piece of code that I had spend more than a day writing—but its organized in a much more technical way. <br /> If anything catches your attention while reading, feel free to give it a click!</>}>
            <Section
              id="condution"
              name="The Condution Project"
              position="Co-Founder, Core Developer"
              sequence="/sequences/Condution"
              url="https://www.condution.com/"
              color="#eaedad"
              frameCount={60}
            />
          </Page>
        </div>
    );
}

