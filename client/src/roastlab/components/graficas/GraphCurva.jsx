import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  Chart,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);
export function GraphCurva(props){
const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
        position: 'top',
        labels:{
            font:{
                size:14
            }
        }
        }
  },
  scales:{
    y:{
        display:true,
        title:{
            display:true,
            text:'Porcentaje ( % )'
        }
    },
    x:{
        display:true,
        title:{
            display:true,
            text:'Mallas'
        }
    }
  }
};

const labels = props.Lista;

const data = {
  labels,
  datasets: [
    {
        fill: true,
        label: 'Porcentaje ( % )',
        data: props.CurvaGra,
        backgroundColor: 'rgba(134,21,33, 0.5)',
        borderColor: '#861521',
        tension: 0.4
    }
  ],
}
return <Line options={options} data={data}/>
}