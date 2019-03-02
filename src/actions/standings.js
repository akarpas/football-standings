const API_KEY = '80d7e188fb9a4f2bb915b7d293d78048';

export const getStandings = () => dispatch => {
  dispatch({
    type: 'LOADING_MOVIES',
    payload: 'result'
  })
  const url = `http://api.football-data.org/v2/competitions/PD/standings`
  fetch(url, {
    method: "GET",
    headers: {
        "X-Auth-Token": API_KEY
    },
  }).then(response => response.json())
    .then(data => {
      const { standings } = data;
      dispatch({
        type: 'SET_POPULAR_MOVIES',
        payload: standings
      })
    })
}