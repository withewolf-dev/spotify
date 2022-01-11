import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Poster from "./Poster";
import Search from "./Search";

interface Props {}

const Body = ({ spotifyApi }) => {
  const { data: session } = useSession();
  const accessToken = session.accessToken;
  const [search, setSearch] = useState("");
  const [newReleases, setnewReleases] = useState([]);
  const [searchResult, setsearchResult] = useState([]);
  //console.log(accessToken);

  useEffect(() => {
    if (!accessToken) return;

    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setsearchResult([]);
    if (!accessToken) return;

    spotifyApi.searchTracks(search).then((res) => {
      console.log(res);
    });
  }, [search, accessToken]);

  useEffect(() => {
    if (!accessToken) return;

    spotifyApi.getNewReleases().then((res) => {
      setnewReleases(
        res.body.albums.items.map((track) => {
          return {
            id: track.id,
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: track.images[0].url,
          };
        })
      );
    });
  }, [accessToken]);

  return (
    <section className="bg-black ml-24 py-4 space-y-8 md:max-w-6xl flex-grow md:mr-2.5">
      <Search search={search} setSearch={setSearch} />
      <div className="grid overflow-y-scroll scrollbar-hide h-96 py-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 p-4">
        {searchResult.length === 0 &&
          newReleases.slice(0, 4).map((track) => (
            <Poster
              key={track.id}
              track={track}
              // chooseTrack={chooseTrack}
            />
          ))}
        {searchResult.length !== 0 &&
          searchResult.slice(0, 4).map((track) => (
            <Poster
              key={track.id}
              track={track}
              // chooseTrack={chooseTrack}
            />
          ))}
      </div>
    </section>
  );
};

export default Body;
