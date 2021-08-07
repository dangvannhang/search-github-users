import React from 'react'
import { Info, Repos, User, Search, Navbar } from '../components'
import loadingImage from '../images/preloader.gif'
import { GithubContext } from '../context/context'
const Dashboard = () => {
  return (
    <main>
      <h2>Dashboard Page</h2>
      <Info></Info>
      <Repos></Repos>
      <User></User>
      <Search></Search>
      <Navbar></Navbar>
    </main>
  )
}

export default Dashboard
