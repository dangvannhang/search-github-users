import React from 'react'
import styled from 'styled-components'
import { GithubContext } from '../context/context'
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts'
const Repos = () => {
  const { repos } = React.useContext(GithubContext)
  // return an object { css:{label: 'css', value: 3}, js: {label: 'js', value: 3}}
  let languages = repos.reduce((total, item) => {
    const { language, stargazers_count } = item
    if (!language) return total
    if (!total[language]) {
      // when run the first time
      total[language] = { label: language, value: 1, stars: stargazers_count }
    } else {
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        stars: total[language].stars + stargazers_count,
      }
    }
    return total
  }, {})
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
  /**
   * return an array object [{label: 'css', value: 2}, {...}]
   * only get five object first in array object
   * */
  const mostUsed = Object.values(languages)
    .sort((a, b) => {
      return b.value - a.value
    })
    .slice(0, 5)

  const mostPopular = Object.values(languages)
    .sort((a, b) => {
      return b.stars - a.stars
    })
    .map((item) => {
      return { ...item, value: item.stars }
    })
    .slice(0, 5)
  console.log(mostPopular)

  return (
    <section className='section'>
      <Wrapper className='section-center'>
        <Pie3D data={mostUsed}></Pie3D>
        <div></div>
        <Doughnut2D data={mostPopular}></Doughnut2D>
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
