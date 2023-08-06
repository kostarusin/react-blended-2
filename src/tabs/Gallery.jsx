import { useEffect, useState } from 'react';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';
import { getImages } from 'service/image-service';
import { Loader } from 'components/Loader/Loader';

export const Gallery = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [showBtn, setShowBtn] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query) return;
    setIsLoading(true);
    getImages(query, page)
      .then(({ photos, total_results }) => {
        if (photos.length === 0) {
          setIsEmpty(true);
        }
        setImages(prevState => [...prevState, ...photos]);
        setShowBtn(page < Math.ceil(total_results / 15));
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(setIsLoading(false));
  }, [query, page]);

  const onSubmit = value => {
    setImages([]);
    setPage(1);
    setShowBtn(false);
    setQuery(value);
    setIsEmpty(false);
    setError(false);
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
      {isEmpty && (
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      )}
      {error && <Text textAlign="center">Sorry. {error} 😭</Text>}
      {isLoading && <Loader />}
    </>
  );
};
