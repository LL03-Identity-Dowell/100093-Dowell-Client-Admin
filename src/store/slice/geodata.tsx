import { createSlice } from "@reduxjs/toolkit";

const geoSlice = createSlice({
  name: "country",
  initialState: {
    username: "",
    geodata: [
      {
        country: null,
        layer: "",
        cities: [
          {
            city: "",
            layer: "",
          },
          {
            city: "",
            layer: "",
          },
        ],
      },
    ],
  },
  reducers: {
    getGeoData(state, action) {
      let isThere = false;
      state.geodata.forEach((item, index) => {
        if (item.country === action.payload.country) {
          state.geodata[index] = {
            ...item,
            ...action.payload,
          };
          isThere = true;
        }
      });
      if (!isThere) {
        if (state.geodata[0].country == null) {
          state.geodata = [
            {
              ...action.payload,
              cities: [
                {
                  city: "",
                  layer: "",
                },
                {
                  city: "",
                  layer: "",
                },
              ],
            },
          ];
        } else {
          state.geodata = [
            ...state.geodata,
            {
              ...action.payload,
              cities: [
                {
                  city: "",
                  layer: "",
                },
                {
                  city: "",
                  layer: "",
                },
              ],
            },
          ];
        }
      }

      return state;
    },
    getGeoCityData(state, action) {
      let isThere = false;
      state.geodata.forEach((item, _index1) => {
        if (item.country === action.payload.country) {
          if (item.cities[0].city == "") {
            item.cities = [...action.payload.cities];
          } else {
            item.cities.map((city, index) => {
              if (city.city == action.payload.cities[0].city) {
                isThere = true;
                item.cities[index] = action.payload.cities[0];
              }
            });
            if (!isThere) {
              item.cities = [...item.cities, ...action.payload.cities];
            }
          }
        }
      });

      return state;
    },
    getGeoUsername(state, action) {
      state.username = action.payload;
      return state;
    },
  },
});

export default geoSlice.reducer;

export const { getGeoData, getGeoCityData, getGeoUsername } = geoSlice.actions;
