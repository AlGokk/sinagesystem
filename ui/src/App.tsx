import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import PagesManager from "./components/PagesManager/PageManager";
import PriceListPreviewWrapper from "./components/PriceListTemplates/prod/PriceListPreviewWrapper";
import PriceListTemplateSelector from "./components/PriceListTemplates/PriceListTemplateSelector";



const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/edit/68c308d3c5b64fe319d8277f" replace />} />
       <Route path="/pages" element={<PagesManager />} />
      <Route path="/edit/:pageId" element={<PriceListTemplateSelector />} />
      <Route path="/preview/:pageId" element={<PriceListPreviewWrapper />} />
    </Routes>
  </BrowserRouter>
);

export default App;
