class StorageService {

  getFavorites = () => {
    var favorites = localStorage.getItem("favorites");
    var myarray = Array.isArray(JSON.parse(favorites))
      ? JSON.parse(favorites)
      : [];
    return myarray;
  };

  addFavorite = (favorite) => {
    var favorites = this.getFavorites();
    favorites.push(favorite);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  deleteFavorite = (favoriteId) => {
    var favorites = this.getFavorites();
    var newFavorites = favorites.filter((f) => f.id !== favoriteId);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  clearFavorite = () => {
    localStorage.removeItem("favorites");
  };

  changeLanguage = (lang) => {
    localStorage.setItem("rickandmorty-lang", lang);
  };

  getLanguage = () => {
    const lang = localStorage.getItem("rickandmorty-lang");

    return lang ? lang : "tr";
  };

}

const storageService = new StorageService();

export default storageService;
