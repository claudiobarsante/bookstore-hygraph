import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

// -- Card
import Card from '@mui/material/Card';

import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActionArea, Rating, Grid } from '@mui/material';

import { BookType } from 'components/Books';
//import WishlistButton from 'components/Buttons/Wishlist';

import formatPrice from 'utils/shared/format-price';
import { Colors } from 'styles/theme/colors';

type Props = {
  book: BookType;
};

export default function Book({ book }: Props) {
  const [hasMounted, setHasMounted] = useState(false);
  const router = useRouter();

  //?-- to avoid hydration error with <WishlistButton />
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }
  //?--
  return (
    <>
      <Card sx={{ width: '13rem' }}>
        <CardActionArea>
          <CardMedia
            sx={{ height: '15rem', position: 'relative' }}
            onClick={() => router.push(`/book/${book.id}`)}
          >
            <Image
              src={book.coverImageUrl!}
              alt={book.title!}
              layout="fill"
              aria-label={book.title!}
            />
          </CardMedia>
        </CardActionArea>
        <Box sx={{ flexGrow: 1, marginTop: '1rem' }}>
          <Grid container rowSpacing={1}>
            <Grid
              aria-label={`book name: ${book.title}`}
              item
              xs={8}
              sm={8}
              md={8}
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
            >
              <Typography
                variant="subtitle1"
                sx={{
                  display: '-webkit-box',
                  WebkitLineClamp: '2', //--max 2 lines
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',

                  fontWeight: 600,
                  height: '3.2rem',
                  paddingLeft: '0.5rem'
                }}
              >
                {book.title}
              </Typography>
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <Box sx={{ position: 'relative' }}>
                {/* <WishlistButton
                  bookId={book.id}
                  aria-label="add to favorites"
                  sx={{
                    position: 'absolute',
                    top: -8,
                    right: 0
                  }}
                /> */}
              </Box>
            </Grid>
            <Grid
              aria-label={`book price: ${formatPrice(book.price!)}`}
              item
              xs={8}
              sm={8}
              md={8}
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
            >
              <Typography variant="subtitle1" sx={{ paddingLeft: '0.5rem' }}>
                {formatPrice(book.price!)}
              </Typography>
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <Box sx={{ position: 'relative' }}>
                <Rating
                  size="small"
                  name="read-only"
                  value={book.rating}
                  readOnly
                  sx={{ color: Colors.warning, right: '1.7rem' }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>

        <CardActions>
          <Button
            variant="contained"
            sx={{
              width: '100%',
              color: 'whitesmoke',
              borderRadius: 0,
              background: Colors.primary
            }}
          >
            Add To Cart
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
