import React from 'react';
import { Card, Heading, Paragraph, majorScale } from 'evergreen-ui';
import '../fonts.css';

export default class InfoCard extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return(
        <Card style={styles.card}>
              <Heading style={styles.heading}>{this.props.heading}</Heading>
              <Paragraph size={500} style={styles.paragraph}>
              {this.props.text}
              </Paragraph>
        </Card>
      )
    }
}

const styles = {
  heading: {
    fontFamily: "Comfortaa-Bold"
  },

  card: {
      elevation: '1',
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
      size: 500, //this doesn't do anything change size in render. (??)
      textAlign: "left",
  }
};

