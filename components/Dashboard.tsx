import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import SpotifyWebApi from "spotify-web-api-node";
import { playingTrackState } from "../atoms/playerAtom";
import Body from "./Body";
import Player from "./Player";
import Right from "./Right";
import SideBar from "./SideBar";
interface Props {}

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  // redirectUri: "http://www.example.com/callback",
});

const Dashboard = (props: Props) => {
  const { data: session } = useSession();
  const { accessToken } = session;

  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);

  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    setShowPlayer(true);
  }, []);

  const chooseTrack = (track) => {
    setPlayingTrack(track);
  };

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken as string);
  }, [accessToken]);

  return (
    <main className="flex min-h-screen min-w-max  lg:pb-24">
      <SideBar />
      <Body spotifyApi={spotifyApi} chooseTrack={chooseTrack} />
      <Right chooseTrack={chooseTrack} spotifyApi={spotifyApi} />

      {showPlayer && (
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <Player accessToken={accessToken} trackUri={playingTrack[`uri`]} />
        </div>
      )}
    </main>
  );
};

export default Dashboard;
