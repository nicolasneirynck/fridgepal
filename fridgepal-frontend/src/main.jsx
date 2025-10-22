import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import SearchRecipe from './pages/search-recipe/SearchRecipe.jsx';
import RecipeDetail from './pages/recipe-detail/RecipeDetail.jsx';
import AddRecipe from './pages/add-recipe/AddRecipe.jsx';
import NotFound from './pages/NotFound.jsx';
import './index.css';
import {createBrowserRouter, Navigate} from 'react-router';
import { RouterProvider } from 'react-router/dom';
import Layout from './pages/Layout.jsx';

const router = createBrowserRouter([
  {Component: Layout,
    children:[
      {
        path: '/',
        element: <Navigate to='/search-recipe' replace />,
      },
      {
        path: '/search-recipe',
        Component: SearchRecipe,
      },
      {
        path: '/recipes',
        element: <Navigate to='/' replace />,
      },
      {
        path: 'recipes/:recipeId',
        Component: RecipeDetail,
      },
      {
        path: 'add-recipe',
        Component: AddRecipe,
      },
      {
        path: '*', 
        Component: NotFound ,
      },
    ]},
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    {/*<Recipe/>*/}

  </StrictMode>,
);
