import { Routes, Route, BrowserRouter } from "react-router";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile"
import Feed from "./components/Feed";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

const App = () => {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/feed" element={<Feed/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App