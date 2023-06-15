import axios, { AxiosResponse } from 'axios';

interface Result {
  data: any;
}

export default async function getData(requestUrls: string[]): Promise<Result> {
  const requests = requestUrls.map(url => axios.get(url));
  const responses = await Promise.all(requests);
  const data = responses.map(response => response.data);
  const result = format(data);
  console.log('data', result);
  return { data: result };
}

function format(dataArr: string | any[]) {
// 假设这10个对象的数组为dataArr
let timestampSet: Set<number> = new Set();
let dataMap = new Map();

// 遍历所有对象，将时间戳加入Set中，将数据存入Map中
for (let i = 0; i < dataArr.length; i++) {
  let obj = dataArr[i];
  let timestamps = obj.timestamps;
  let floorEth = obj.floorEth;
  for (let j = 0; j < timestamps.length; j++) {
    let timestamp = timestamps[j];
    // pass 2023-01-01
    if (timestamp < 1672502400000){
      continue;
    }
    timestampSet.add(timestamp);
    if (!dataMap.has(timestamp)) {
      dataMap.set(timestamp, []);
    }
    dataMap.get(timestamp).push(floorEth[j]);
  }
}

// 将Set转成数组并排序
let timestampList: number[] = Array.from(timestampSet).sort((a, b) => a - b);

// 遍历每个时间戳，计算新对象的floorEth值
interface Result {
  timestamps: number[];
  floorEth: number[];
}

const result: Result = {
  timestamps: [],
  floorEth: []
};

for (let timestamp of timestampList) {
  let dataList = dataMap.get(timestamp);
  let sum = dataList.reduce((acc: any, val: any) => acc + val);
  let avgFloorEth = sum / dataList.length;
  result.timestamps.push(timestamp);
  result.floorEth.push(avgFloorEth);
}
console.log(result); // 输出最终的新对象
return result;
}