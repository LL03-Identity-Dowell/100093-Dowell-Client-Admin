// linkSlice.js
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface Link {
  id: number;
  link: string;
  // Other properties of a link
}

interface SolutionLinksState {
  links: Link[];
  generatedLink: string;
  // Other properties if needed
}
const initialState:SolutionLinksState = {
  links: [],
  generatedLink: "",
};

const linkSlice = createSlice({
  name: "links",
  initialState,
  reducers: {
    setLinks(state, action: PayloadAction<Link[]>) {
      state.links = action.payload;
    },
    setGeneratedLink(state, action:PayloadAction<string>) {
      state.generatedLink = action.payload;
    },
  },
});

export const { setLinks, setGeneratedLink } = linkSlice.actions;

export default linkSlice.reducer;
