import { ADD_FAVORITE, DELETE_FAVORITE, CLEAR_FAVORITE } from "../actions/favoriteAction";
import storageService from "../services/storageService";

const initialState = storageService.getFavorites();

const favoriteReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_FAVORITE:
            storageService.addFavorite(action.payload);
            return [...state, action.payload];
        case DELETE_FAVORITE:
            storageService.deleteFavorite(action.payload);
            return state.filter((favorite) => favorite.id !== action.payload.id);
        case CLEAR_FAVORITE:
            storageService.clearFavorite(action.payload);
            return [];
        default:
            return state;
    }
};

export default favoriteReducer;