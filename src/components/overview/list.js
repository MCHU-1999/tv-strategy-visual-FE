import { Avatar, List, message } from 'antd';
import VirtualList from 'rc-virtual-list';
import { useEffect, useState } from 'react';
import styles from "./index.module.scss";

function round(numToBeRound, digits){
  return Math.round((numToBeRound + Number.EPSILON)*(10**digits)) / (10**digits);
}

const ContainerHeight = 400;
const App = ({data}) => {

  const output = [
    {
      title: '帳戶資產',
      value: '$ ' + (1000+data.total),
    },
    {
      title: '交易勝率',
      value: round(data.winRatio*100, 2) + '%',
    },
    {
      title: '總交易數',
      value: data.totalTxn,
    },
    {
      title: '盈利次數',
      value: data.winTxn,
    },
    {
      title: '虧損次數',
      value: data.loseTxn,
    },
    {
      title: '平均持倉時間',
      value: round(data.avgTime/data.totalTxn/3600, 2) + ' 小時',
    },
    {
      title: '最大盈利',
      value: `$ ${round(data.maxProfit, 2)} (${data.maxProfitPercent}%)` ,
    },
    {
      title: '最大虧損',
      value: `$ ${round(data.maxLoss, 2)} (${data.minProfitPercent}%)`,
    },
  ];

  return (
    <List>
      <VirtualList
        data={output}
        // height={ContainerHeight}
        itemHeight={40}
        // split={true}
        // // onScroll={onScroll}
        // style = {{
        //   borderBottom: 'none',
        // }}
      >
        {(item) => (
          <List.Item key={item.email}>
            {/* <List.Item.Meta
              description={<div>{item.title}</div>}
            /> */}
            <h5>{item.title}</h5>
            <span className={styles.boldtext}>{item.value}</span>
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
};
export default App;