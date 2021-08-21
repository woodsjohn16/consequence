import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Bar } from 'react-chartjs-2'

import { makeSelectUserAccounts } from '@redux/selector/userAccounts'

const options = {
  responsive: true,
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
  plugins: {
    legend: {
      display: false,
    },
  }
}

const initialValue = {
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: [],
      borderColor: [],
    },
  ],
}

const MerchantsChart = (props) => {
  const [dataCharts, setDataCharts] = useState(initialValue)
  const { loading } = useSelector(makeSelectUserAccounts)

  useEffect(() => {
    if (
      dataCharts.labels.length <= 0 &&
      dataCharts.datasets[0].data.length <= 0 &&
      props.data
    ) {
      normalizeData(props.data)
    }
  }, [loading, dataCharts])

  const normalizeData = (data) => {
    let normalizedArray = initialValue

    let currentLabel = []
    data.map((d) => {
      currentLabel.push(d.data.description)
    })

    currentLabel.sort()

    currentLabel.map((label) => {
      if (normalizedArray.labels.indexOf(label) === -1) {
        normalizedArray.labels.push(label)
      }
    })

    let currentData = null
    let dataArray = []
    var cnt = 0
    for (let i = 0; i < currentLabel.length; i++) {
      if (currentLabel[i] != currentData) {
        if (cnt > 0) {
          //   normalizedArray.datasets[0].data.push(cnt)
          dataArray.push(cnt)
        }
        currentData = currentLabel[i]
        cnt = 1
      } else {
        cnt++
      }
    }

    const reducer = (accumulator, curr) => accumulator + curr
    const overallTotal = dataArray.reduce(reducer)
    for (let i = 0; i < dataArray.length; i++) {
      normalizedArray.datasets[0].data.push(Math.ceil((dataArray[i] / overallTotal) * 100))
      // console.log((dataArray[i]/overallTotal) * 100)
    }

    // console.log(dataArray)

    for (let i = 0; i < normalizedArray.datasets[0].data.length; i++) {
      if (currentLabel[i] != currentData) {
        const x = Math.floor(Math.random() * 256)
        const y = Math.floor(Math.random() * 256)
        const z = Math.floor(Math.random() * 256)
        const bgColor = 'rgb(' + x + ',' + y + ',' + z + ')'
        normalizedArray.datasets[0].backgroundColor.push(bgColor)
      } else {
        cnt++
      }
    }

    setDataCharts(normalizedArray)
  }

  return (
    <>
      {!loading && (
        <div className="chart-container">
          <div className="header">
            <h1 className="title">Transaction by Merchant</h1>
          </div>
          <Bar data={dataCharts} options={options} />
        </div>
      )}
    </>
  )
}

export default MerchantsChart
