import { Pane, Card } from 'evergreen-ui';
import React from 'react';
import {Link} from 'react-router-dom';
import '../fonts.css';
import '../App.css';

//component which holds the expanding menu on mobile

export default function MobileMenu({ isShown, setIsShown }) {

  return (
    <Pane
      className="mobile-menu"
      display={isShown ? 'flex' : 'none'}
      flexDirection="column"
      alignItems="left"
      justifyContent="center"
      marginBottom={0}
    >
      <Card
        elevation="1"
        marginY={5}
        padding={20}
        width='80%'
        backgroundColor="#FFFFFF"
        borderRadius="1em"
      >
        <a 
        href="/#form"
        onClick={() => setIsShown(false)}
        style={{textDecoration: "none", color: "#000000"}}
        >
          Report a Swarm
        </a>
      </Card>

      <Card
        elevation="1"
        marginY={5}
        padding={20}
        width='80%'
        backgroundColor="#FFFFFF"
        borderRadius="1em"
      >
        <Link 
          to="https://sacbeekeepers.org/" 
          onClick={() => setIsShown(false)} 
          style={{textDecoration: "none", color: "#000000"}}
          >
            Sacramento Area Beekeepers Association
        </Link>
      </Card>

      <Card
        elevation="1"
        marginY={5}
        padding={20}
        width='80%'
        backgroundColor="#FFFFFF"
        borderRadius="1em"
      >
        <Link 
        to="/about"
        onClick={() => setIsShown(false)}
        style={{textDecoration: "none", color: "#000000"}}
        >
          About us
        </Link>
      </Card>
    </Pane>
  );
}