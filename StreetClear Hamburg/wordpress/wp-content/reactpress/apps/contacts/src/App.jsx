import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Col, Row } from 'antd';
import './App.css';

function App() {
  // Function to generate random change within a specified range
  const randomChange = (min, max) => {
    return parseFloat((Math.random() * (max - min) + min).toFixed(1));
  };

  // Generate initial dataset with the current time and previous entries
  const currentTime = new Date();
  const initialData = Array.from({ length: 15 }, (_, index) => {
    const pastTime = new Date(currentTime);
    pastTime.setMinutes(currentTime.getMinutes() - (14 - index)); // Decrease minutes for past entries

    return {
      time: pastTime.toTimeString().slice(0, 5), // Format to "HH:MM"
      temperature: randomChange(17, 22), // Example range for temperature
      soil_moisture: randomChange(50, 65), // Example range for soil moisture
    };
  });

  const [data, setData] = React.useState(initialData);

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
        const newTemperature = Math.max(-10, Math.min(30, lastEntry.temperature + randomChange(-2, 2)));

        // Ensure soil moisture stays within 0 and 100%
        const newSoilMoisture = Math.max(0, Math.min(100, lastEntry.soil_moisture + randomChange(-7, 7)));

        const newDataPoint = {
          time: newTime,
          temperature: newTemperature,
          soil_moisture: newSoilMoisture,
        };

        const updatedData = [...prevData, newDataPoint];
        if (updatedData.length > 15) {
          updatedData.shift(); // Maintain a maximum of 15 entries
        }

        return updatedData;
      });
    }, 60000); // Update every minute

    return () => clearInterval(intervalId); // Cleanup on unmount
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
                { dataKey: 'soil_moisture', label: 'Ground Moisture (%)', color: "#00BFFF" },
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
