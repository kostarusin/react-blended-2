import { useEffect, useState } from 'react';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';
import { getImages } from 'service/image-service';

export const Gallery = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    if (!query) return;
    getImages(query, page).then(({ photos, total_results }) => {
      setImages(prevState => [...prevState, ...photos]);
      setShowBtn(page < Math.ceil(total_results / 15));
    });
  }, [query, page]);

  const onSubmit = value => {
    setImages([]);
    setPage(1);
    setShowBtn(false);
    setQuery(value);
  };
  const onClickLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <>
      <SearchForm onSubmit={onSubmit} />
      <Grid>
        {images.map(image => (
          <GridItem key={image.id}>
            <CardItem color={image.avg_color}>
              <img src={image.src.large} alt={image.alt} />
            </CardItem>
          </GridItem>
        ))}
      </Grid>
      {showBtn && <Button onClick={onClickLoadMore}>Load more</Button>}
    </>
  );
};
