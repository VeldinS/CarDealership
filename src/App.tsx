import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Playground from "./routes/test/Playground";
import LandingPage from "./routes/LandingPage";
import AdminPanel from "./components/admin-panel/AdminPanel";
import AdminPanelLobby from "./components/admin-panel/AdminPanelLobby";
import Oglasi from "./components/admin-panel/Oglasi";
import NewAd from "./components/admin-panel/NewAd";
import EditAd from "./components/admin-panel/EditAd";
import Announcements from "./components/admin-panel/Announcements";
import EditDataLobby from "./components/admin-panel/EditDataLobby";
import EditManufacturers from "./components/admin-panel/edit data/EditManufacturers";
import AdvancedSearch from "./components/app/AdvancedSearch";
import Sales from "./components/app/Sales";
import AppOutlet from "./components/app/AppOutlet";
import ViewAd from "./components/app/ViewAd";
import MyAccount from "./components/app/MyAccount";
import NotFound from "./components/common/NotFound";
import Offers from "./components/admin-panel/Offers";
import AdminLogin from "./components/admin-panel/AdminLogin";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<LandingPage/>}/>
                <Route path={"app"} element={<AppOutlet/>}>
                    <Route path={"playground"} element={<Playground/>}/>
                    <Route path={"pretraga"} element={<AdvancedSearch/>}/>
                    <Route path={"prodaja"} element={<Sales/>}/>
                    <Route path={"prodaja/:id"} element={<ViewAd/>}/>
                    <Route path={"mojprofil"} element={<MyAccount/>}/>
                </Route>

                <Route path={"admin"} element={<AdminPanel/>}>
                    <Route index element={<AdminPanelLobby/>}/>
                    <Route path={"oglasi"} element={<Oglasi/>}/>
                    <Route path={"novi"} element={<NewAd/>}/>
                    <Route path={":id"} element={<EditAd/>}/>
                    <Route path={"ponude"} element={<Offers/>}/>
                    <Route path={"saopstenja"} element={<Announcements/>}/>
                    <Route path={"uredipodatke"}>
                        <Route index element={<EditDataLobby/>}/>
                        <Route path={"proizvodjaci"} element={<EditManufacturers/>}/>
                        <Route path={"modeli"}/>
                        <Route path={"boje"}/>
                        <Route path={"goriva"}/>
                        <Route path={"tipovi"}/>
                    </Route>
                </Route>
                <Route path={"login"} element={<AdminLogin/>}/>
                <Route path="*" element={<NotFound/>} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
