// Fonction générique pour rechercher des animes avec Jikan
async function searchAnime(query) {
  try {
    // URL de l'API avec le query et limit de 25
    const url = `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=25`;

    const response = await fetch(url);
    const data = await response.json();

    // Filtrer éventuellement pour ne garder que ceux qui commencent exactement par la chaîne
    const filtered = data.data.filter(anime =>
      anime.title.toLowerCase().startsWith(query.toLowerCase())
    );

    // Mapper les résultats pour ne retourner que les infos utiles
    const result = filtered.map(anime => ({
      mal_id: anime.mal_id,
      url: anime.url,
      title: anime.title,
      titles: anime.titles, // contient Default, Japanese, English, French si disponible
      image: anime.images?.jpg?.image_url,
      type: anime.type,
      episodes: anime.episodes,
      score: anime.score,
      genres: anime.genres.map(g => g.name)
    }));

    return {
      pagination: data.pagination, // pour infos sur pages
      data: result
    };

  } catch (error) {
    console.error('Erreur API Jikan:', error);
    return null;
  }
}

// Exemple d'utilisation : rechercher les animes qui commencent par "C"
searchAnime("C").then(res => {
  console.log(res);
});








//Pris de l'IA adapté du projet du gars : 
// Ta barre de recherche pour deviner
const guessInput = document.getElementById("search"); 
let debounceTimer;

guessInput.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    const query = guessInput.value.trim();

    if (query.length < 3) return; // On ne cherche pas si moins de 3 lettres

    debounceTimer = setTimeout(async () => {
        try {
            // On limite à 5 résultats pour faire une petite liste de suggestions
            const res = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=5`);
            const { data } = await res.json();
            
            // ICI : Tu affiches les titres dans une liste sous ton input
            console.log("Suggestions pour l'utilisateur :", data.map(a => a.title_english || a.title));
        } catch (err) {
            console.error("Jikan est saturé ou hors-ligne", err);
        }
    }, 400); 
});
