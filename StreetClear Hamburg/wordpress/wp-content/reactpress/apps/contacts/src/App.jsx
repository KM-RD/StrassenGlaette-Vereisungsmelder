import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { Col, Row, Layout } from 'antd';
import './App.css'

function App() {
  const [temp, setTemp] = React.useState(20);
  const [moist, setMoist] = React.useState(45);
  const data = [
    { "time": "12:00", "temperature": 7.1, "humidity": 33.0, "soil_moisture": 61.7 },
    { "time": "12:01", "temperature": 3.6, "humidity": 42.8, "soil_moisture": 69.4 },
    { "time": "12:02", "temperature": 4.5, "humidity": 88.0, "soil_moisture": 20.9 },
    { "time": "12:03", "temperature": 7.7, "humidity": 31.6, "soil_moisture": 12.4 },
    { "time": "12:04", "temperature": 5.5, "humidity": 42.9, "soil_moisture": 33.5 },
    { "time": "12:05", "temperature": -0.9, "humidity": 50.8, "soil_moisture": 41.2 },
    { "time": "12:06", "temperature": 13.2, "humidity": 97.9, "soil_moisture": 15.3 },
    { "time": "12:07", "temperature": 2.0, "humidity": 88.2, "soil_moisture": 24.8 },
    { "time": "12:08", "temperature": 7.8, "humidity": 46.2, "soil_moisture": 31.0 },
    { "time": "12:09", "temperature": 1.5, "humidity": 70.9, "soil_moisture": 42.7 },
    { "time": "12:10", "temperature": 2.0, "humidity": 88.8, "soil_moisture": 59.9 },
    { "time": "12:11", "temperature": 13.2, "humidity": 59.4, "soil_moisture": 27.1 },
    { "time": "12:12", "temperature": 2.6, "humidity": 48.8, "soil_moisture": 19.2 },
    { "time": "12:13", "temperature": -2.6, "humidity": 50.4, "soil_moisture": 50.7 },
    { "time": "12:14", "temperature": 6.3, "humidity": 71.9, "soil_moisture": 15.0 }
  ]
  const randomFloat = (min, max) => {
    return (Math.random() * (max - min)) + min;
  };
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setTemp(temp + randomFloat(-2, 2))
      setMoist(moist + randomFloat(-10, 10))
      console.log(temp, moist, 'working?!')
      console.log(randomFloat(-2, 2))
      console.log(randomFloat(2, -2))
    }, 6000);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <>
      <div>
        <div>
          <Row justify="center">
            <Col span={24}>
              <LineChart
                width={1280}
                dataset={data}
                xAxis={[{ scaleType: 'band', dataKey: 'time' }]}
                yAxis={[{
                  colorMap: {
                    type: 'piecewise',
                    thresholds: [0],
                    colors: ['red', 'green'],
                  },
                  position: 'left',
                  id: 'left'
                }, {
                  colorMap: {
                    type: 'piecewise',
                    thresholds: [0],
                    colors: ['red', 'teal'],
                  },
                  position: 'right',
                  id: 'right'
                }]}
                series={[
                  { dataKey: 'temperature', label: 'Temperature (°C)' },
                  { dataKey: 'soil_moisture', label: 'Moisture (%)' },
                ]}
                height={290}
                //  xAxis={[{ data: data.map(e => (e.time)), scaleType: 'band' }]}
                margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
              />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <BarChart
                series={[
                  { data: [35, 44, 24, 34] },
                  { data: [51, 6, 49, 30] },
                  { data: [15, 25, 30, 50] },
                  { data: [60, 50, 15, 25] },
                ]}
                height={290}
                xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
                margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
              />
            </Col>
            <Col span={12}>
              <BarChart
                series={[
                  { data: [35, 44, 24, 34] },
                  { data: [51, 6, 49, 30] },
                  { data: [15, 25, 30, 50] },
                  { data: [60, 50, 15, 25] },
                ]}
                height={290}
                xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
                margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
              />
            </Col>
          </Row>
        </div>
      </div>
    </>
  )
}

export default App


/*

[
  {"time": "2024-10-13 12:00", "temperature": 7.1, "humidity": 33.0, "soil_moisture": 61.7},
  {"time": "2024-10-13 12:01", "temperature": 3.6, "humidity": 42.8, "soil_moisture": 69.4},
  {"time": "2024-10-13 12:02", "temperature": 4.5, "humidity": 88.0, "soil_moisture": 20.9},
  {"time": "2024-10-13 12:03", "temperature": 7.7, "humidity": 31.6, "soil_moisture": 12.4},
  {"time": "2024-10-13 12:04", "temperature": 5.5, "humidity": 42.9, "soil_moisture": 33.5},
  {"time": "2024-10-13 12:05", "temperature": -0.9, "humidity": 50.8, "soil_moisture": 41.2},
  {"time": "2024-10-13 12:06", "temperature": 13.2, "humidity": 97.9, "soil_moisture": 15.3},
  {"time": "2024-10-13 12:07", "temperature": 2.0, "humidity": 88.2, "soil_moisture": 24.8},
  {"time": "2024-10-13 12:08", "temperature": 7.8, "humidity": 46.2, "soil_moisture": 31.0},
  {"time": "2024-10-13 12:09", "temperature": 1.5, "humidity": 70.9, "soil_moisture": 42.7},
  {"time": "2024-10-13 12:10", "temperature": 2.0, "humidity": 88.8, "soil_moisture": 59.9},
  {"time": "2024-10-13 12:11", "temperature": 13.2, "humidity": 59.4, "soil_moisture": 27.1},
  {"time": "2024-10-13 12:12", "temperature": 2.6, "humidity": 48.8, "soil_moisture": 19.2},
  {"time": "2024-10-13 12:13", "temperature": -2.6, "humidity": 50.4, "soil_moisture": 50.7},
  {"time": "2024-10-13 12:14", "temperature": 6.3, "humidity": 71.9, "soil_moisture": 15.0}
]

*/