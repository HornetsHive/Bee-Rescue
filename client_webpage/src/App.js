import { Pane } from 'evergreen-ui';
import React from 'react';
import { Routes, Route, Link} from 'react-router-dom';
import './fonts.css';
import './App.css';
import MobileMenu from './components/MobileMenu';
import MobileHeader from './components/MobileHeader';
import Home from './Pages/Home';
import About from './Pages/About';
import Confirm from './Pages/Confirm';


function App(){

  const isMobile = /Mobile/.test(window.navigator.userAgent);
  const [isShown, setIsShown] = React.useState(false)


  return (
    
    <Pane
      className="App"
      display='flex'
      flexDirection='column'
    >

      {/*Mobile/Desktop header*/}
      {isMobile ?
      <Pane className="header" marginY={0} display='flex' flexDirection='column'>
        {/*TODO: Make a logo */}
        {/*<img src="path/to/logo.png" alt="Bee Rescue logo" />*/}
        <img
            src={require("./menuButton.png")}
            alt="Menu"
            onClick={() => setIsShown(!isShown)}
            style={{ width: '30px', height: '30px' }}
        />
        <div className="mobile-header" marginBottom={0 }>
          <MobileMenu isShown={isShown} setIsShown={setIsShown} />
        </div>
      </Pane>
      :
        <Pane className="header" borderRadius='1em'>
          {/*TODO: Make a logo */}
          {/*<img src="path/to/logo.png" alt="Bee Rescue logo" />*/}
          <nav paddingLeft={100}>
            <ul>
              <li><Link to="/">Report a Swarm</Link></li>
              <li><a href="https://sacbeekeepers.org/">Sacramento Area Beekeepers Association</a></li>
              <li><Link to="/about">About us</Link></li>
            </ul>
          </nav>
        </Pane>
      }

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/confirm' element={<Confirm/>} />
      </Routes>
    </Pane>
  );
}

export default App;
