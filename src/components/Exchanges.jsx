import React from "react";
import millify from "millify";
import { Collapse, Row, Col, Typography, Avatar } from "antd";
import HTMLReactParser from "html-react-parser";
import {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
} from "../services/cryptoApi";

import Loader from "./Loader";

const { Text, Title } = Typography;
const { Panel } = Collapse;
const Exchanges = () => {
  const count = 20; /* true ? 10 : 100 */

  const { data: list, isFetching } = useGetCryptosQuery(count);
  console.log(list?.data?.stats);

  if (isFetching) return <Loader />;

  return (
    <>
      <Row style={{ textAlign: "center" }}>
        <Title level={2} className="home-title">
          Best Coins{" "}
        </Title>
      </Row>
      <Row>
        {list?.data?.stats?.bestCoins.map((exchange) => (
          <Col span={24}>
            <Collapse>
              <Panel
                key={exchange.uuid}
                showArrow={true}
                header={
                  <Row key={exchange.uuid}>
                    <Col span={24}>
                      <Avatar
                        className="exchange-image"
                        src={exchange.iconUrl}
                      />
                      <Text>
                        <strong>{exchange.name}</strong>
                      </Text>
                    </Col>
                  </Row>
                }
              >
                <a
                  href={exchange.coinrankingUrl}
                  target="blank"
                  rel="noreferrer"
                >
                  <Title level={5}>Extra News</Title>
                </a>{" "}
              </Panel>
            </Collapse>
          </Col>
        ))}{" "}
      </Row>
      <Row style={{ textAlign: "center" }}>
        <Title level={2} className="home-title">
          Newest Coins{" "}
        </Title>
      </Row>
      <Row>
        {list?.data?.stats?.newestCoins.map((exchange) => (
          <Col span={24}>
            <Collapse>
              <Panel
                key={exchange.uuid}
                showArrow={true}
                header={
                  <Row key={exchange.uuid}>
                    <Col span={24}>
                      <Avatar
                        className="exchange-image"
                        src={exchange.iconUrl}
                      />
                      <Text>
                        <strong>{exchange.name}</strong>
                      </Text>
                    </Col>
                  </Row>
                }
              >
                {" "}
                <a
                  href={exchange.coinrankingUrl}
                  target="blank"
                  rel="noreferrer"
                >
                  <Title level={5}>Extra News</Title>
                </a>{" "}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;
