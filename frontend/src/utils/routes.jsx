import { Navigate} from "react-router";
import { Home, Login, NotFoundPage, Profile, Settings, Signup } from "../pages";

export let routes = (authUser) => ([
  {
    path: "/",
    element: authUser ? <Home /> : <Navigate to="/login" replace />,
  },
  {
    path: "/signup",
    element: !authUser ? <Signup /> : <Navigate to="/" replace />,
  },
  {
    path: "/login",
    element: !authUser ? <Login /> : <Navigate to="/" replace />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/profile",
    element: authUser ? <Profile /> : <Navigate to="/login" replace />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
])

export let validPathsForNavbarRender = ["/", "/profile", "/settings", "/signup", "/login"]
