import React, { useEffect, useState } from "react";

const LikedSongs = () => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const likedTracksData = localStorage.getItem("likedTracks");

    if (likedTracksData) {
      const likedTracksIndexes = JSON.parse(likedTracksData);
      const allTracks = JSON.parse(localStorage.getItem("tracks"));
      const likedTracks = likedTracksIndexes.map((index) => allTracks[index]);
      setTracks(likedTracks);
    }
  }, []);

  return (
    <div className="liked-tracks-page">
      <h2>Liked Tracks</h2>
      <ul>
        {tracks.map((track, index) => (
          <li key={index}>
            <p>{track.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LikedSongs;
