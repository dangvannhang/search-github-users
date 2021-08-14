import React, { useState, useEffect } from 'react'
import mockUser from './mockData.js/mockUser'
import mockRepos from './mockData.js/mockRepos'
import mockFollowers from './mockData.js/mockFollowers'
import { rootUrl } from '../constants/application'
import axios from 'axios'

const GithubContext = React.createContext()

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser)
  const [repos, setRepos] = useState(mockRepos)
  const [followers, setFollowers] = useState(mockFollowers)
  // request loading
  const [requests, setRequests] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const checkRequest = () => {
    axios(`${rootUrl}/rate_limit`)
      .then((data) => {
        console.log(data)
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    checkRequest()
  })
  return (
    <GithubContext.Provider value={{ githubUser, repos, followers }}>
      {children}
    </GithubContext.Provider>
  )
}
export { GithubContext, GithubProvider }
