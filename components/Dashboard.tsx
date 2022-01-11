import React from "react";
import SpotifyWebApi from "spotify-web-api-node";
import Body from "./Body";
import SideBar from "./SideBar";
interface Props {}

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  // redirectUri: "http://www.example.com/callback",
});

const Dashboard = (props: Props) => {
  return (
    <main className="flex min-h-screen min-w-max  lg:pb-24">
      <SideBar />
      <Body spotifyApi={spotifyApi} />
      {/* <Body chooseTrack={chooseTrack} spotifyApi={spotifyApi} />
      <Right chooseTrack={chooseTrack} spotifyApi={spotifyApi} /> */}
    </main>
  );
};

export default Dashboard;
