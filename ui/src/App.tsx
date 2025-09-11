import React from 'react';
import './App.css';
import PagesManager from './components/PagesManager/PageManager';
import PriceListTemplateDummy from './components/PriceListTemplates/PriceListTemplateDummy';


const myPageId = '68c308d3c5b64fe319d8277f';

function App() {
  return (
    <div className="App">
      {/* Übergibt die pageId als Prop an PriceListTemplate */}
      <PriceListTemplateDummy pageId={myPageId} />
      {/* Weitere Komponenten auskommentiert, solange nicht benötigt */}
      {/* <PriceList/> */}
      {/* <PagesManager /> */}
    </div>
  );
}

export default App;
