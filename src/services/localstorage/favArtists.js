
// Save artist into the localStorage
export function saveArtist(artist) {
    // Retrieve favoriteArtists object from localStorage, or initialize a new object if none exists
    let favoriteArtists = JSON.parse(localStorage.getItem('favoriteArtists')) || {};

    // Check if the artist already exists to avoid duplicates
    if (!favoriteArtists[artist.name]) {
        // Add artist to favoriteArtists object
        favoriteArtists[artist.name] = artist;

        // Save updated object in localStorage
        localStorage.setItem('favoriteArtists', JSON.stringify(favoriteArtists));
        console.log(`${artist.name} has been added to your favorites.`);
    } else {
        // Artist already exists, do not register again
        console.log(`${artist.name} already exists in your favorites.`);
    }
}

// Delete artist from the localStorage
export function deleteArtist(artistName) {
    // Retrieve favoriteArtists object from localStorage
    let favoriteArtists = JSON.parse(localStorage.getItem('favoriteArtists'));

    // Check if the favoriteArtists object exists and if the specified artist is present
    if (favoriteArtists && favoriteArtists[artistName]) {
        // Remove artist from object
        delete favoriteArtists[artistName];

        // Save updated object in localStorage
        localStorage.setItem('favoriteArtists', JSON.stringify(favoriteArtists));
        console.log(`${artistName} has been removed from your favorites.`);
    } else {
        // The artist does not exist in favorites
        console.log(`${artistName} does not exist in your favorites.`);
    }
}

// Get artist from the localStorage
export function getFavArtists() {
    // Retrieve favoriteArtists object from localStorage
    let favoriteArtists = JSON.parse(localStorage.getItem('favoriteArtists'));

    // Check if favoriteArtists object exists
    if (favoriteArtists) {
        // Return the object of favorite artists
        return favoriteArtists;
    } else {
        // Return an empty object or null if no artist is registered
        console.log("No favorite artist recorded.");
        return null;
    }
}