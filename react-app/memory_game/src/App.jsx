import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from "./components/login";
import ProfileSettings from './components/ProfileSettings.jsx';
import ProfilePage from './components/ProfilePage.jsx';
import MemoryGame from './components/MemoryGame.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import GameHistory from './components/GameHistory.jsx';
import Header from './components/Header.jsx';
import ColorPage from './components/ColorPage.jsx';

function App() {
  return (
      <BrowserRouter>
      <Header />
      <Routes>
          <Route path ='/login' element={<Login />} />
          <Route path='/ProfileSettings' element={<ProfileSettings />} />
          <Route path='/ProfilePage' element={<ProfilePage />} />
          <Route path='/MemoryGame' element={<MemoryGame />} />
          <Route path='/Leaderboard' element={<Leaderboard />} />
          <Route path='/GameHistory' element={<GameHistory />} />
          <Route path='/ColorPage' element={<ColorPage />} />
      </Routes>
      </BrowserRouter>
  );
}
export default App;
