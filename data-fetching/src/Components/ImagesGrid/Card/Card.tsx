import { useAsync } from 'react-use';
import { Card, Grid } from '@material-ui/core';
import { Placeholder } from './Placeholder';
import { Container } from './Container';

import { useStyles } from './CardStyles';

const imageWidth = 800;
const imageHeight = Math.round(imageWidth * 0.5625);

export const ImageCard = () => {

  const styles = useStyles();

  const fetchImageState = useAsync(async () => {
    return fetch(`https://picsum.photos/${imageWidth}/${imageHeight}`)
      .then(res => {
        if (res.ok) {
          return res.blob();
        } else {
          throw new Error('Could not fetch image');
        }
      })
      .then(image => URL.createObjectURL(image));
  });

  let content;
  if (fetchImageState.loading) {
    content = <Placeholder />;
  } else if (!fetchImageState.error) {
    content = <Container
      src={fetchImageState.value as string} />;
  } else {
    content = <p>{fetchImageState.error?.message}</p>;
  }

  return (
    <Grid container>
      <Grid
        item
        xs={12}>
        <Card
          elevation={3}
          className={styles.card}>
          {content}
        </Card>
      </Grid>
    </Grid>
  );
};
