import React, { useState, useEffect } from "react";

interface CityData {
  city: string;
  selectedLayer: number;
}

interface CountryData {
  country: string;
  selectedLayer: number;
  cities: CityData[];
}

const CountrySelector: React.FC = () => {
  const countriesData: CountryData[] = [
    {
      country: "Country A",
      selectedLayer: 3,
      cities: [
        { city: "City 1", selectedLayer: 2 },
        { city: "City 2", selectedLayer: 4 },
      ],
    },
    {
      country: "Country B",
      selectedLayer: 1,
      cities: [
        { city: "City 3", selectedLayer: 5 },
        { city: "City 4", selectedLayer: 3 },
      ],
    },
    {
      country: "Country D",
      selectedLayer: 5,
      cities: [
        { city: "City 5", selectedLayer: 1 },
        { city: "City 6", selectedLayer: 6 },
      ],
    },
  ];

  const initializeSelectedLayers = (
    data: CountryData[]
  ): { [key: string]: { [key: string]: number } } => {
    const initialSelectedLayers: { [key: string]: { [key: string]: number } } =
      {};

    data.forEach((country) => {
      const cityLayers: { [key: string]: number } = {};
      country.cities.forEach((city) => {
        cityLayers[city.city] = city.selectedLayer;
      });
      initialSelectedLayers[country.country] = {
        ...cityLayers,
        __country__: country.selectedLayer, // Retaining country's selected layer
      };
    });

    return initialSelectedLayers;
  };

  const [selectedLayers, setSelectedLayers] = useState<{
    [key: string]: { [key: string]: number };
  }>(() => initializeSelectedLayers(countriesData));
  console.log({ selectedLayers });
  const handleLayerSelect = (
    country: string,
    target: string,
    layer: number
  ) => {
    setSelectedLayers((prevState) => ({
      ...prevState,
      [country]: {
        ...prevState[country],
        [target]: layer,
      },
    }));
  };

  const renderCities = (country: string) => {
    const cities =
      countriesData.find((data) => data.country === country)?.cities || [];
    return cities.map((city) => {
      const selectedLayer = selectedLayers[country]?.[city.city] || null;

      return (
        <div key={city.city}>
          <p>{city.city}</p>
          {[1, 2, 3, 4, 5, 6].map((layer) => (
            <label key={layer}>
              <input
                type="radio"
                value={layer}
                checked={selectedLayer === layer}
                onChange={() => handleLayerSelect(country, city.city, layer)}
              />
              {layer}
            </label>
          ))}
        </div>
      );
    });
  };

  const renderCountrySelector = () => {
    return countriesData.map((country) => (
      <div key={country.country}>
        <h3>{country.country}</h3>
        {renderCities(country.country)}
      </div>
    ));
  };

  return (
    <div>
      <h2>Country and City Selector</h2>
      {renderCountrySelector()}
    </div>
  );
};

export default CountrySelector;
