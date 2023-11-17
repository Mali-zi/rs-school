import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../utils/const';
import { IBookDetails, IData } from '../../models';

interface IFetchDataProps {
  searchQuery: string;
  curentPage: number;
  booksPerPage: number;
}

// Define a service using a base URL and expected endpoints
export const libraryApi = createApi({
  reducerPath: 'libraryApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getBooks: builder.query<IData, IFetchDataProps>({
      query: ({ searchQuery, curentPage, booksPerPage }) => ({
        url: `/search.json?q=${searchQuery}&author=conan%20doyle&offset=${
          (curentPage - 1) * booksPerPage
        }&limit=${booksPerPage}`,
      }),
    }),
    getDetails: builder.query<IBookDetails, string>({
      query: (key) => `/works/${key}.json`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetBooksQuery, useGetDetailsQuery } = libraryApi;
