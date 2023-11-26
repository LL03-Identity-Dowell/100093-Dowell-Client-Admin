import React, { useState, useEffect } from "react";

interface CountryData {
  country: string;
  selectedLayer: number;
}

const CountrySelector: React.FC = () => {
  const countriesData: CountryData[] = [
    { country: "Country A", selectedLayer: 3 },
    { country: "Country B", selectedLayer: 1 },
    { country: "Country D", selectedLayer: 5 },
  ];

  const initializeSelectedLayers = (
    data: CountryData[]
  ): { [key: string]: number } => {
    const initialSelectedLayers: { [key: string]: number } = {};
    data.forEach((item) => {
      initialSelectedLayers[item.country] = item.selectedLayer;
    });
    return initialSelectedLayers;
  };

  const [selectedLayers, setSelectedLayers] = useState<{
    [key: string]: number;
  }>(() => initializeSelectedLayers(countriesData));

  const handleLayerSelect = (country: string, layer: number) => {
    setSelectedLayers((prevState) => ({
      ...prevState,
      [country]: layer,
    }));
  };

  const renderCountryRadios = () => {
    const countries: string[] = [
      "Country A",
      "Country B",
      "Country C",
      "Country D",
      "Country E",
    ];

    return countries.map((country) => {
      const selectedLayer = selectedLayers[country] || null;

      return (
        <div key={country}>
          <p>{country}</p>
          {[1, 2, 3, 4, 5, 6].map((layer) => (
            <label key={layer}>
              <input
                type="radio"
                value={layer}
                checked={selectedLayer === layer}
                onChange={() => handleLayerSelect(country, layer)}
              />
              {layer}
            </label>
          ))}
        </div>
      );
    });
  };

  return (
    <div>
      <h2>Country Selector</h2>
      {renderCountryRadios()}
    </div>
  );
};

export default CountrySelector;
