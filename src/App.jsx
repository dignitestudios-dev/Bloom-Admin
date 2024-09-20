import { Route, Routes } from "react-router-dom";
import "./App.css";
import Splash from "./pages/Extras/Splash";
import { authRoutes } from "./routes/authRoutes";
import { appRoutes } from "./routes/appRoutes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      {authRoutes?.map((route) => {
        return <Route path={route?.url} element={route?.page} />;
      })}
      {appRoutes?.map((route) => {
        return <Route path={route?.url} element={route?.page} />;
      })}
    </Routes>
  );
}

export default App;
