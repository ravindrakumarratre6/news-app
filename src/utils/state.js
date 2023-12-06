import React, { createContext, useReducer } from 'react';

const initialState = {
  news: [],
  user: null,
  favorites: [],
};

const StateContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_NEWS':
      // Add isFavorite property to each news article
      const newsWithFavorites = action.payload.map(article => ({
        ...article,
        isFavorite: state.favorites.some(favorite => favorite.title === article.title),
      }));
      return { ...state, news: newsWithFavorites };

    case 'SET_USER':
      return { ...state, user: action.payload };

    case 'ADD_TO_FAVORITES':
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
        news: state.news.map(article =>
          article.title === action.payload.title
            ? { ...article, isFavorite: true }
            : article
        ),
      };

    case 'REMOVE_FROM_FAVORITES':
      return {
        ...state,
        favorites: state.favorites.filter(favorite => favorite.title !== action.payload.title),
        news: state.news.map(article =>
          article.title === action.payload.title
            ? { ...article, isFavorite: false }
            : article
        ),
      };

    default:
      return state;
  }
};

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

export { StateContext, StateProvider };
