import { ADD_FAVORITE, DELETE_FAVORITE, CLEAR_FAVORITE } from "../actions/favoriteAction";
import storageService from "../services/storageService";

const initialState = storageService.getFavorites();

const favoriteReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_FAVORITE:
            if (state.some((favorite) => favorite.id === action.payload.id))
                return state;
            if (state.length >= 10)
                return state;
            return [...state, action.payload];
        case DELETE_FAVORITE:
            return state.filter((favorite) => favorite.id !== action.payload);
        case CLEAR_FAVORITE:
            return [];
        default:
            return state;
    }
};

export default favoriteReducer;