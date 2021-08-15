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

      /**
       * Promise.allSettled() is different with Promise.all
       * Promise.all will reject if one promise in array return a reject
       * Promise.allSettled will run all promise in array without non-stop
       * Wrapper 2 async action into one array of promise
       * */
      await Promise.allSettled([
        axios(`${rootUrl}/users/${login}/repos?per_page=100`),
        axios(`${followers_url}?per_page=100`),
      ])
        .then((results) => {
          /**
           * it look like if respose return an array we will use property of array like const {property} = object
           * or if response return an array, you can write const [property] = object
           * */
          const [repos, followers] = results
          const status = 'fulfilled'
          if (repos.status === status) {
            setRepos(repos.value.data)
          }
          if (followers.status === status) {
            setFollowers(followers.value.data)
          }
        })
        .catch((error) =>
          console.log('Error handle Promise.setSettled for repos and followers')
        )
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
