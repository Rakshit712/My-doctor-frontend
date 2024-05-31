import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const data = [
  {
    name: 'Before 3',
    Appointments: 1600,
    
    amt: 2400,
  },
  {
    name: 'Before 2',
    Appointments: 4000,
    
    amt: 2210,
  },
  {
    name: 'Before 1',
    Appointments: 2900,
   
    amt: 2290,
  },
  {
    name: 'Yesterday',
    Appointments: 4300,
    
    amt: 2000,
  },
  {
    name: 'Today',
    Appointments: 4600,
  
    amt: 2181,
  },
];


function Chart3() {
  return (
   <>
   
        <LineChart
          width={448}
          height={280}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          
          <XAxis dataKey="name" />
          <YAxis />
          
          <Line type="natural" dataKey="Appointments" stroke="#82ca9d" />
        </LineChart>
     
   </>
  )
}

export default Chart3