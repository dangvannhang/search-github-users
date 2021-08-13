import React from 'react'
import styled from 'styled-components'
import { GithubContext } from '../context/context'
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts'
const Repos = () => {
  const { repos } = React.useContext(GithubContext)
  // return an object { css:{label: 'css', value: 3}, js: {label: 'js', value: 3}}
  let languages = repos.reduce((total, item) => {
    const { language } = item
    if (!language) return total
    if (!total[language]) {
      // when run the first time
      total[language] = { label: language, value: 1 }
    } else {
      total[language] = { ...total[language], value: total[language].value + 1 }
    }
    return total
  }, {})

  // return an array object [{label: 'css', value: 2}, {...}]
  languages = Object.values(languages)
  console.log(languages)

  const chartData = [
    {
      label: 'HTML',
      value: 30,
    },
    {
      label: 'CSS',
      value: 25,
    },
    {
      label: 'JS',
      value: 12,
    },
  ]

  return (
    <section className='section'>
      <Wrapper className='section-center'>
        <Pie3D data={chartData}></Pie3D>
      </Wrapper>
    </section>
  )
}

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`

export default Repos
