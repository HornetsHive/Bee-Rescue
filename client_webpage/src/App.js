import { Pane } from 'evergreen-ui';
import { Routes, Route, Link} from 'react-router-dom';
import './fonts.css';
import './App.css';
import Home from './Pages/Home';
import About from './Pages/About';

function App(){

  return (
    <div className="App">
      
      {/*Header*/}
      <Pane className="header" borderRadius='1em'>
        <img src="path/to/logo.png" alt="Bee Rescue logo" />
        <nav>
          <ul>
            <li><Link to="/">Report a Swarm</Link></li>
            <li><a href="https://sacbeekeepers.org/">Sacramento Area Beekeepers Association</a></li>
            <li><Link to="/about">About us</Link></li>
          </ul>
        </nav>
      </Pane>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
