import React, { useState } from "react";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

const CreatePlaylist = () => {
  const [playlistData, setPlaylistData] = useState({
    name: "",
    artists: "",
    imgUrl: "",
    audioUrl: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPlaylistData({ ...playlistData, [name]: value });
  };

  const handleCreatePlaylist = () => {
    localStorage.setItem("playlistData", JSON.stringify(playlistData));
    setPlaylistData({
      name: "",
      artists: "",
      imgUrl: "",
      audioUrl: "",
    });
  };

  return (
    <div className="create-playlist">
      <section className="good">
        <div className="top">
          <IoIosArrowDropleftCircle
            className="arrow-img"
            color="green"
            size={40}
          />
          <IoIosArrowDroprightCircle
            className="arrow-img"
            color="green"
            size={40}
          />
        </div>
      </section>
      <section className="form-section">
        <h1>Create Playlist</h1>
        <form>
          <input
            type="text"
            name="name"
            value={playlistData.name}
            placeholder="Playlist name"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="artists"
            value={playlistData.artists}
            placeholder="Artists name"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="imgUrl"
            value={playlistData.imgUrl}
            placeholder="Img url"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="audioUrl"
            value={playlistData.audioUrl}
            placeholder="Audio url"
            onChange={handleInputChange}
          />
          <button type="button" onClick={handleCreatePlaylist}>
            CREATE
          </button>
        </form>
      </section>
    </div>
  );
};

export default CreatePlaylist;
