import React ,{useState} from 'react'
import {Bar , Doughnut} from 'react-chartjs-2';
import {db} from '../utils/firebase';





export default function Result(){
  const [dat,setDat] = useState([]);
const [lb,setLb] = useState([]);
db.collection('voteCount').get()
.then((snap)=>{
  const tlb = []
  const td = []
  snap.forEach((doc)=>{
    const tmp = doc.data();
    tlb.push(doc.id);
    td.push(tmp.cnt);
  })
  setDat(td);
  setLb(tlb)
})
  const data = {
    labels: lb,
    datasets: [
      {
        label: 'candidate',
        backgroundColor: ['#7579e7','#9ab3f5' ,'#a3d8f4'],
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 0,
        hoverBackgroundColor: ['#b9fffc','#b9fffc' ,'#b9fffc'] ,
        hoverBorderColor: ['#7579e7','#9ab3f5' ,'#a3d8f4'],
        data: dat
      }
    ]
  };
  return(
        <React.Fragment>
        <Bar
          data={data}
          width={100}
          height={50}
          options={{
            maintainAspectRatio: true,
            scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
          }}
        />
        <Doughnut
            data={data}
            />
        </React.Fragment>

    )
}