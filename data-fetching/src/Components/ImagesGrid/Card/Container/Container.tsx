import { useStyles } from './ContainerStyles';

interface Props {
  src: string
}

export const Container = ({ src }: Props) => {
  const styles = useStyles();
  return <img className={styles.root} src={src} />;
};
