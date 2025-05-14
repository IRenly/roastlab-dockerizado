import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Radar } from 'react-chartjs-2';
  
  ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
  );
  
  export const RadarGraph = ({Fragancia, Acidez, Dulzor, Sabor, Cuerpo, Uniformidad, Sabor_Residual, Balance, Taza_Limpia}) =>{
      const data = {
          labels: ['Fragancia', 'Acidez', 'Dulzor', 'Sabor', 'Cuerpo', 'Uniformidad', 'Sabor Residual', 'Balance', 'Taza Limpia'],
          datasets: [
            {
              label: 'Puntaje',
              data: [Fragancia, Acidez, Dulzor, Sabor, Cuerpo, Uniformidad, Sabor_Residual, Balance, Taza_Limpia],
  
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
          ],
        };
        const options = {
          scales: {
              r: {
                  angleLines: {
                      display: true
                  },
                  suggestedMin: 0,
                  suggestedMax: 15
              }
          }
      };
        return(
          <Radar data={data} options={options} />
        )
  }
  
  
  