import React, { useEffect, useState } from "react";
import { Chart as ChartJS, defaults, Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";
import Chart from "react-apexcharts";
import millify from "millify";
const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];
  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(Math.floor(coinHistory?.data?.history[i].price));
  }
  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimestamp.push(
      new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString()
    );
  }
  console.log(coinHistory);
  const state = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: coinTimestamp.slice(0, 100),
      },
    },
    series: [
      {
        name: "series-1",
        data: coinPrice?.slice(0, 100),
      },
    ],
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart{" "}
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            Change: {coinHistory?.data?.change}%
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: $ {currentPrice}
          </Title>
        </Col>
      </Row>

      <Chart options={state.options} series={state.series} type="line" />
      {/* <Line data={data} options={options} /> */}
    </>
  );
};

export default LineChart;
