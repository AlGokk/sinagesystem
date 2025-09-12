import React from 'react';
import PriceListWrapperDummy from './dummy/PriceListWrapperDummy';
import PriceListWrapper from './PriceListWrapper';

const PriceListTemplateSelector: React.FC<{ previewMode?: boolean }> = () => {
  if (process.env.REACT_APP_PROD === 'true') {
    console.log('In Production..')
    return <PriceListWrapper />;
  }
    console.log('In Dev..')
  // dev or test mode
  return <PriceListWrapperDummy />;
};

export default PriceListTemplateSelector;
