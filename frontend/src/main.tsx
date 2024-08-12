import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/Home'
import Play from './pages/Play'
import './index.css'


const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>
    },
    {
      path: "/play",
      element: <Play/>
    },
]);

createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
)
