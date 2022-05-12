import { useState, createContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query'

import AllBanks from "./components/AllBanks";
import BankDetail from "./components/BankDetail";
import FavouriteBanks from "./components/FavouriteBanks";
import Navbar from "./components/Navbar";

const queryClient = new QueryClient();
export const FavouriteBanksContext = createContext({
favouriteBanksList: [],
setFavouriteBanksList:  () => {},
});

function App() {
  const [bankDetail, setBankDetail] = useState({});
  const [favouriteBanksList, setFavouriteBanksList] = useState(() => {
    const localData = localStorage.getItem('favourite-banks');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem('favourite-banks', JSON.stringify(favouriteBanksList));
  }, [favouriteBanksList])

  return (
    <FavouriteBanksContext.Provider value={{favouriteBanksList, setFavouriteBanksList}}>
      <Router >
        <div className="main-container">
          <QueryClientProvider client={queryClient} contextSharing={true}>
            <Navbar />
            <Routes>
              <Route exact path='/FindBanks' element={<AllBanks setBankDetail={setBankDetail}/>} />
              <Route exact path={`/all-banks/${bankDetail?.ifsc}`} element={<BankDetail bankData={bankDetail} />} />
              <Route element={<FavouriteBanks setBankDetail={setBankDetail}/>} exact  path="/favourites" />
            </Routes>
          </QueryClientProvider>
        </div>
      </Router>
    </FavouriteBanksContext.Provider>
  );
}

export default App;
