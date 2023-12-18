const RADIUS = 90;
const STROKE_WIDTH = 40;
const CIRCUMFERENCE = 2 * Math.PI * (RADIUS - STROKE_WIDTH / 2);
const colors = [
  'stroke-primary50',
  'stroke-primary100',
  'stroke-primary200',
  'stroke-primary300',
  'stroke-primary400',
  'stroke-primary500',
  'stroke-primary600',
  'stroke-primary700',
  'stroke-primary800',
  'stroke-primary900',
];

interface DoughnutChartProps {
  rate: number;
}

const DoughnutChart = ({ rate }: DoughnutChartProps) => {
  return (
    <div className="relative h-16 w-16">
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[0.7rem] text-black700">
        {rate}%
      </span>
      <svg viewBox="0 0 200 200" className="h-full w-full">
        <circle
          cx="100"
          cy="100"
          r={RADIUS - STROKE_WIDTH / 2}
          strokeWidth={STROKE_WIDTH}
          className="fill-none stroke-body"
        />
        {colors.map((color, index) => {
          const isFilled = rate > index * 10;
          const segment = CIRCUMFERENCE * 0.1;
          const offset = -(index * segment);
          return (
            <circle
              key={index}
              cx="100"
              cy="100"
              r={RADIUS - STROKE_WIDTH / 2}
              strokeWidth={STROKE_WIDTH}
              className={`fill-none ${isFilled ? color : 'stroke-none'}`}
              strokeDasharray={`${segment} ${CIRCUMFERENCE - segment}`}
              strokeDashoffset={offset - CIRCUMFERENCE * 0.75}
            />
          );
        })}
      </svg>
    </div>
  );
};

export default DoughnutChart;
