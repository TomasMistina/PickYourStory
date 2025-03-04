import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/HomePage";
import CreateHat from "./Pages/CreateHatPage";
import DrawWords from "./Pages/DrawWordsPage";
import Navbar from "./Components/ui/Navbar";
import ShowcaseHat from "./Pages/ShowcaseHatPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import RequireAuth from "./auth/RequireAuth";
import AllHatThemes from "./Pages/AllHatThemesPage";
import MyHatThemes from "./Pages/MyHatThemesPage";
import EditHat from "./Pages/EditHatPage";
import MyDrawnWords from "./Pages/MyDrawnWordsPage";
import DrawnWords from "./Pages/DrawnWordsPage";
import MentorGroupsPage from "./Pages/MentorGroupsPage";
import ParticipantGroupsPage from "./Pages/ParticipantGroupsPage";
import ParticipantGroupPage from "./Pages/ParticipantGroupPage";
import MentorGroupPage from "./Pages/MentorGroupPage";
import MentorLessonPage from "./Pages/MentorLessonPage";
import ParticipantLessonPage from "./Pages/ParticipantLessonPage";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="page__container">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
            <Route path="/create-hat" element={<CreateHat />} />
            <Route path="/my-drawn-words" element={<MyDrawnWords />} />
            <Route path="/my-drawn-words/:id" element={<DrawnWords />} />
            <Route path="/hat-themes/browse" element={<AllHatThemes />} />
            <Route path="/hat-themes/browse/:id" element={<ShowcaseHat />} />
            <Route path="/hat-themes/my-hats" element={<MyHatThemes />} />
            <Route path="/hat-themes/my-hats/:id" element={<ShowcaseHat />} />
            <Route path="/hat-themes/my-hats/edit/:id" element={<EditHat />} />
            <Route path="/hat-themes/my-hats/draw/:id" element={<DrawWords />} />
            <Route path="/mentored-groups" element={<MentorGroupsPage />} />
            <Route path="/mentored-groups/:id" element={<MentorGroupPage />} />
            <Route path="/mentored-groups/:id/:id" element={<MentorLessonPage />} />
            <Route path="/participant-groups" element={<ParticipantGroupsPage />} />
            <Route path="/participant-groups/:id" element={<ParticipantGroupPage />} />
            <Route path="/participant-groups/:id/:id" element={<ParticipantLessonPage />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
