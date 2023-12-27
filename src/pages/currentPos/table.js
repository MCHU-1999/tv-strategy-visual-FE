import { Space, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import styles from "./index.module.scss";

function round(numToBeRound, digits){
  return Math.round((numToBeRound + Number.EPSILON)*(10**digits)) / (10**digits);
}

const columns = [
  {
    title: '交易對 / 模式 / 槓桿',
    dataIndex: 'name',
    key: 'name',
    width: 400,
    render: (text, { tags }) => (
      <>
        <span style={{ fontWeight: 500, fontSize: 16 }}>{text} </span>
        {tags.map((tag) => {
          let color = 'DarkGray';
          if (tag.substring(0, 5) === 'short') {
            color = '#D76B63';
          }
          else if (tag.substring(0, 4) === 'long') {
            color = '#55B86F';
          }
          return (
            <Tag color={color} key={tag}>
              {tag}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: '收益 / 收益率(尚未平倉)',
    dataIndex: 'profit',
    key: 'profit',
    width: 300,
    render: (text) => {
      const regex = /^([-+]?\d+(?:\.\d+)?)\s/;
      const match = text.match(regex);
      const number = parseFloat(match[1]);
      const color = number < 0 ? '#D76B63' : '#55B86F';
      text = number < 0 ? text : '+'+text;
      return (
        <span className={styles.boldtext} style={{ color }}>{text} </span>
      );
    }
  },
  {
    title: '開倉價格 / 時間',
    dataIndex: 'price',
    key: 'price',
    // width: 280,
    render: (text) => {
      const front = text.split("T")[0];
      const end = text.split("T")[1];
      return (
        <div>
        <span className={styles.boldtext}>{front+'T'}</span><h5>{end}</h5>
        </div>
      );
    }

  },
  {
    title: '當前價格',
    key: 'priceNow',
    dataIndex: 'priceNow',
    render: (text) => {
      return (
        <div>
        <span className={styles.boldtext}>{text}</span>
        </div>
      );
    }
  },
];

const CurrentTable = ({data}) => {
  const [ posData, setData ] = useState([]);
  useEffect(() => {
    if (Object.keys(data).length !== 0) {
      let profit = 0.00;
      const newData = data.pair.map((pair, index) => {
        if (data.side[index] === 'short') {
          profit = (data.openPrice[index]-data.nowPrice[pair])*data.size[index];
        } else {
          profit = (data.nowPrice[pair]-data.openPrice[index])*data.size[index];
        }
        let profitPercent = profit/data.cost[index]*100;
        
        return {
          key: index.toString(),
          name: pair,
          profit: `${round(profit, 2)} USDT (${round(profitPercent, 2)}%)`,
          price: `${data.openPrice[index]} USDT ${data.openTime[index]}`,
          priceNow: `${data.nowPrice[pair]} USDT`,
          tags: ["USDT cross margin", `${data.side[index]} ${data.leverage[index]}x`],
        };
      });

      setData([...newData.reverse()]);
    }
  }, [data]);
  return (
    <Table columns={columns} dataSource={posData}
    pagination={{
        position: ['bottomCenter'],
    }}
    />
  );
}


export default CurrentTable;