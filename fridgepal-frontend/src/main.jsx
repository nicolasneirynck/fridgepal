import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import SearchRecipe from './pages/search-recipe/SearchRecipe.jsx';
import RecipeDetail from './pages/recipe-detail/RecipeDetail.jsx';
import AddOrEditRecipe from './pages/add-recipe/AddOrEditRecipe.jsx';
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
        element: <Navigate to='/search' replace />,
      },
      {
        path: '/search',
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
        Component: AddOrEditRecipe, 
      },
      {
        path: 'recipes/edit/:id',
        Component: AddOrEditRecipe, 
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
  </StrictMode>,
);
