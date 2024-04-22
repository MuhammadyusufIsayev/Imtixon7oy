import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoIosArrowDropleftCircle } from "react-icons/io";

const CLIENT_ID = "c7e84ae4b1c54ca4bdfb4650a78558ef";
const CLIENT_SECRET = "13a38de7ec074e3ca08665667ea5cb8b";

const Home = () => {
  const [token, setToken] = useState("");
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);
  const [loading, setLoading] = useState(true);

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
        .then((data) => {
          setAlbums(data.albums.items);
          setLoading(false);
        })
        .catch((error) => console.error(error));
    }
  }, [token]);

  const handleAlbumClick = async (albumId) => {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/albums/${albumId}/tracks`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      localStorage.setItem("tracks", JSON.stringify(data.items));
      localStorage.setItem(
        "selectedAlbum",
        JSON.stringify(albums.find((album) => album.id === albumId))
      );
      window.location.href = "/playlist";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="home">
      <section className="good">
        <div className="top">
          <IoIosArrowDropleftCircle
            className="arrow-img"
            color="#191951"
            size={40}
          />
          <IoIosArrowDroprightCircle
            className="arrow-img"
            color="#191951"
            size={40}
          />
        </div>
        <div className="bottom">
          <h1>Good afternoon</h1>
          {loading && (
            <div className="loading-spinner">
              <ClipLoader color={"white"} loading={true} size={80} />
            </div>
          )}
          <ul>
            {albums.slice(0, 6).map((album) => (
              <li
                key={album.id}
                onClick={() => handleAlbumClick(album.id)}
                className={selectedAlbumId === album.id ? "active" : ""}
              >
                <img src={album.images[1].url} alt="" />
                <p>
                  {album.name.length > 25
                    ? `${album.name.slice(0, 25)}  ...`
                    : album.name}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="albums">
        <div className="mixes">
          <div className="top">
            <h2>Your top mixes</h2>
            <p>SEE ALL</p>
          </div>
          <div className="album-list">
            {albums.slice(0, 4).map((album) => (
              <div
                className="album"
                key={album.id}
                onClick={() => handleAlbumClick(album.id)}
              >
                <img src={album.images[0].url} alt={album.name} />
                <div>
                  <h3>
                    {album.name.length > 25
                      ? `${album.name.slice(0, 25)}  ...`
                      : album.name}
                  </h3>
                  <p>{album.artists.map((artist) => artist.name).join(", ")}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mixes">
          <div className="top">
            <h2>Made for you</h2>
            <p>SEE ALL</p>
          </div>
          <div className="album-list">
            {albums.slice(4, 8).map((album) => (
              <div
                className="album"
                key={album.id}
                onClick={() => handleAlbumClick(album.id)}
              >
                <img src={album.images[0].url} alt={album.name} />
                <div>
                  <h3>
                    {album.name.length > 25
                      ? `${album.name.slice(0, 25)}  ...`
                      : album.name}
                  </h3>
                  <p>{album.artists.map((artist) => artist.name).join(", ")}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mixes">
          <div className="top">
            <h2>Recently played</h2>
            <p>SEE ALL</p>
          </div>
          <div className="album-list">
            {albums.slice(8, 12).map((album) => (
              <div
                className="album"
                key={album.id}
                onClick={() => handleAlbumClick(album.id)}
              >
                <img src={album.images[0].url} alt={album.name} />
                <div>
                  <h3>
                    {album.name.length > 25
                      ? `${album.name.slice(0, 25)}  ...`
                      : album.name}
                  </h3>
                  <p>{album.artists.map((artist) => artist.name).join(", ")}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mixes">
          <div className="top">
            <h2>Jump back in</h2>
            <p>SEE ALL</p>
          </div>
          <div className="album-list">
            {albums.slice(12, 16).map((album) => (
              <div
                className="album"
                key={album.id}
                onClick={() => handleAlbumClick(album.id)}
              >
                <img src={album.images[0].url} alt={album.name} />
                <div>
                  <h3>
                    {album.name.length > 25
                      ? `${album.name.slice(0, 25)}  ...`
                      : album.name}
                  </h3>
                  <p>{album.artists.map((artist) => artist.name).join(", ")}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mixes">
          <div className="top">
            <h2>Uniquely yours</h2>
            <p>SEE ALL</p>
          </div>
          <div className="album-list">
            {albums.slice(16).map((album) => (
              <div
                className="album"
                key={album.id}
                onClick={() => handleAlbumClick(album.id)}
              >
                <img src={album.images[0].url} alt={album.name} />
                <div>
                  <h3>
                    {album.name.length > 25
                      ? `${album.name.slice(0, 25)}  ...`
                      : album.name}
                  </h3>
                  <p>{album.artists.map((artist) => artist.name).join(", ")}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

{
  /* <ul>
        {tracks.map((track) => (
          <li key={track.id}>
            <p>{track.name}</p>
            <audio src={track.preview_url} controls></audio>
          </li>
        ))}
      </ul> */
}
