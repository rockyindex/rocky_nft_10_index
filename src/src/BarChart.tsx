import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import getData from './getData.js';
import '@/src/BarChart.scss'
import { Spin } from 'antd';
let chart: echarts.ECharts | null = null;

interface BarChartProps {
    slugs: Array<String>;
}

const BarChart: React.FC<BarChartProps> = ({ slugs }) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const [curTime, setCurTime] = useState('2h');
    const [loading, setLoading] = useState(false);

    const initchart = async (requestUrls: string[]) => {
        try {
            let data = null;
            setLoading(true);
            const res = await getData(requestUrls)
            if (res?.data) {
                console.log('res.data', res.data);
                const timestamps = res.data.timestamps.map((item: string | number | Date) => {
                    const date = new Date(item); // 将时间戳转为Date对象
                    const year = date.getFullYear(); // 获取年份
                    const month = date.getMonth() + 1; // 获取月份（注意加1，因为月份从0开始）
                    const day = date.getDate(); // 获取日期
                    const formattedDate = `${year}-${month}-${day}`; // 格式化日期
                    console.log(formattedDate);
                    return formattedDate; // 输出：2021-01-01
                })
                data = {
                    ...res.data,
                    timestamps
                };
            }
            // 初始化ECharts实例
            // 配置项
            const options: echarts.EChartsOption = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        animation: false,
                        type: 'cross',
                        lineStyle: {
                            color: '#376df4',
                            width: 2,
                            opacity: 1
                        }
                    },
                    position: function (pt) {
                        return [pt[0], '10%'];
                    }
                },
                toolbox: {
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        restore: {},
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: data.timestamps
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: [0, '100%'],
                    // name: "ETH",
                    axisLabel: {
                        //这种做法就是在y轴的数据的值旁边拼接单位，貌似也挺方便的
                        formatter: "{value} ETH",
                    },
                },
                dataZoom: [
                    {
                        type: 'inside',
                        start: 0,
                        end: 10
                    },
                    {
                        start: 0,
                        end: 10
                    }
                ],
                series: [
                    {
                        name: curTime,
                        type: 'line',
                        symbol: 'none',
                        sampling: 'lttb',
                        itemStyle: {
                            color: 'rgb(255, 70, 131)'
                        },
                        areaStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: 'yellow'
                                },
                                {
                                    offset: 1,
                                    color: 'rgb(255, 70, 131)'
                                }
                            ])
                        },
                        data: data.floorEth
                    }
                ]
            };
            // 渲染图表
            chart && chart.setOption(options);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!chart) {
            chart = echarts.init(chartRef.current!);
            // window.onresize = chart.resize;
            window.addEventListener('resize', function () {
                chart?.resize();
            });
        }
        // 组件卸载时销毁实例
        return () => {
            if (chart) {
                chart.dispose();
                chart = null;
            }
        };
    }, []);

    useEffect(() => {
        const requestUrls = slugs.map(slug => `/projects/${slug}/charts/${curTime}`);
        initchart(requestUrls);
    }, [curTime]);

    const changeCurTime = (val: string) => {
        setCurTime(val);
    }


    return (
        <div className="chartBox">
            <Spin spinning={loading}>
            <div className="legend">
                {['2h', '8h', '1d', 'all'].map((item, index) => (
                    <div onClick={() => {changeCurTime(item)}} className={item === curTime ? 'activeTab' : 'tab'}>
                        {item}
                    </div>)
                )}
            </div>
            <div ref={chartRef} style={{ width: '100%', height: '500px' }}>
            </div>
            </Spin>
        </div>
    );
};

export default BarChart;