import { useEffect, useState } from "react";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface StatsBarProps {
  formattedStats:
    | {
        stat: string;
        base_stat: number;
        effort: number;
      }[]
    | undefined;
}

const StatsBar = ({ formattedStats }: StatsBarProps) => {
  const [labelAngle, setLabelAngle] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 630) {
        setLabelAngle(-45);
      } else {
        setLabelAngle(0);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      className="mx-auto relative"
    >
      <BarChart
        data={formattedStats}
        margin={{ bottom: 70 }}
        className="pb-10 text-xs md:text-sm lg:text-base"
      >
        <Bar dataKey="base_stat" fill="#8884d8" />
        <XAxis
          dataKey="stat"
          angle={labelAngle}
          textAnchor={labelAngle ? "end" : "middle"}
          interval={0}
        />
        <YAxis dataKey="base_stat" domain={[0, 200]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StatsBar;
