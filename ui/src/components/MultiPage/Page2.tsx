import React from 'react';
import PriceListTemplateAlternativeDummy from '../PriceListTemplates/dummy/PriceListTemplateAlternativeDummy';


const containerStyle: React.CSSProperties = {
  minHeight: '100vh',
  borderBottom: '1px solid #ccc',
  padding: 20,
  position: 'relative',
  boxSizing: 'border-box',
};

const englishLabelStyle: React.CSSProperties = {
  position: 'absolute',
  right: 20,       // Abstand von rechts
  bottom: 4,       // Abstand von der unteren Linie (borderBottom)
  fontSize: '0.9rem',
  color: '#666',
  fontStyle: 'italic',
};

const Page2 = React.forwardRef<HTMLDivElement>((props, ref) => (
  <div ref={ref} style={containerStyle}>
    <PriceListTemplateAlternativeDummy />
    <div style={englishLabelStyle}>Page 2</div>
  </div>
));

export default Page2;
