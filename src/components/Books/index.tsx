import { Container, Grid } from '@mui/material';
import Book from 'components/Book';

export type BookType = {
  __typename?: 'Book';
  id: string;
  title?: string | null;
  isbn?: string | null;
  coverImageUrl?: string | null;
  isOnSale?: boolean | null;
  pageCount?: number | null;
  price?: number | null;
  salePrice?: number | null;
  synopsis?: string | null;
  stock?: number | null;
  rating?: number | null;
  ratingCount?: number | null;
  ratings?: any | null;
  author?: {
    __typename?: 'Author';
    name: string;
  } | null;
  publisher?: {
    __typename?: 'Publisher';
    name: string;
  } | null;
  category?: {
    __typename?: 'Category';
    name: string;
  } | null;
};

export type BooksProps = {
  books: BookType[];
};

export default function Books({ books }: BooksProps) {
  if (!books) return null;
  const renderBooks = books.map((book) => (
    <Grid
      item
      key={book.id}
      // xs={2}
      // sm={3}
      display="flex"
      flexDirection={'column'}
      justifyContent="center"
      alignItems="center"
      //padding={'10px'}
    >
      <Book book={book} />
    </Grid>
  ));
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      justifyContent="space-evenly"
      sx={{ border: '1px solid green' }}
      columns={{ xs: 2, sm: 8, md: 12 }}
    >
      {renderBooks}
    </Grid>
  );
}
