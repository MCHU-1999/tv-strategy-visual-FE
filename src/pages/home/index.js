import process from 'process';
import React, { useState, useEffect, useRef } from 'react';
import { Card, Select, Tabs } from "antd";
import styles from "./index.module.scss";
import LineBlock from "../../components/line"
import ListBlock from "../../components/overview"
import PieBlock from "../../components/preference"
import CurrentPos from "../currentPos"
import HistoryPos from "../historyPos"
import StickyBox from 'react-sticky-box';
import { get, post } from '../../util/io';

const Home = () => {
  const [ userData, setUserData ] = useState({});

  useEffect(() => {
    const fetchData = () => {
      let header = {
        password: process.env.REACT_APP_API_PASSWORD,
      };
      
      get(`${process.env.REACT_APP_API_URL}/currentPos/getNumOfPos`, header)
      .then((resp) => {
        setUserData(resp.data.data);
      })
    };
    fetchData();

    const interval = setInterval(fetchData, 60000);

    return () => clearInterval(interval);
  }, []);

  const [ activePage, setActivePage ] = useState(
  <>
    <LineBlock/>
    <div style={{
      display: "flex",
      flexDirection: "row",
      gap: "20px",
      width: "calc(100% - 80px)",
      margin: "20px 0px"
    }}>
      <ListBlock/>
      <PieBlock/>
    </div>
  </>
  );
  const onChange = (key) => {
    console.log(key);
    switch (key) {
      case '1':
        setActivePage(
          <>
            <LineBlock/>
            <div style={{
              display: "flex",
              flexDirection: "row",
              gap: "20px",
              width: "calc(100% - 80px)",
              margin: "20px 0px"
            }}>
              <ListBlock/>
              <PieBlock/>
            </div>
          </>
        );
        break;
      case '2':
        setActivePage(<CurrentPos/>);
        break;
      case '3':
        setActivePage(<HistoryPos/>);
        break;
      default:
        setActivePage(
          <>
            <LineBlock/>
            <div style={{
              display: "flex",
              flexDirection: "row",
              gap: "20px",
              width: "calc(100% - 80px)",
              margin: "20px 0px"
            }}>
              <ListBlock/>
              <PieBlock/>
            </div>
          </>
        );  
    };
  };
  const items = [
    {
      key: '1',
      label: `統計與圖表`,
      children: null,
      lineWidth: 3,
    },
    {
      key: '2',
      label: userData.num === undefined ? `當前倉位(0)` : `當前倉位(${userData.num})`,
      children: null,
      lineWidth: 3,
    },
    {
      key: '3',
      label: `歷史倉位`,
      children: null,
      lineWidth: 3,
    },
  ];
  return (

    <div className={ styles.main }>
      <StickyBox className={styles.topNav}>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} style={{ fontWeight: '700', width: '100%' }}/>
      </StickyBox>
      {activePage}
      
    </div>
  );
};

export default Home;