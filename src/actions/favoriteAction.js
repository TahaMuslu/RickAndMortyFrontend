import storageService from "../services/storageService";

export const ADD_FAVORITE = "ADD_FAVORITE";
export const DELETE_FAVORITE = "DELETE_FAVORITE";
export const CLEAR_FAVORITE = "CLEAR_FAVORITE";


export const addFavorite = (favorite) => {
    storageService.addFavorite(favorite);
    return {
        type: ADD_FAVORITE,
        payload: favorite
    };
};

export const deleteFavorite = (favorite) => {
    storageService.deleteFavorite(favorite);
    return {
        type: DELETE_FAVORITE,
        payload: favorite
    };
};

export const clearFavorite = () => {
    storageService.clearFavorite();
    return {
        type: CLEAR_FAVORITE,
        payload: null
    };
};