import 'chart.js/auto';
import { useEffect, useState } from 'react';
import { Chart, Bar, Line } from 'react-chartjs-2';
import { Select } from 'antd';


function getGradient(ctx, chartArea, mainColor='#AADCE9') {
  let width, height, gradient;
  const chartWidth = chartArea.right - chartArea.left;
  const chartHeight = chartArea.bottom - chartArea.top;
  if (!gradient || width !== chartWidth || height !== chartHeight) {
    // Create the gradient because this is either the first render
    // or the size of the chart has changed
    width = chartWidth;
    height = chartHeight;
    gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, "rgba(0,191,255,0.0)");
    gradient.addColorStop(1, mainColor);
  }

  return gradient;
}

const LineChart = ({data}) => {
  const [ options, setOptions ] = useState({});
  const [ chartData, setChartData ] = useState({
    datasets: [
      {
        label: undefined,
        data: undefined,
      },
    ]
  });

  useEffect(() => {
    if ( Object.keys(data).length === 0) {
      // pass
    } else {
      setChartData({
        labels: data.chartX,
        datasets: [
          {
            showLine: true,
            borderColor: '#07BED5',
            borderWidth: 4,
            borderCapStyle: 'round',
            borderJoinStyle: 'round',
            backgroundColor: function(context) {
              const chart = context.chart;
              const {ctx, chartArea} = chart;
              if (!chartArea) {
                // This case happens on initial chart load
                return;
              }
              return getGradient(ctx, chartArea, "#D5EEF5");
            },
            hoverBackgroundColor: "rgba(0,191,255,0.5)",
  
            pointBackgroundColor: "rgba(0,191,255,0.0)",
            pointBorderColor: "rgba(0,191,255,0.0)",
            pointBorderWidth: 0.0,
            pointRadius: 12.0,
            pointStyle: 'circle',
  
            pointHoverBackgroundColor: "#FFFFFF",
            pointHoverBorderColor: "rgba(0,191,255,1)",
            pointHoverBorderWidth: 3,
            pointHoverRadius: 10.0,
  
            label: `資產變化`,
            // xAxisID: 'Date',
            data: data.chartY,
            lineTension: 0.4,
            fill: true,
          },
        ]
      });
      setOptions({
        plugins:{
          legend: {
            display: false,
            position: 'bottom',
            align: 'end',
          }
        },
        scales: {
          x: {
            ticks: {
              major: {
                enabled: true,
              },
              maxRotation: 0,
              autoskip: true,
              autoSkipPadding: 24,
              color: "#999999",
            },
            grid: {
              display: false,
            },
            border: {
              display: false,
            }
          },
          y: {
            suggestedMin: 2*Math.min(...data.chartY) - Math.max(...data.chartY),
            suggestedMax: 2*Math.max(...data.chartY) - Math.min(...data.chartY),
            ticks: {
              maxRotation: 0,
              autoskip: true,
              autoSkipPadding: 10,
              color: "#999999",
              padding: 10,
            },
            grid: {
              color: "#dddddd",
              tickBorderDashOffset: 0,
              tickLength: 0,
            },
            border: {
              dash: [6, 3],
              display: false,
            }
          },
        },
        responsive: true,
        aspectRatio: 4,
        maintainAspectRatio: false,
      });
    }
  }, [data]);

  return (
    <Chart type='line' data={chartData} options={options}/>
  );
}


export default LineChart;