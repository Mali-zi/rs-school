export interface DefaultProps {}

export interface IBottomSectionProps {
  searchQuery: string;
  booksPerPage: number;
  page: number;
}

export interface IBook {
  key: string;
  title: string;
  subtitle?: string;
  author_name?: string[];
  isbn?: string[];
  publisher?: string[];
  publish_place?: string[];
  publish_year?: number[];
  first_publish_year?: number;
  language?: string[];
  ebook_access?: string;
  has_fulltext?: boolean;
  person?: string[];
  seed?: string[];
}

export interface IBookListProps {
  books: IBook[];
}

export interface IBookProps {
  book: IBook;
}

export interface IBookList {
  results: IBook[];
}

export interface IBookDetails {
  key: string;
  title: string;
  covers?: number[];
  excerpts?: Excerpt[];
  subjects?: string[];
  links?: Link[];
}
export interface Type {
  key: string;
}

export interface Excerpt {
  excerpt: string;
}

export interface Link {
  url: string;
  title: string;
  type: Type;
}

export interface ITopContext {
  searchQuery: string;
  booksPerPage: number;
}

export interface IPageNumbersSection {
  numFound: number;
  curentPage: number;
  setCurentPage: (item: number) => void;
}

export interface IResultContext {
  books: IBook[];
  curentPage: number;
}

export interface IDetailsSection {
  bookDetails: IBookDetails;
}

export interface IData {
  docs: IBook[];
  numFound: number;
}

export interface IUseGetBooksQueryData {
  data?: IData | undefined;
  isLoading?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  error?: FetchBaseQueryError | SerializedError;
}

export interface SerializedError {
  name?: string;
  message?: string;
  stack?: string;
  code?: string;
}

export type FetchBaseQueryError =
  | {
      /**
       * * `number`:
       *   HTTP status code
       */
      status: number;
      data: unknown;
    }
  | {
      /**
       * * `"FETCH_ERROR"`:
       *   An error that occurred during execution of `fetch` or the `fetchFn` callback option
       **/
      status: 'FETCH_ERROR';
      data?: undefined;
      error: string;
    }
  | {
      /**
       * * `"PARSING_ERROR"`:
       *   An error happened during parsing.
       *   Most likely a non-JSON-response was returned with the default `responseHandler` "JSON",
       *   or an error occurred while executing a custom `responseHandler`.
       **/
      status: 'PARSING_ERROR';
      originalStatus: number;
      data: string;
      error: string;
    }
  | {
      /**
       * * `"CUSTOM_ERROR"`:
       *   A custom error type that you can return from your `queryFn` where another error might not make sense.
       **/
      status: 'CUSTOM_ERROR';
      data?: unknown;
      error: string;
    };
