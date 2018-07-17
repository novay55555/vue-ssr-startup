import axios from 'axios'

export const fetchRepos = payload =>
  axios.get('https://api.github.com/search/repositories', {
    params: Object.assign(
      {
        page: 1,
        per_page: 10
      },
      payload
    )
  })
