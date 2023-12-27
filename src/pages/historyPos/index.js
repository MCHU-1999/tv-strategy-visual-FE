
import { useEffect, useState } from 'react';
import styles from "./index.module.scss";
import { Select } from 'antd';
import { get, post } from '../../util/io';
import HistoryTable from './table';


const HistoryPos = () => {
  const [ userData, setUserData ] = useState({});

  useEffect(() => {
    const fetchData = () => {
      let header = {
        password: process.env.REACT_APP_API_PASSWORD,
      };
      
      post(`${process.env.REACT_APP_API_URL}/historyPos/getHistoryPos`, header)
      .then((resp) => {
        setUserData(resp.data.data);
      })
    };
    fetchData();

    const interval = setInterval(fetchData, 60000);

    return () => clearInterval(interval);
  }, []);


  return (
    <div className={styles.block}>
      <HistoryTable data={userData}/>
    </div>
  );
}


export default HistoryPos;