import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalContextProvider } from "./context/GlobalContext";
import Home from "./pages/Home";
import { HomeContextProvider } from "./context/HomeContext";
import NftPage from "./pages/NftPage/NftPage";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      <GlobalContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={<HomeContextProvider children={<Home />} />}
            />
            <Route path="/nft/:id" element={<NftPage />} />
          </Routes>
        </Router>
      </GlobalContextProvider>
    </>
  );
}

export default App;
