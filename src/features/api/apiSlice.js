import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/v2/pokemon" }),
  endpoints: (builder) => ({
    getPokemon: builder.query({
      query: () => "/pikachu",
    }),
  }),
});

export const { useGetPokemonQuery } = apiSlice;
