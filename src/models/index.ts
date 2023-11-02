export interface DefaultProps {}

export interface IBottomSectionProps {
  searchQuery: string;
  booksPerPage: number;
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
  ebook_access: string;
  has_fulltext: boolean;
  person?: string[];
  seed: string[];
}

export interface IBookListProps {
  books: IBook[];
  booksPerPage: number;
}

export interface IBookProps {
  book: IBook;
}
