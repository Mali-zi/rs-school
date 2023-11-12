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
  setCurentPage?: (item: number) => void;
}

export interface IResultContext {
  books: IBook[];
  curentPage: number;
}

export interface IDetailsSection {
  bookDetails: IBookDetails;
}
