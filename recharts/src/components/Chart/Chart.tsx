import { FC, useCallback, useState } from 'react';
import {
  CartesianGrid,
  LabelList,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { Props } from 'recharts/types/component/Label';
import { TooltipProps } from 'recharts/types/component/Tooltip';
import { Point, ChartEventProps, roundPoint } from '../../Model';
import { useOnMouseMoveCallback } from './hooks';

const DOMAIN_VALUES = {
  min: 0,
  max: 6
};

const MEDIUM_POINT = (DOMAIN_VALUES.min + DOMAIN_VALUES.max) / 2;

const DOMAIN_LIMITS = [DOMAIN_VALUES.min, DOMAIN_VALUES.max];
const AXIS_TICKS = Array.from({ length: DOMAIN_VALUES.max }, (_, index) => index)
  .filter(value => value !== MEDIUM_POINT);

const initialPoints = [
  { value: 1, effort: 1, label: '🎀' },
  { value: 2, effort: 2, label: '🍉' },
  { value: 3, effort: 3, label: '🧭' },
  { value: 4, effort: 4, label: '⌛' },
  { value: 5, effort: 5, label: '😃' },
  { value: 6, effort: 6, label: '🍎' },
  { value: 0, effort: 0, label: '💾' }
] as Point[];

const RenderCustomizedLabel: FC<Props> = ({ x, y, width, value }) => {

  if (typeof x !== 'number' || typeof y !== 'number' || typeof width !== 'number') {
    return <></>;
  }

  return (

    <text
      x={x + width / 2}
      y={y + width / 2}
      width={width}
      height={width}
      fill='#fff'
      textAnchor='middle'
      fontSize='1.5rem'
      dominantBaseline='middle'>
      <tspan>
        {value}
      </tspan>
    </text>
  );
};

const CustomTooltip: FC<TooltipProps<ValueType, NameType> & { points: Point[] }> = ({ active, payload, points }) => {
  if (active && payload && payload[0]) {
    const hoveredPoint = payload[0].payload as Point;

    const hoveredLabels = points.filter(point =>
      point.effort === hoveredPoint.effort &&
      point.value === hoveredPoint.value)
      .map(point => point.label);

    if (hoveredLabels && hoveredLabels.length > 1) {

      const itemsPerLine = Math.round(Math.sqrt(hoveredLabels.length));
      const tooltipContent = hoveredLabels.reduce((acc, label, index) => {
        acc += label;
        if (index % itemsPerLine === 0) {
          acc += '\n';
        }
        return acc;
      });

      return <div style={{
        backgroundColor: '#0008',
        fontSize: '0.8rem',
        letterSpacing: '0.5rem',
        padding: '0.5rem 0rem 0.5rem 0.5rem',
        borderRadius: '0.1rem',
        whiteSpace: 'pre-wrap'
      }}>
        {tooltipContent}
      </div>;
    }
  }
  return (<></>);
};

export const CustomShapeBarChart = () => {

  const [points, setPoints] = useState<Point[]>(initialPoints);
  const [suggestedPoint, onMouseMoveCallback] = useOnMouseMoveCallback();

  const onClickCallback = useCallback((props: ChartEventProps) => {
    const { xValue, yValue } = props;
    const point = roundPoint(xValue, yValue, points[0].label);
    setPoints(previousState => [point, ...previousState.slice(1)]);
  }, [setPoints]);

  return (
    <div style={{
      width: '80vw',
      height: '80vh'
    }}>
      <ResponsiveContainer
        width='100%'
        height='100%'>
        <ScatterChart
          width={600}
          height={600}
          margin={{
            top: 40,
            bottom: 40,
            left: 40,
            right: 40
          }}
          onMouseMove={onMouseMoveCallback}
          onClick={onClickCallback}
        >
          <XAxis
            dataKey='value'
            type='number'
            axisLine={false}
            hide={false}
            ticks={AXIS_TICKS}
            domain={DOMAIN_LIMITS} />
          <YAxis
            dataKey='effort'
            type='number'
            axisLine={false}
            hide={false}
            ticks={AXIS_TICKS}
            domain={DOMAIN_LIMITS}
          />
          <ReferenceLine
            x={MEDIUM_POINT}
            stroke='black'
            label={{
              position: 'insideBottomLeft',
              value: 'Effort'
            }}
          />
          <ReferenceLine
            y={MEDIUM_POINT}
            stroke='black'
            label={{
              position: 'insideBottomLeft',
              value: 'Value'
            }}
          />
          <CartesianGrid
            strokeDasharray='3 3' />
          <Scatter
            data={points}
            isAnimationActive={false}
            strokeOpacity={1}
            strokeWidth={10}
            fill="#fff">
            <LabelList
              dataKey='label'
              fontSize='10rem'
              content={<RenderCustomizedLabel />}
            />
          </Scatter>
          <Scatter
            data={suggestedPoint}
            shape='cross'
            strokeWidth={10}
            strokeOpacity={0.5}
            fillOpacity={0.5}
            fill="#f00">
            <LabelList
              dataKey='label'
              width={10}
            />
          </Scatter>
          <Tooltip
            content={<CustomTooltip points={points} />} />
        </ScatterChart>
      </ResponsiveContainer>
    </div>);
};
