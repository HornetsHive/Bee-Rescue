import { Pane, UnorderedList, ListItem } from "evergreen-ui";
import InfoCard from "../components/InfoCard";

export default function About() {
  const isMobile = /Mobile/.test(window.navigator.userAgent);

  return (
    <Pane
      flexDirection="row"
      alignContent="center"
      display="flex"
      justifyContent="center"
    >
      <Pane width={isMobile ? "90%" : "50%"} flexDirection="column">
        <InfoCard
          heading="About Us:"
          text={
            <>
              Our website was commissioned by the Sacramento Area Beekeepers
              Association (SABA) and created by Computer Science students from
              California State University, Sacramento as their senior project.
              <br />
              <br />
              The website (as well as the backend server and mobile app which
              connect to it) were written by the Hornet's Hive team over the
              Winter 2022 and Spring 2023 semester. The Hornet's Hive team is a
              group of passionate and driven computer science students from
              Sacramento State who are dedicated to using their technical skills
              to make a positive impact in their community. Throughout the
              development process, our team worked closely with SABA to ensure
              that Bee Rescue is user-friendly, efficient, and effective in its
              mission.
              <br />
              <br />
              At Bee Rescue, we believe in the importance of protecting and
              preserving the essential role that bees play in our ecosystem. Our
              goal is to make it easy for the public to report bee sightings and
              to connect with local beekeepers who can safely and humanely
              collect and relocate them.
              <br />
              <br />
              We understand that encountering a swarm of bees can be
              intimidating, which is why our network of beekeepers is trained to
              handle each situation with care and professionalism. By submitting
              a report through our website, you can trust that you are
              contributing to the well-being of the bees and the environment.
              <br />
              <br />
              Thank you for visiting Bee Rescue. We are committed to making a
              positive impact on the world, one bee at a time.
            </>
          }
        />

        <InfoCard
          heading="The Hornets Hive Team:"
          text={
            <>
              <UnorderedList>
                <ListItem>Kiana Brunberg</ListItem>
                <ListItem>Jarod Cavagnaro</ListItem>
                <ListItem>Sean Hackett</ListItem>
                <ListItem>Dane Leineke</ListItem>
                <ListItem>Steven Maggs</ListItem>
                <ListItem>LJ Matias</ListItem>
                <ListItem>Matthew Smith</ListItem>
                <ListItem>John Wishek</ListItem>
              </UnorderedList>
            </>
          }
        />
      </Pane>
    </Pane>
  );
}
