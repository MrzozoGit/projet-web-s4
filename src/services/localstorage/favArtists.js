export function saveArtist(artist) {
    // Récupérer l'objet favoriteArtists du localStorage, ou initialiser un nouvel objet si non existant
    let favoriteArtists = JSON.parse(localStorage.getItem('favoriteArtists')) || {};

    // Vérifier si l'artiste existe déjà pour éviter les doublons
    if (!favoriteArtists[artist.name]) {
        // Ajouter l'artiste à l'objet favoriteArtists
        favoriteArtists[artist.name] = artist;

        // Sauvegarder l'objet mis à jour dans le localStorage
        localStorage.setItem('favoriteArtists', JSON.stringify(favoriteArtists));
        console.log(`L'artiste ${artist.name} a été ajouté à vos favoris.`);
    } else {
        // L'artiste existe déjà, ne pas l'enregistrer à nouveau
        console.log(`L'artiste ${artist.name} existe déjà dans vos favoris.`);
    }
}

export function deleteArtist(artistName) {
    // Récupérer l'objet favoriteArtists du localStorage
    let favoriteArtists = JSON.parse(localStorage.getItem('favoriteArtists'));

    // Vérifier si l'objet favoriteArtists existe et si l'artiste spécifié est présent
    if (favoriteArtists && favoriteArtists[artistName]) {
        // Supprimer l'artiste de l'objet
        delete favoriteArtists[artistName];

        // Sauvegarder l'objet mis à jour dans le localStorage
        localStorage.setItem('favoriteArtists', JSON.stringify(favoriteArtists));
        console.log(`L'artiste ${artistName} a été retiré de vos favoris.`);
    } else {
        // L'artiste n'existe pas dans les favoris
        console.log(`L'artiste ${artistName} n'existe pas dans vos favoris.`);
    }
}

export function getFavArtists() {
    // Récupérer l'objet favoriteArtists du localStorage
    let favoriteArtists = JSON.parse(localStorage.getItem('favoriteArtists'));

    // Vérifier si l'objet favoriteArtists existe
    if (favoriteArtists) {
        // Retourner l'objet des artistes favoris
        return favoriteArtists;
    } else {
        // Retourner un objet vide ou null si aucun artiste n'est enregistré
        console.log("Aucun artiste favori enregistré.");
        return null;
    }
}