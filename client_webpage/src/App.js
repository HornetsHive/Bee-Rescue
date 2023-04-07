import { Pane } from 'evergreen-ui';
import  React, { useEffect } from 'react';
import { Routes, Route, Link, useLocation} from 'react-router-dom';
import './fonts.css';
import './App.css';
import MobileMenu from './components/MobileMenu';
import Home from './Pages/Home';
import About from './Pages/About';
import Confirm from './Pages/Confirm';


function App(){

  const location = useLocation();
  const isMobile = /Mobile/.test(window.navigator.userAgent);
  const [isShown, setIsShown] = React.useState(false)
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    // if not a hash link, scroll to top
    if (hash === '') {
      window.scrollTo(0, 0);
    }
    // else scroll to id
    else {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView();
        }
      }, 0);
    }
  }, [pathname, hash, key]); // do this on route change

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
        <Pane
          className="header"
          width="76%" 
          margin="auto"
          marginBottom="1em"
        >
          {/*TODO: Make a logo */}
          {/*<img src="path/to/logo.png" alt="Bee Rescue logo" />*/}
          <nav paddingLeft={100}>
            <ul>
              {pathname === "/" ? <></>:
                <li><Link to="/">Report a Swarm</Link></li>
              }
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
