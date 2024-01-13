import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/Register";


function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Register />} />
      </>
    )
  );


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
