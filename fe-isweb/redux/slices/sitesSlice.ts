import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const sitesSlice = createSlice({
    name: "sites",
    initialState: [] as Site[],
    reducers: {
        addSite: (state, action: PayloadAction<Site>) => {
            [
                ...state,
                action.payload
            ];
        },
        removeSite: (state, action: PayloadAction<string>) => {
            state.filter((site) => {
                site.siteId != action.payload;
            })
        },
        updateSite: (state, action: PayloadAction<Site>) => {
            state.map((site) => {
                (site.siteId == action.payload.siteId ? action.payload : site );
            })
        },
        updateAll: (state, action: PayloadAction<Site[]>) => {
            state = action.payload;
            return state;
        },
        toggleFav: (state, action:PayloadAction<string> ) => {
            state.map((site) => {
                site.siteId == action.payload ? site.isFav = !site.isFav : site.isFav;
            })
        },
    }
});

export default sitesSlice;