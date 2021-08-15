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
  // request error
  const [error, setError] = useState({ show: false, msg: '' })
  const checkRequest = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data
        setRequests(remaining)
        if (remaining === 0) {
          // throw an error in here
          toggleError(true, 'Sorry, You have exeeded your hourly rate limit')
        }
      })
      .catch((error) => console.log(error))
  }

  function toggleError(show = false, msg = '') {
    setError({ show, msg })
  }
  const searchGithubUser = async (user) => {
    // clear all error before search
    toggleError()
    setIsLoading(true)

    const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
      console.log(err)
    )

    if (response) {
      setGithubUser(response.data)
      const { login, followers_url } = response.data

      // get all repos of users
      axios(`${rootUrl}/users/${login}/repos?per_page=100`).then((response) => {
        console.log('repos', response)
        setRepos(response.data)
      })
      // get all followers of users
      axios(`${followers_url}?per_page=100`).then((response) => {
        console.log('follower', response)
        setFollowers(response.data)
      })
    } else {
      toggleError(true, `Account github doesn't exist`)
    }
    setIsLoading(false)
    checkRequest()
  }

  useEffect(() => {
    checkRequest()
  }, [])

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        searchGithubUser,
        isLoading,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}
export { GithubContext, GithubProvider }
