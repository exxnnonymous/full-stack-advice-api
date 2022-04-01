import { Chart as ChartJS } from "chart.js/auto";
import { Chart, Line } from "react-chartjs-2";
import { useMantineTheme } from "@mantine/core";

export default function ChartComponent({ chartData }) {
  const theme = useMantineTheme();
  return (
    <>
      <Line
        data={chartData}
        options={{
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color:
                  theme.colorScheme === "dark"
                    ? "rgba(255,255,255,.05)"
                    : "rgba(0,0,0,.1)",
              },
              ticks: {
                color:
                  theme.colorScheme === "dark"
                    ? "rgba(255,255,255,.4)"
                    : "rgba(0,0,0,.6)",
              },
            },
            x: {
              title: {
                display: true,
                text: "Dates",
                color:
                  theme.colorScheme === "dark"
                    ? "rgba(255,255,255,.5)"
                    : "rgba(0,0,0,.6)",
                    font: {
                        size: 13,
                        weight: 'bold',
                      },
              },
              grid: {
                color:
                  theme.colorScheme === "dark"
                    ? "rgba(255,255,255,.05)"
                    : "rgba(0,0,0,.1)",
              },
              ticks: {
                color:
                  theme.colorScheme === "dark"
                    ? "rgba(255,255,255,.4)"
                    : "rgba(0,0,0,.6)",
                font: { size: 12 },
              },
            },
          },
        }}
      />
    </>
  );
}
