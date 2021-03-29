import { useThrottle } from '@react-hook/throttle';
import { Grid } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroller';

import { ImageCard } from './Card';
import { useStyles } from './ImagesGridStyles';
import config from '../../config';

const totalImagesOnStart = 12;

export const ImagesGrid = () => {

  const styles = useStyles();

  const [images, setImages] = useThrottle(Array.from(Array(totalImagesOnStart).keys())
    .map((_, index) =>
      <Grid
        item
        key={index}
        md={4}
        sm={6}
        xs={12}>
        <ImageCard />
      </Grid>), 1, true);

  const loadMoreImages = () => setImages([...images, ...Array.from(Array(12).keys()).map((_, index) =>
    <Grid
      item
      key={images.length + index}
      md={4}
      sm={6}
      xs={12}>
      <ImageCard />
    </Grid>)]);

  return (
    <InfiniteScroll
      loadMore={loadMoreImages}
      hasMore={true}
      loader={<h4 key='loading-message'>Loading...</h4>}
      threshold={config.image.height * 3}>
      <Grid
        container
        alignItems='center'
        justify='center'
        className={styles.root}
        spacing={2}>

        {images}
      </Grid>
    </InfiniteScroll>
  );
};
