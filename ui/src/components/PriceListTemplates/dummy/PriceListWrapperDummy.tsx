import React, { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import PriceListTemplateDummy from "./PriceListTemplateDummy";
import PriceListTemplateAlternativeDummy from "./PriceListTemplateAlternativeDummy";
import Menu from "../../Menu/Menu";

const PriceListWrapper: React.FC = () => {
  const { pageId } = useParams<{ pageId: string }>();
  const [selectedTemplate, setSelectedTemplate] = useState("database");

  if (!pageId) return <Navigate to="/" replace />;

  const renderTemplate = () => {
    if (selectedTemplate === "database") {
      return <PriceListTemplateDummy pageId={pageId} previewMode={false} />;
    }
    if (selectedTemplate === "alternative") {
      return <PriceListTemplateAlternativeDummy pageId={pageId} previewMode={false} />;
    }
    return null;
  };

  return (
    <>
<Menu
  selectedTemplate={selectedTemplate}
  onTemplateChange={setSelectedTemplate}
  backgroundColor="orange"
  textColor="black"
  isEditorMode={true} // Editor-Modus anzeigen
/>


      <div style={{ padding: 20 }}>
        {renderTemplate()}
      </div>
    </>
  );
};

export default PriceListWrapper;
