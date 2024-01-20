import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import RootLayout from "./components/layout/RootLayout";
import Home from "./pages/Home/Home";


function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Register />} />

        <Route element={<RootLayout />}>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/message" ></Route>
          <Route path="/notification"></Route>
          <Route path="/setting" ></Route>
        </Route>
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
