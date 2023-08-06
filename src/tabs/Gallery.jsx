import { useEffect, useState } from 'react';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';
import { getImages } from 'service/image-service';

export const Gallery = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!query) return;
    getImages(query, page);
  }, [query, page]);

  const onSubmit = value => {
    setQuery(value);
  };
  return (
    <>
      <SearchForm onSubmit={onSubmit} />
    </>
  );
};
