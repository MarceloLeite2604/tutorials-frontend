import { useCallback } from 'react';
import { Point, ChartEventProps, roundPoint } from '../../../Model';
import { useThrottledState } from '../../../hooks';

export const useOnMouseMoveCallback: () => [Point[], (props?: ChartEventProps | undefined) => void] = () => {
  const [suggestedPoint, setSuggestedPoint] = useThrottledState<Point[]>([], 30, true);

  const onMouseMoveCallback = useCallback((props?: ChartEventProps) => {
    if (props) {
      const { xValue, yValue } = props;
      setSuggestedPoint([roundPoint(xValue, yValue)] as Point[]);
    }
  }, [setSuggestedPoint]);

  return [suggestedPoint, onMouseMoveCallback];
};
