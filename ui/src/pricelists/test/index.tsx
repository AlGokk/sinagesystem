import React from "react";

const pizzen = [
  { name: "Margherita", preis: 12.5 },
  { name: "Salami", preis: 14.0 },
  { name: "Prosciutto", preis: 15.0 },
  { name: "Funghi", preis: 13.5 },
  { name: "Quattro Stagioni", preis: 16.0 },
  { name: "Diavola", preis: 15.5 },
  { name: "Vegetarisch", preis: 14.0 },
  { name: "Tonno", preis: 16.5 },
  { name: "Hawaii", preis: 15.0 },
  { name: "Calzone", preis: 17.0 },
];

const nudel = [
  { name: "Spaghetti Bolognese", preis: 14.0 },
  { name: "Penne Arrabiata", preis: 13.5 },
  { name: "Tagliatelle al Pesto", preis: 15.0 },
  { name: "Lasagne", preis: 16.0 },
  { name: "Tortellini panna", preis: 15.5 },
];

const kaltgetränke = [
  { name: "Cola", preis: 4.5 },
  { name: "Orangina", preis: 4.5 },
  { name: "Mineralwasser", preis: 3.5 },
  { name: "Apfelsaft", preis: 4.0 },
  { name: "Eistee", preis: 4.5 },
];


const cafe = [
  { name: "Espresso", preis: 3.5 },
  { name: "Cappuccino", preis: 4.5 },
  { name: "Latte Macchiato", preis: 4.5 },
  { name: "Schale Kaffee", preis: 4.0 },
];

const PreislistePizzeria: React.FC = () => {
  const sectionStyle = {
    borderBottom: "2px solid #ccc",
    paddingBottom: "6px",
    marginBottom: "16px",
  };

  const itemStyle = (isLast: boolean) => ({
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: isLast ? "none" : "1px solid #eee",
  });

  const containerStyle = {
    display: "flex",
    justifyContent: "space-between",
    maxWidth: 900,
    margin: "40px auto",
    backgroundColor: "#fff",
    color: "#111",
    fontFamily: "'Montserrat', sans-serif",
    padding: 20,
    borderRadius: 12,
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  };

  const columnStyle = {
    flexBasis: "48%",
  };

  return (
    <div style={containerStyle}>
      {/* Linke Spalte: Pizzen + Nudle */}
      <div style={columnStyle}>
        <section>
          <h2 style={sectionStyle}>Pizzen</h2>
          {pizzen.map((pizza, idx) => (
            <div key={idx} style={itemStyle(idx === pizzen.length - 1)}>
              <span>{pizza.name}</span>
              <span>{pizza.preis.toFixed(2)} CHF</span>
            </div>
          ))}
        </section>

        <section>
          <h2 style={sectionStyle}>Nudle</h2>
          {nudel.map((gericht, idx) => (
            <div key={idx} style={itemStyle(idx === nudel.length - 1)}>
              <span>{gericht.name}</span>
              <span>{gericht.preis.toFixed(2)} CHF</span>
            </div>
          ))}
        </section>
      </div>

      {/* Rechte Spalte: Kaltgetränke + Café */}
      <div style={columnStyle}>
        <section>
          <h2 style={sectionStyle}>Kaltgetränk</h2>
          {kaltgetränke.map((item, idx) => (
            <div key={idx} style={itemStyle(idx === kaltgetränke.length - 1)}>
              <span>{item.name}</span>
              <span>{item.preis.toFixed(2)} CHF</span>
            </div>
          ))}
        </section>

        <section>
          <h2 style={sectionStyle}>Café</h2>
          {cafe.map((item, idx) => (
            <div key={idx} style={itemStyle(idx === cafe.length - 1)}>
              <span>{item.name}</span>
              <span>{item.preis.toFixed(2)} CHF</span>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default PreislistePizzeria;

