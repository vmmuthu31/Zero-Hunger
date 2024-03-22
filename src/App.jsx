import reactLogo from "./assets/react.svg";
import QrReader from "modern-react-qr-reader";
import viteLogo from "/vite.svg";
//import './App.css'
import { Camera } from "react-camera-pro";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { useState, useEffect, createContext, useRef } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
//import API from './API';
//import 'bootstrap-icons/font/bootstrap-icons.css';
import { Alert } from "react-bootstrap";
import Home from "./screens/Home";
import UploadMeal from "./screens/FeedMe/UploadMeal";
import Feedme from "./screens/FeedMe/FeedMe";
import Goals from "./screens/Goals/GoalsPanel";
import Shop from "./screens/Shop/Shop";
import Tips from "./screens/Tips";
import TrySomethingNew from "./screens/FoodOfTheWorld/TrySomethingNew";
import PersonalizeTamagotchi from "./screens/Shop/PersonalizeTamagotchi";
import HitTheGlobe from "./screens/FoodOfTheWorld/HitTheGlobe";
import SelectedGoal from "./screens/Goals/SelectedGoal";
import SelectedGoalsPanel from "./screens/Goals/SelectedGoalsPanel";
import ActivatedGoal from "./screens/Goals/ActivatedGoal";
import CheckGoalsResult from "./screens/Goals/CheckGoalResult";
import FeedMeFeedback from "./screens/FeedMe/FeedMeFeedback";
import SelectedWorldFood from "./screens/FoodOfTheWorld/SelectedWorldFood";



export const UserContext = createContext();

function App() {
  const camera = useRef(null);

  const [data, setData] = useState("No result");
  const [image, setImage] = useState(null);

  const [user, setUser] = useState(null);
  const [coins, setCoins] = useState(250);
  const [exp, setExp] = useState(20);
  const [level, setLevel] = useState(32);
  const [activeItem, setActiveItem] = useState("ClassicCarrot");

  const [initialLoading, setInitialLoading] = useState(true);
  const [dirty, setDirty] = useState(true);
  const [error, setError] = useState("");

  const [initialTutorial, setInitialTutorial] = useState(true);

  const theme = extendTheme({
    colors: {
      turquoise: {
        100: "#f7fafc",
        // ...
        500: "#0CA8C6",
      },
    },
  })

  const handleScan = (data) => {
    setData(data);
  };

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider
          value={{
            user,
            setUser,
            coins,
            setCoins,
            exp,
            setExp,
            level,
            setLevel,
            activeItem,
            setActiveItem,
            initialTutorial,
            setInitialTutorial
          }}
        >
          <ChakraProvider theme={theme}>
            <>
              {error !== "" ? (
                <Alert variant="danger">{error}</Alert>
              ) : (
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/feedme" element={<Feedme />} />
                  <Route path="/uploadmeal" element={<UploadMeal />} />
                  <Route path="/goals" element={<Goals />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/tips" element={<Tips />} />
                  <Route path="/try-something-new" element={<TrySomethingNew />} />
                  <Route path="/personalize-tamagotchi" element={<PersonalizeTamagotchi />} />
                  <Route path="/hit-the-globe" element={<HitTheGlobe />} />
                  <Route path="/selected-goal/:goalID" element={<SelectedGoal />} />
                  <Route path="/selected-goals-panel" element={<SelectedGoalsPanel />} />
                  <Route path="/selected-goals-panel/:goalID" element={<ActivatedGoal />} />
                  <Route path="/check-goal-results/:goalID" element={<CheckGoalsResult />} />
                  <Route path="/feedme-feedback/:meal" element={<FeedMeFeedback />} />
                  <Route path="/selected-world-food/:dishID" element={<SelectedWorldFood />} />





                  <Route path="*" element={<Navigate replace to="/" />} />
                </Routes>
              )}
            </>
          </ChakraProvider>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
