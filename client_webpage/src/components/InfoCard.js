import React from 'react';
import { Card, Heading, Paragraph, majorScale } from 'evergreen-ui';
import '../fonts.css';


//basic holder for text. Props set the heading and body for the panel.
export default function InfoCard ({heading, text}) {
  return(
    <Card style={styles.card} elevation={2}>
          <Heading style={styles.heading}>{heading}</Heading>
          <Paragraph size={500} style={styles.paragraph}>
          {text}
          </Paragraph>
    </Card>
  )
}

const styles = {
  heading: {
    fontFamily: "Comfortaa-Bold"
  },

  card: {
      borderRadius: '1em',
      backgroundColor: "#FFFFFF", 
      margin: majorScale(2), 
      marginTop: majorScale(3),
      padding: majorScale(2),
  },
  
  paragraph: {
      fontFamily: "Louis-George-Cafe",
      color: "#000000",
      margin: majorScale(1),
      textAlign: "left",
  }
};

