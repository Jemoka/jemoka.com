import Hero from "../components/Hero.js";
import Section from "../components/Section.js";

export default function Projects() {
    return (
        <div>
          <Hero tab="Projects" color="white" backgroundColor="var(--green)"/>
          <Section
            name="The Condution Project."
            position="Co-Founder, Core Developer"
            variant="right"
            sequence="/sequences/Condution"
            frameCount={48}
          />
          <div>ho</div>
        </div>
    );
}

