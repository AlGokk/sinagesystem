import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import MultiPageContainer from "./components/MultiPage/MultipageContainer";




const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/page/1" replace />} />
      <Route path="/page/:pageId" element={<MultiPageContainer />} />
    </Routes>
  </BrowserRouter>
);


export default App;
