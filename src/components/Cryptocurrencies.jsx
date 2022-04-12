import React, { useEffect, useState } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Typography, Card, Row, Col, Input, Space } from "antd";

import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "./Loader";

const Cryptocurrencies = ({ simplified }) => {
  const { Title, Text } = Typography;

  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    setCryptos(cryptosList?.data?.coins);
    const filteredData = cryptosList?.data?.coins.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) return <Loader />;

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={8}
            xl={8}
            className="crypto-card"
            key={currency.uuid}
          >
            <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} />}
                hoverable
              >
                <Col>
                  <Row className="coin-stats-name">
                    <Row>
                      Price:
                      <h4> {millify(currency.price)}</h4>
                    </Row>
                  </Row>
                  <Row className="coin-stats-name">
                    <Row>
                      Market Cap: <h4>{millify(currency.marketCap)}</h4>
                    </Row>
                  </Row>
                  <Row className="coin-stats-name">
                    <Row>
                      Daily Change: <h4>{currency.change}%</h4>{" "}
                    </Row>
                  </Row>
                </Col>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
