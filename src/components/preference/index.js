import 'chart.js/auto';
import { useEffect, useState } from 'react';
import styles from "./index.module.scss";

import { Chart, Bar, Line } from 'react-chartjs-2';
import { Select } from 'antd';
import PieChart from './chart';
import PieTable from './table';
import { get, post } from '../../util/io';


const options = [
  {
    value: 180,
    label: '過去180天',
  },
  {
    value: 90,
    label: '過去90天',
  },
  {
    value: 30,
    label: '過去30天',
  },
  {
    value: 14,
    label: '過去14天',
  },
  {
    value: 7,
    label: '過去7天',
  },
];

const PieBlock = () => {
  const [ backtestDays, setDays ] = useState(30);
  const [ chartData, setChartData ] = useState({});


  useEffect(() => {
    let header = {
      password: process.env.REACT_APP_API_PASSWORD,
    };
    if (backtestDays) {
      post(`${process.env.REACT_APP_API_URL}/plot/getPieChart`, header, { backtestDays: backtestDays })
      .then((resp) => {
        setChartData(resp.data.data);
      })
    }
  }, [backtestDays]);

  const handleSelect = (value) => {
    setDays(value);
  }

  return (
    <div className={styles.block}>
      <div className={styles.title}>
        <h2>品種偏好</h2>
        <Select onChange={handleSelect} options={options} style={{ width: 120 }} defaultValue='過去30天'/>
      </div>
      <div style={{
        display: "flex",
        flexDirection: "row",
        gap: "40px",
      }}>
        <div style={{ width: "55%", height: "100%" }}>
          <PieChart data={chartData}/>
        </div>
        <div style={{ width: "45%" }}>
          <PieTable data={chartData}/>
        </div>
      </div>
    </div>
  );
}


export default PieBlock;