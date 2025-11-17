import { getFavorites } from '../api';
import RecipeCardList from './search-recipe/RecipeCardList';
import AsyncData from '../components/AsyncData';
import useSWR from 'swr';

export default function FavoriteRecipes(){
  const {
    data: favorites = [],
    isLoading: favoritesLoading,
    error: favoritesError,
  } = useSWR(
    'favorites',
    () => getFavorites(),
  );
  return(
    <AsyncData loading={favoritesLoading} error={favoritesError}>
      {!favoritesError
        ?(<RecipeCardList 
          recipes={favorites}
          showFavoriteToggle={true}/>)
        :null}
    </AsyncData>
  );
}