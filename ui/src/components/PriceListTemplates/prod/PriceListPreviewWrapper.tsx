import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import PriceListTemplateWithDatabase from './templates/PriceListTemplateWithDatabase';
import PriceListTemplateAlternative from './templates/PriceListTemplateAlternative';
import Menu from '../../Menu/Menu';

const PriceListPreviewWrapper: React.FC = () => {
  const { pageId } = useParams<{ pageId: string }>();
  const [selectedTemplate, setSelectedTemplate] = useState('database');

  if (!pageId) return <Navigate to="/" replace />;

  const renderTemplate = () => {
    if (selectedTemplate === 'database') {
      return <PriceListTemplateWithDatabase pageId={pageId} previewMode={true} />;
    }
    if (selectedTemplate === 'alternative') {
      return <PriceListTemplateAlternative pageId={pageId} previewMode={true} />;
    }
    return null;
  };

  return (
    <>
<Menu
  selectedTemplate={selectedTemplate}
  onTemplateChange={setSelectedTemplate}
  backgroundColor="#007bff"
  textColor="white"
  isEditorMode={false}
/>

      <div style={{ padding: 20 }}>
        {renderTemplate()}
      </div>
    </>
  );
};

export default PriceListPreviewWrapper;
