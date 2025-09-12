import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import PriceListTemplateWithDatabase from "./components/PriceListTemplates/PriceListTemplateWithDatabase";
import PriceListTemplateDummy from "./components/PriceListTemplates/PriceListTemplateDummy";

const PriceListWrapper: React.FC = () => {
  const { pageId } = useParams<{ pageId: string }>();
  if (!pageId) return <Navigate to="/" replace />;
  const isProd = process.env.REACT_APP_PROD === "true";
  if (isProd)
    return <PriceListTemplateWithDatabase pageId={pageId} previewMode={false} />;
  return <PriceListTemplateDummy pageId={pageId} previewMode={false} />;

};

const PriceListPreviewWrapper: React.FC = () => {
  const { pageId } = useParams<{ pageId: string }>();
  if (!pageId) return <Navigate to="/" replace />;
  const isProd = process.env.NODE_ENV === "production";
  if (isProd)
    return <PriceListTemplateWithDatabase pageId={pageId} previewMode={true} />;
  return <PriceListTemplateDummy pageId={pageId} previewMode={true} />;
};

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/edit/68c308d3c5b64fe319d8277f" replace />} />
      <Route path="/edit/:pageId" element={<PriceListWrapper />} />
      <Route path="/preview/:pageId" element={<PriceListPreviewWrapper />} />
    </Routes>
  </BrowserRouter>
);

export default App;
