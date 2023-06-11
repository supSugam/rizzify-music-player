// 27:30 TypeScript !important

// 91410e5a11msh65b992a9150ca2ep1c78ebjsn2feeb0f104b0
// 41459ffa84mshedf0d1731254d2ap1a40b7jsnadff3c037d6c

import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const shazamApi = createApi({
    reducerPath: 'shazamApi',
    baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam-core.p.rapidapi.com/',
    prepareHeaders:(headers)=>{
        headers.set('X-RapidAPI-Key', '41459ffa84mshedf0d1731254d2ap1a40b7jsnadff3c037d6c');
        headers.set('X-RapidAPI-Host', 'shazam-core.p.rapidapi.com');
        return headers;
    },
    }),
    endpoints:(builder)=>({
        getTopCharts: builder.query({
            query:()=>'v1/charts/world',
        }),   
        getSongsByGenre: builder.query({
            query:(genre)=>`v1/charts/genre-world?genre_code=${genre}`,
        }),
        getSongDetails: builder.query({
            query:({songid})=>`v1/tracks/details?track_id=${songid}`,
        }),
        getSongRelated: builder.query({
            query:({songid})=>`v1/tracks/related?track_id=${songid}`,
        }),
        getArtistDetails: builder.query({
            query:(artistId)=>`v2/artists/details?artist_id=${artistId}`,
        }),
        getSongsByCountry: builder.query({
            query:(countryCode)=>`v1/charts/country?country_code=${countryCode}`,
        }),
        getSongsBySearch: builder.query({
            query:(searchTerm)=>`v1/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}`,
        }),
    }),
  });

export const {useGetTopChartsQuery, useGetSongDetailsQuery, useGetSongRelatedQuery,useGetArtistDetailsQuery,useGetSongsByCountryQuery,useGetSongsByGenreQuery, useGetSongsBySearchQuery} = shazamApi;
