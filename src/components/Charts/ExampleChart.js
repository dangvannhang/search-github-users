import React from 'react'
import ReactFC from 'react-fusioncharts'
import FusionCharts from 'fusioncharts'
import Column2D from 'fusioncharts/fusioncharts.charts'
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion'

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme)
const chartData = [
  {
    label: 'VietName',
    value: 30,
  },
  {
    label: 'US',
    value: 25,
  },
]

const chartConfigs = {
  type: 'column2d',
  width: 600,
  height: 400,
  dataFormat: 'json',
  dataSource: {
    chart: {
      caption: 'Countries with most Oil Reseerves [2017-18]',
      subCaption: 'In MMbbl = One Million barrels',
      xAxisName: 'Country',
      yAxisName: 'Reverves (MMbbl)',
      numberSuffix: 'K',
      theme: 'fusion',
    },
    data: chartData,
  },
}

const ChartComponent = () => {
  return <ReactFC {...chartConfigs}></ReactFC>
}

export default ChartComponent
