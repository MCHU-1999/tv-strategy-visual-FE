import { Space, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import styles from "./index.module.scss";

function round(numToBeRound, digits){
  return Math.round((numToBeRound + Number.EPSILON)*(10**digits)) / (10**digits);
}

const columns = [
  {
    title: '交易對',
    dataIndex: 'name',
    key: 'name',
    width: 120,
    // render: (text, record) => {
    //   const dotColor = colors[record.key];
    //   return (
    //     <span>
    //       <span className={styles.dotcolumn} style={{ color: dotColor }} />
    //       <span style={{ fontSize: '16px' }}>{text}</span>
    //     </span>
    //   );
    // },
  },
  {
    title: 'PnL (USDT)',
    dataIndex: 'profit',
    key: 'profit',
    width: 120,
    render: (text) => {
      const color = text < 0 ? '#D76B63' : '#55B86F';
      text = text < 0 ? text : '+'+text;
      return (
        <span className={styles.boldtext} style={{ color }}>{text} </span>
      );
    }
  },
  {
    title: '交易次數',
    dataIndex: 'price',
    key: 'price',
    // width: 200,
  },
  {
    title: '交易佔比',
    key: 'priceNow',
    dataIndex: 'priceNow',
  },
];

const PieTable = ({data}) => {
  const [ posData, setData ] = useState([]);
  useEffect(() => {
    if (Object.keys(data).length !== 0) {
      const newData = data.tradingPair.map((tradingPair, index) => ({
        key: index.toString(),
        name: tradingPair,
        profit: round(data.pnl[index], 2),
        price: data.trades[index],
        priceNow: round(data.ratio[index]*100, 2) + '%',
      }));

      setData([...newData]);
    }
  }, [data]);
  return (
    <Table columns={columns} dataSource={posData} scroll={{ y: 368.5, }} style={{ overflowY: "scroll" }}
      pagination={{
        position: ['bottomCenter'],
        pageSize: 50,
        hideOnSinglePage: true,
      }}
    />
  );
}


export default PieTable;