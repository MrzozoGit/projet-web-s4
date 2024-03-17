// website to avoid cors: https://cors-anywhere.herokuapp.com/corsdemo

var lastfmData = {
    baseURL: "https://ws.audioscrobbler.com/2.0/",
    api_key: "2be6786fceb431023c516743e950c3d1",
    additional: "&format=json"
  };

var spotifyData = {
    token: "BQBAJIaNvwF73CelPwVxwJcOqSAV5wJX_8y2ESp0g0dnjTfiSxEUCH7qWBwmja06W_q6H7dW9T25M9o9pZhjNagoNn9u621RvXYytbw74Xq28PaVKUE"
}

const corsBypass = "https://cors-anywhere.herokuapp.com/";

async function getSpotifyToken() {
    const resSpotify = await fetch(corsBypass + "https://open.spotify.com/get_access_token?reason=transport&productType=web_player", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res = res.json());
    spotifyData.token = resSpotify.accessToken;
}
await getSpotifyToken();

export async function getSampleArtistsList() {
    return [
        {name:"underscores"},
        {name:"drive45"},
        {name:"kero kero bonito"},
        {name:"100gecs"},
        {name:"porter robinson"},
        {name:"snorunt"},
        {name:"men i trust"},
        {name:"pinkpantheress"},
        {name:"steve reich"},
        {name:"frost children"},
        {name:"alice longyu gao"},
        {name:"nujabes"}
    ];
}

export async function getArtistImage(artist) {
    // Lastfm doesn't give access to artists images, so I use the Spotify API just for that.
    const urlSpotify = "https://api.spotify.com/v1/search?type=artist&q=" + artist + "&decorate_restrictions=false&best_match=true&include_external=audio&limit=1";
    const resSpotify = await fetch(urlSpotify, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + spotifyData.token
        }
    }).then(res => res = res.json());
    
    return resSpotify.best_match.items[0].images.length > 0 ? resSpotify.best_match.items[0].images[0].url : "https://freepngimg.com/thumb/cat/1-2-cat-png-2.png";
}

export async function getArtistInfo(artist) {
    artist = encodeURIComponent(artist);

    // Get artists datas from Lastfm API
    const urlLastfm = lastfmData.baseURL + "?method=artist.getinfo&artist=" + artist + "&api_key=" + lastfmData.api_key + lastfmData.additional + "&limit=1";
    const resLastfm = await fetch(urlLastfm, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }).then(res => res = res.json());

    return {
        name: resLastfm.artist.name,
        lastfmUrl: resLastfm.artist.url,
        img: await getArtistImage(artist),
        bio: {
            content: resLastfm.artist.bio.content,
            summary: resLastfm.artist.bio.summary
        },
        similar: resLastfm.artist.similar,
        globalStats: resLastfm.artist.stats,
        tags: resLastfm.artist.tags
    };
}

export async function getArtists(user, nbOfArtists) {
    const urlLastfm = lastfmData.baseURL + "?method=user.gettopartists&user=" + user + "&api_key=" + lastfmData.api_key + lastfmData.additional + "&limit=" + nbOfArtists;
    const resLastfm = await fetch(urlLastfm, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }).then(res => res = res.json());

    if(resLastfm.error) throw resLastfm.message; 

    const artists = resLastfm.topartists.artist.map(artist => ({ name: artist.name, playcount: artist.playcount }));

    let topArtists = [];

    artists.forEach(async (artist, index) => {
        let data = await getArtistInfo(artist.name);
        data.rank = index;
        data.userStats = {
            playcount: artist.playcount
        };
        topArtists.push(data);
    })

    return topArtists;
}

export async function getLastPlayerTrack(user) {
    const urlLastfm = lastfmData.baseURL + "?method=user.getrecenttracks&user=" + user + "&api_key=" + lastfmData.api_key + lastfmData.additional + "&limit=1";
    const resLastfm = await fetch(urlLastfm, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }).then(res => res = res.json());
}

export async function getUserInfos(user) {
    const urlLastfm = lastfmData.baseURL + "?method=user.getinfo&user=" + user + "&api_key=" + lastfmData.api_key + lastfmData.additional;
    const resLastfm = await fetch(urlLastfm, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }).then(res => res = res.json());

    const userDatas = {
        realname: resLastfm.user.realname,
        country: resLastfm.user.country,
        image: resLastfm.user.image[2]["#text"],
        stats: {
            album_count: resLastfm.user.album_count,
            artist_count: resLastfm.user.artist_count,
            track_count: resLastfm.user.track_count,
            playcount: resLastfm.user.playcount
        }
    }

    return userDatas;
}