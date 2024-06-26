import React from "react";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SideBarLeft from "./components/SideBarLeft";
import SideBarRight from "./components/SideBarRight";
import "./style/style.scss";
import LikedSongs from './pages/LikedSongs';
import Playlist from './pages/Playlist';
import Error from "./pages/Error";
import AudioBar from "./components/AudioBar";
import CreatePlaylist from "./pages/CreatePlaylist";

const App = () => {
  return (
    <div className="App">
      <Router>
        <SideBarLeft />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/liked" element={<LikedSongs />} />
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/create-playlist" element={<CreatePlaylist />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <SideBarRight />
        <AudioBar />
      </Router>
    </div>
  );
};

export default App;
