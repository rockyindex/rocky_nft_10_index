import { useEffect, useState } from 'react'
import '@/App.scss'
import axios from 'axios';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import data from './const/data.js';
import BarChart from './src/BarChart.js';

interface IProducts {
	key: React.Key;
	name: string;
	bestPriceUrl: string;
	blockchain: string;
	creator: string;
	ranking: number;
	reservoirCollectionId: string;
	slug: string;
	types: string[]; 
	updatedAt: string;
	stats: any;
	parentCollection: any,
	subCollection: any,
	imageBlur: any,
}

const columns: ColumnsType<IProducts> = [
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
		width: 150,
		fixed: 'left'
	},
	{
		title: 'Ranking',
		dataIndex: 'ranking',
		key: 'ranking',
		width: 150
	},
	{
		title: 'Blockchain',
		dataIndex: 'blockchain',
		key: 'blockchain',
	},
	{
		title: 'BestPriceUrl',
		dataIndex: 'bestPriceUrl',
		key: 'bestPriceUrl',
	},
	{
		title: 'Creator',
		dataIndex: 'creator',
		key: 'creator',
	},
	{
		title: 'ReservoirCollectionId',
		dataIndex: 'reservoirCollectionId',
		key: 'reservoirCollectionId'
	}
];

//  hook 组件函数
const App: React.FC = () => {
	// const [product, setProduct] = useState<IProducts[] | []>([]);
	
	const [productLoading, setProductLoading] = useState<boolean>(false);


	const [title] = useState<string>("NFT Blue Chip 10 Index.");
	const [info1] = useState<string>("The NI Blue Chip 10 Index is an equal weighted top 10 NFT project floor prices. It reflected the price level that users can get buying");
	const [info2] = useState<string>("The selection is based on two factors: past 90 days trading volumes in USD and the project market cap has to be one of the top 30 names within the NFT sector. The index price is the mathematical average of the projects that are included in the index.");
	const [info3] = useState<string>("We update the component companies by annual basis by searching for volume and market cap or whenever there is major event happening with the component projects. Any changes to be made will be notified to users 30 days ahead of working into effect to minimize any market impact brought by the change.");
	const [info4] = useState<string>("The NFTInd.com has the sole discretionary power upon the index. We are independent to NFT projects. We are encouring the community input and we listen to voices from all participants in the industry.");
	
	// const [title] = useState<string>('Welcome to NFTInd.com');
	// const [info1] = useState<string>("the premier index for the exciting world of NFTs! ");
	// const [info2] = useState<string>("Our platform offers users easy access to the fast-growing NFT market, enabling them to gain financial exposure to this emerging asset class quickly and effortlessly.With high - profile NFT sales reaching millions of dollars, the market can be overwhelming to navigate.At NFTInd.com, we are NFT enthusiasts and follow the same high standards as traditional finance indices.We aim to be a top - level industry leader in transparency and long term decentralized governance.Our platform features a curated list of top - performing NFT projects, allowing users to track the market's performance and invest in NFTs with confidence.Whether you're a seasoned NFT investor or new to the space, NFTInd.com simplifies the process of gaining exposure to this exciting asset class.Join us today to explore the world of NFTs with NFTInd.com and start investing in the future of digital assets.");
	// const getData = async () => {
	// 	try {
	// 		setProductLoading(true);
	// 		const res = await axios({
	// 			method: 'GET',
	// 			url: '/projects'
	// 		})
	// 		if (res?.data) {
	// 			const resData = res.data.filter((item: { ranking: number; }) => item.ranking === 2);
	// 			setProduct(resData);
	// 		}
	// 	} catch (e) {
	// 		console.log(e);
	// 	} finally {
	// 		setProductLoading(false);
	// 	}

	// }

	useEffect(() => {
		if (!productLoading) {
		}
		return () => {
			// setProduct([]);
		};
	}, []);

	return (
		<div className="App">
			<div className="header" onClick={() => console.log('hover on header')}>
				<div className='title'>
					{title}
				</div>
				<div className='info2'>
					{info1} <br/>
					{info2} <br/>
					{info3} <br/>
					{info4} <br/>
				</div>
			</div>
			<div className="charts">
				<div className="cardItem">
					<BarChart slugs={data.map(item => item.slug)}/>
				</div>
			</div>
			<div className="content-top">
				 {data.map((item, index) => {
					return (
						<>
							<div className="card">
								<div className="cardItem">
									<img className="image" src={"https://s3.amazonaws.com/cdn.nftpricefloor/projects/v1/" + item.image} alt={item.image} />
									<h1>{item.name}</h1>
									{/* <div className="info">Unique hand-drawn artworks were the first creations to be tokenized within the blockchain. But that was soon taken over by the pixelated collectibles. Azuki is an NFT project that focuses on bringing back the old days when hand-drawn artworks ruled the crypto space. And it has been successful for the most part.</div> */}
									<div className="info" dangerouslySetInnerHTML={{__html: item.info}}></div>
									{/* <h5 className='text'>The current <strong>price floor of {fullName}</strong> is {priceFloor} {currency} and the 24 hour trading volume is {sales24hVolume} {currency} with {numberSales24h} {sales}.</h5> */}
								</div>
							</div>
						</>
					);
				 })}
			</div>
			<div className="footer">
				<div>twitter:<a href="https://twitter.com/rockyindex">https://twitter.com/rockyindex</a></div>
				<div>github:<a href="https://github.com/rockyindex/rocky_nft_10_index">https://github.com/rockyindex/rocky_nft_10_index</a></div>
			</div>
		</div >
	)
}

export default App;
