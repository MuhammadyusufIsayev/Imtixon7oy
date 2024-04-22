import React, { useEffect, useState } from "react";
import { GoHomeFill } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { LuLibrary } from "react-icons/lu";
import { MdAddBox } from "react-icons/md";
import { BiSolidHeartSquare } from "react-icons/bi";
import { NavLink } from "react-router-dom";

const CLIENT_ID = "c7e84ae4b1c54ca4bdfb4650a78558ef";
const CLIENT_SECRET = "13a38de7ec074e3ca08665667ea5cb8b";

const SideBarLeft = () => {
  const [token, setToken] = useState("");
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);

  useEffect(() => {
    fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
      },
      body: "grant_type=client_credentials",
    })
      .then((response) => response.json())
      .then((data) => setToken(data.access_token))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (token) {
      fetch("https://api.spotify.com/v1/browse/new-releases", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setAlbums(data.albums.items))
        .then(() => console.log(albums))
        .catch((error) => console.error(error));
    }
  }, [token]);
  return (
    <div className="sidebar-l">
      <div className="links">
        <ul>
          <li>
            <NavLink to="/">
              <GoHomeFill size={25} />
              <p>Home</p>
            </NavLink>
          </li>
          <li>
            <FiSearch color="#B3B3B3" size={25} />
            <p>Search</p>
          </li>
          <li>
              <LuLibrary size={25} />
              <p>Your Library</p>
          </li>
          <li>
            <MdAddBox color="#B3B3B3" size={25} />
            <p>Create Playlist</p>
          </li>
          <li>
            <NavLink to="/liked-songs">
              <BiSolidHeartSquare size={25} />
              <p>Liked Songs</p>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="albums">
        {albums.slice(0, 10).map((album) => (
          <div key={album.id} onClick={() => setSelectedAlbumId(album.id)}>
            <p>
              {album.name.length > 25
                ? `${album.name.slice(0, 25)}...`
                : album.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBarLeft;
