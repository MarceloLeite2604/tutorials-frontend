import { useState } from 'react';
import { Grid } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroller';

import { ImageCard } from './Card';
import { useStyles } from './ImagesGridStyles';

const totalImagesOnStart = 12;

export const ImagesGrid = () => {

  const styles = useStyles();

  const [images, setImages] = useState(Array.from(Array(totalImagesOnStart).keys())
    .map((_, index) =>
      <Grid
        item
        key={index}
        md={4}
        sm={6}
        xs={12}>
        <ImageCard />
      </Grid>));

  const loadMoreImages = () => setImages([...images, ...Array.from(Array(6).keys()).map((_, index) =>
    <Grid
      item
      key={images.length + index}
      md={4}
      sm={6}
      xs={12}>
      <ImageCard />
    </Grid>)]);

  return (<InfiniteScroll
    loadMore={loadMoreImages}
    hasMore={true}
    loader={<h4 key='loading-message'>Loading...</h4>}
  >
    <Grid
      container
      alignItems='center'
      justify='center'
      className={styles.root}
      spacing={2}>

      {images}
    </Grid>
  </InfiniteScroll>);

  // return (<Grid
  //   container
  //   alignItems='center'
  //   justify='center'
  //   className={styles.root}
  //   spacing={2}>
  //   {
  //     )
  //   }
  //   <Waypoint onEnter={() => console.log('Waypoint reached.')} />
  // </Grid>);
};
