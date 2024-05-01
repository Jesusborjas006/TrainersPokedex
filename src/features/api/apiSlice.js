import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://pokeapi-215911.firebaseapp.com/api/v2/pokemon",
  }),
  endpoints: (builder) => ({
    getPokemon: builder.query({
      query: (pokemon) => `/${pokemon}`,
    }),
  }),
});

export const { useLazyGetPokemonQuery } = apiSlice;
