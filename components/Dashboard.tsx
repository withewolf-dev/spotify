import React from "react";
import SideBar from "./SideBar";

interface Props {}

const Dashboard = (props: Props) => {
  return (
    <main className="flex min-h-screen min-w-max bg-black lg:pb-24">
      <SideBar />
      {/* <Body chooseTrack={chooseTrack} spotifyApi={spotifyApi} />
      <Right chooseTrack={chooseTrack} spotifyApi={spotifyApi} /> */}
    </main>
  );
};

export default Dashboard;
