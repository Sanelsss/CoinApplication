import React,{useState} from 'react'
import {Select, Typography, Row, Col, Avatar,Card} from 'antd';
import moment from 'moment';
import {useGetCryptoNewsQuery} from '../services/cryptoNewsApi';
import {useGetCryptosQuery} from '../services/cryptoApi';
const {Text,Title} = Typography;
const {Option} = Select;
const Nes = ({simplified}) => {
 const [newsCategory,setNewsCategory]=useState('Cryptocurrency');
 const {data} = useGetCryptosQuery(100);
 const {data:cryptoNews}=useGetCryptoNewsQuery({newsCategory,count: simplified ? 6 : 12})
const demoImage='https://cdn.iconscout.com/icon/premium/png-256-thumb/demo-674987.png';
 if(!cryptoNews?.value) return 'Loading...';
 return (
    <Row gutter={[24,24]}>
      {!simplified && (
        <Col span={24}>
          <Select
          /* showSearch */
          className='select-news'
          placeholder='select a new categ'
          optionFilterProp='children'
          onChange={(value)=>setNewsCategory(value)}
          filterOption={(input,option)=>option.index.toLowerCase().indexOf(input.toLowerCase()>=0)}
          >
            <Option value="Cryptocurrency">Cryptocurrencies</Option>
            {data?.data?.coins.map((coin)=><Option value={coin.name}>{coin.name}</Option>)}
          </Select>
        </Col>
      )}
     {cryptoNews.value.map((news,i)=>(
       <Col xs={24} sm={12} lg={6} key={i}>
         <Card hoverable className='news-card'>
           <a href={news.url} target='blank' rel='noreferrer'>
             <div className='news-image-container'>
               <Title className='news-title' level={4}>{news.name}</Title>
               <img style={{maxWidth:'65px',maxHeight:'100px'}} src={news?.image?.thumbnail?.contentUrl||demoImage} alt='news' />
             </div>
             <p>
               {news.description > 100 ? `${news.description.substring(0, 100)}...`
               :news.description}
             </p>
             <div className='provider-container'>
               <div>
                 <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl||demoImage} alt="news"/>
                 <Text className='provider-name'>{news.provider[0]?.name}</Text>
               </div>
               <Text className='provider-name'>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
             </div>
           </a>
         </Card>
       </Col>
    ))}
    </Row>
  )
}

export default Nes