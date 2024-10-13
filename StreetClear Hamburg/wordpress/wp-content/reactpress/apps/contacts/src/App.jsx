import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Col, Row } from 'antd';
import './App.css';

function App() {
  const [data, setData] = React.useState([
    { time: "12:00", temperature: 20.1, soil_moisture: 61.7 },
    { time: "12:01", temperature: 19.3, soil_moisture: 65.1 },
    { time: "12:02", temperature: 19.7, soil_moisture: 58.9 },
    { time: "12:03", temperature: 20.8, soil_moisture: 63.4 },
    { time: "12:04", temperature: 21.2, soil_moisture: 60.2 },
    { time: "12:05", temperature: 19.4, soil_moisture: 62.8 },
    { time: "12:06", temperature: 17.5, soil_moisture: 57.1 },
    { time: "12:07", temperature: 18.9, soil_moisture: 61.5 },
    { time: "12:08", temperature: 19.7, soil_moisture: 59.3 },
    { time: "12:09", temperature: 21.1, soil_moisture: 62.0 },
    { time: "12:10", temperature: 22.0, soil_moisture: 58.6 },
    { time: "12:11", temperature: 21.9, soil_moisture: 64.2 },
    { time: "12:12", temperature: 21.5, soil_moisture: 60.7 },
    { time: "12:13", temperature: 21.0, soil_moisture: 63.8 },
    { time: "12:14", temperature: 20.8, soil_moisture: 59.9 }
  ]);


  const randomChange = (min, max) => {
    return parseFloat((Math.random() * (max - min) + min).toFixed(1));
  };

  const updateTime = (lastTime) => {
    const [hours, minutes] = lastTime.split(':').map(Number);
    let newMinutes = minutes + 1;
    let newHours = hours;

    if (newMinutes === 60) {
      newMinutes = 0;
      newHours += 1;
    }


    return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;
  };

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setData((prevData) => {
        const lastEntry = prevData[prevData.length - 1];
        const newTime = updateTime(lastEntry.time);

        // Update temperature with bounds
        const newTemperature = Math.max(-10, Math.min(20, lastEntry.temperature + randomChange(-2, 2)));

        // Ensure soil moisture stays within 0 and 100%
        const newSoilMoisture = Math.max(0, Math.min(100, lastEntry.soil_moisture + randomChange(-7, 7)));

        const newDataPoint = {
          time: newTime,
          temperature: newTemperature,
          soil_moisture: newSoilMoisture,
        };

        const updatedData = [...prevData, newDataPoint];
        if (updatedData.length > 15) {
          updatedData.shift();
        }

        return updatedData;
      });

    }, 60000)


    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div>
        <Row justify="center">
          <Col span={24}>
            <LineChart
              dataset={data}
              width={1280}
              height={400}
              series={[
                {
                  dataKey: 'temperature',
                  label: 'Temperature (°C)',
                  yAxisId: 'leftAxisId',
                  color: '#FFA500'
                },
                {
                  dataKey: 'soil_moisture',
                  label: 'Ground Moisture (%)',
                  yAxisId: 'rightAxisId',
                  color: '#00BFFF'
                }
              ]}
              xAxis={[{ scaleType: 'band', dataKey: 'time' }]}
              yAxis={[
                { id: 'leftAxisId', label: 'Temperature (°C)', min: -5, max: 30 },
                { id: 'rightAxisId', label: 'Ground Moisture (%)', min: 0, max: 100, position: 'right' }
              ]}
              margin={{ top: 70, bottom: 70, left: 70, right: 70 }}
              rightAxis="rightAxisId"
            />

          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <LineChart
              dataset={data}
              xAxis={[{ scaleType: 'band', dataKey: 'time' }]}
              yAxis={[{ min: -5, max: 30 }]}
              series={[
                { dataKey: 'temperature', label: 'Temperature (°C)', color: '#FFA500' },
              ]}
              height={290}
              margin={{ top: 60, bottom: 30, left: 40, right: 60 }}
            />
          </Col>
          <Col span={12}>
            <LineChart
              dataset={data}
              xAxis={[{ scaleType: 'band', dataKey: 'time' }]}
              yAxis={[{ min: 0, max: 100 }]}
              series={[
                { dataKey: 'soil_moisture', label: 'Ground Moisture (%)', color: "#00b2e3" },
              ]}
              height={290}
              margin={{ top: 60, bottom: 30, left: 40, right: 60 }}
            />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default App;
