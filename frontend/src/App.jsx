import Signup from "./components/Signup";
import LogIn from "./components/LogIn";
import HomePage from "./components/homePage";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setSocket } from "./redux/socketSlice";
import { setOnlineUser } from "./redux/userSlice";
import NotFound from "./components/notFound";
const router = createBrowserRouter([
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/register",
    element: <Signup />,
  },
  {
    path: "/",
    element: <LogIn />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
function App() {
  const dispatch = useDispatch();

  const { authUser } = useSelector((store) => store.user);
  const { Socket } = useSelector((store) => store.socket);

  useEffect(() => {
    if (authUser) {
      const socketIo = io("https://chat-app-3eav.onrender.com/", {
        query: {
          userId: authUser._id,
        },
      });

      dispatch(setSocket(socketIo));
      socketIo.on("getOnlineUser", (onlineUser) => {
        dispatch(setOnlineUser(onlineUser));
      });
      return () => socketIo.close();
    } else {
      if (Socket) {
        Socket.close();
        dispatch(setSocket(null));
      }
    }
  }, [authUser]);
  return (
    <div className="p-3 h-screen flex items-center justify-center">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
