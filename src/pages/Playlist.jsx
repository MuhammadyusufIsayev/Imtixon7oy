import React, { useEffect, useState } from "react";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
  IoMdPlayCircle,
} from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { IoArrowDownCircleOutline } from "react-icons/io5";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Playlist = () => {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [likedTrackIndex, setLikedTrackIndex] = useState(null);

  function formatDuration(duration_ms) {
    const minutes = Math.floor(duration_ms / 60000);
    const seconds = Math.floor((duration_ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  useEffect(() => {
    const albumData = localStorage.getItem("selectedAlbum");
    const trackData = localStorage.getItem("tracks");
    const likedTracksData = localStorage.getItem("likedTracks");

    if (albumData) {
      setSelectedAlbum(JSON.parse(albumData));
    }
    if (trackData) {
      setTracks(JSON.parse(trackData));
    }
    if (likedTracksData) {
      setLikedTracks(JSON.parse(likedTracksData));
    }
  }, []);

  const playTrack = (index) => {
    setCurrentTrackIndex(index);
  };

  const handleTrackClick = (previewUrl, index) => {
    localStorage.setItem("currentTrackUrl", previewUrl);
    localStorage.setItem("likedTrackIndex", index);
    setLikedTrackIndex(index);
    window.location.reload();
  };

  const handleHeartClick = (index) => {
    const newLikedTracks = likedTracks.includes(index)
      ? likedTracks.filter((i) => i !== index)
      : [...likedTracks, index];

    localStorage.setItem("likedTracks", JSON.stringify(newLikedTracks));
    setLikedTracks(newLikedTracks);
  };
  
  

  return (
    <div className="playlist">
      <section className="good">
        <div className="top">
          <IoIosArrowDropleftCircle
            className="arrow-img"
            color="#6E7B14"
            size={40}
          />
          <IoIosArrowDroprightCircle
            className="arrow-img"
            color="#6E7B14"
            size={40}
          />
        </div>
        <div className="bottom">
          {selectedAlbum && (
            <div className="playlist-album">
              <img src={selectedAlbum.images[0].url} alt={selectedAlbum.name} />
              <div className="playlist-info">
                <p>PUBLIC PLAYLIST</p>
                <h1>
                  {selectedAlbum.name.length > 10
                    ? `${selectedAlbum.name.slice(0, 10)}  ...`
                    : selectedAlbum.name}
                </h1>
                <p>
                  {selectedAlbum.artists
                    .map((artist) => artist.name)
                    .join(", ")}{" "}
                  <span>and more</span>
                </p>
                <p>
                  <span>Made for</span> {selectedAlbum.artists[0].name} -{" "}
                  <span>{selectedAlbum.total_tracks} songs</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
      <section className="musics">
        <div className="musics-nav">
          <div>
            <IoMdPlayCircle
              onClick={() => playTrack(0)}
              className="play-icon"
              color="#65D36E"
              size={72}
            />
            <CiHeart color="white" size={52} className="heart" />
            <IoArrowDownCircleOutline color="white" size={52} />
            <HiOutlineDotsHorizontal color="white" size={44} />
          </div>
          <div>
            <IoSearchOutline color="white" size={23} />
            <select>
              <option>Custom Order</option>
              <option>A-Z</option>
              <option>Z-A</option>
            </select>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th># Title</th>
              <th>Album</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {tracks.map((track, index) => (
              <tr key={index}>
                <td
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTrackClick(track.preview_url, index);
                  }}
                >
                  {index + 1}
                  <div>
                    <p>
                      {track.name.length > 10
                        ? `${track.name.slice(0, 10)}  ...`
                        : track.name}
                    </p>
                    <span>
                      {track.artists.map((artist) => artist.name).join(", ")}
                    </span>
                  </div>
                </td>
                <td
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTrackClick(track.preview_url, index);
                  }}
                >
                  {track.name}
                </td>
                <td>
                  <div>
                    <CiHeart
                      color={likedTrackIndex === index ? "#65D36E" : "white"}
                      size={23}
                      onClick={() => handleHeartClick(index)}
                    />
                    {formatDuration(track.duration_ms)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Playlist;
