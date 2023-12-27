import 'chart.js/auto';
import { useEffect, useState } from 'react';
import { Chart, Bar, Line } from 'react-chartjs-2';
import { Select } from 'antd';

const PieChart = ({data}) => {
  const [ option, setOptions ] = useState({});
  const [ chartData, setChartData ] = useState({
    datasets: [
      {
        data: undefined,
      },
    ]
  });
  
  useEffect(() => {
    if ( Object.keys(data).length === 0) {
      // pass
    } else {
      const backgroundColor = data.pnl.map((value) => (value > 0 ? '#55B86F' : '#D76B63'));
      setChartData({
        labels: data.name,
        datasets: [
          {
            label: 'Profit',
            data: data.pnl,
            backgroundColor: backgroundColor,
            borderWidth: 1,
            barPercentage: 1,
            // barThickness: 30,
            // maxBarThickness: 8,
            // minBarLength: 2,
          },
        ],
      });
      setOptions({
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            ticks: {
              major: {
                enabled: true,
              },
              // maxRotation: 0,
            },
            grid: {
              display: false,
            },
            border: {
              display: false,
            }
          },
          y: {
            ticks: {
              maxRotation: 0,
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
        // aspectRatio: 2,
        // maintainAspectRatio: true,
      })
    }
  }, [data]);

  return (
    <Chart type='bar' data={chartData} options={option}/>
  );
}


export default PieChart;