import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from "./components/login";
import ProfileSettings from './components/ProfileSettings.jsx';
import ProfilePage from './components/ProfilePage.jsx';
import MemoryGame from './components/MemoryGame.jsx';

function App() {
  return (
      <BrowserRouter>
      <Routes>
          <Route path ='/login' element={<Login />} />
          <Route path='/ProfileSettings' element={<ProfileSettings />} />
          <Route path='/ProfilePage' element={<ProfilePage />} />
          <Route path='/MemoryGame' element={<MemoryGame />} />
      </Routes>
      </BrowserRouter>
  );
}
export default App;
