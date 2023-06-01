// 27:30 TypeScript !important

// 91410e5a11msh65b992a9150ca2ep1c78ebjsn2feeb0f104b0

import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const shazamApi = createApi({
    reducerPath: 'shazamApi',
    baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
    prepareHeaders:(headers)=>{
        headers.set('X-RapidAPI-Key', '91410e5a11msh65b992a9150ca2ep1c78ebjsn2feeb0f104b0');
        headers.set('X-RapidAPI-Host', 'shazam-core.p.rapidapi.com');
        return headers;
    },
    }),
    endpoints:(builder)=>({
        getTopCharts: builder.query({
            query:()=>'/charts/world',
        }),
    }),
  });

export const {useGetTopChartsQuery} = shazamApi;
