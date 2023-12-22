interface DoughnutChartProps {
  rate: number;
  label: string;
}

const DoughnutChart = ({ rate, label }: DoughnutChartProps) => {
  const angle = rate * 3.6;
  const gradient = `conic-gradient( #2FC964 ${
    angle / 2
  }deg,#D5F4E0 ${angle}deg, #EDF6F0 ${angle}deg)`;

  return (
    <div
      className={`relative h-[5rem] w-[5rem] rounded-full`}
      style={{
        background: gradient,
      }}
    >
      <div
        className={`absolute left-1/2 top-1/2 h-[4.5rem] w-[4.5rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white`}
      />
      <div className="absolute flex h-full w-full flex-col items-center justify-center gap-1">
        <p className="text-1 font-semibold text-black900">
          {rate ? `${rate}%` : `-`}
        </p>
        <p className="text-0.85 text-black500">{label}</p>
      </div>
    </div>
  );
};

export default DoughnutChart;
