
import { useEffect, useState } from 'react';
import styles from "./index.module.scss";
import { Select } from 'antd';
import App from './list';
import { get, post } from '../../util/io';

function round(numToBeRound, digits){
  return Math.round((numToBeRound + Number.EPSILON)*(10**digits)) / (10**digits);
}

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

const ListBlock = () => {
  const [ backtestDays, setDays ] = useState(30);
  const [ userData, setUserData ] = useState({});

  useEffect(() => {
    let header = {
      password: process.env.REACT_APP_API_PASSWORD,
    };
    if (backtestDays) {
      post(`${process.env.REACT_APP_API_URL}/overview/getUserData`, header, { backtestDays: backtestDays })
      .then((resp) => {
        setUserData(resp.data.data);
      })
    }
  }, [backtestDays]);

  const handleSelect = (value) => {
    setDays(value);
  }
  
  return (
    <div className={styles.block}>
      <div className={styles.title}>
        <h2>績效總覽</h2>
        <Select onChange={handleSelect} options={options} style={{ width: 120 }} defaultValue='過去30天'/>
      </div>
    
      <div className={styles.twotextwithline}>
        <h5>{"累積收益(不含手續費)"}</h5>
        <h5>{"(含手續費)"}</h5>
      </div>
      
      <div className={styles.twotextwithline}>
        <h3 style={{ color: round(userData.profitNoFee, 2) < 0 ? '#D76B63' : '#55B86F' }}>
          {'$ ' + round(userData.profitNoFee, 2)}
        </h3>
        <h3 style={{ color: round(userData.total, 2) < 0 ? '#D76B63' : '#55B86F' }}>
          {'$ ' + round(userData.total, 2)}
        </h3>
      </div>
      <div style={{
        display: "flex",
        flexDirection: "row",
        gap: "10px",
      }}>
        <h3>{"近"+backtestDays+"天收益率:"}</h3>
        <h3 style={{ color: round(userData.total/1000, 3) < 0 ? '#D76B63' : '#55B86F' }}>
            {round(userData.total/1000*100, 2) + '%'}
        </h3>
      </div>
      <App data={userData}/>
    </div>
  );
}


export default ListBlock;