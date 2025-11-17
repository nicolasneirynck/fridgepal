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
import { AuthProvider } from './contexts/Auth.context';
import Login from './pages/Login.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Logout from './pages/Logout.jsx';
import Register from './pages/Register.jsx';
import FavoriteRecipes from './pages/FavoriteRecipes.jsx';

const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      // Publieke routes
      {
        path: '/register',
        Component: Register,
      },
      {
        path: '/login',
        Component: Login,
      },
      {
        path: '/logout',
        Component: Logout,
      },
      // Private routes
      {
        Component: PrivateRoute,
        children: [
          {
            index: true,
            element: <Navigate to="/search" replace />, 
          },
          {
            path: '/search',
            Component: SearchRecipe,
          },
          {
            path: '/recipes/:recipeId',
            Component: RecipeDetail,
          },
          {
            path: '/favorites',
            Component: FavoriteRecipes,
          },
          {
            path: '/add-recipe',
            Component: AddOrEditRecipe,
          },
          {
            path: '/recipes/edit/:id',
            Component: AddOrEditRecipe,
          },
        ],
      },
      {
        path: '*',
        Component: NotFound,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
