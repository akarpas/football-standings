import _ from 'lodash';

const API_KEY = '80d7e188fb9a4f2bb915b7d293d78048';

const mergeStandings = (standings) => {
  const [ total, home, away ] = standings;
  const totalSorted = _(total.table).sortBy((item) => item.team.name).value();
  const homeSorted = _(home.table).sortBy((item) => item.team.name).value();
  const awaySorted = _(away.table).sortBy((item) => item.team.name).value();
  const results = totalSorted.map((result, index) => {
    const { team } = result;
    return {
      team: team.name,
      position: result.position,
      total: totalSorted[index],
      home: homeSorted[index],
      away: awaySorted[index],
    }
  })
  return _(results).sortBy((item) => item.position).value()
}

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
      const standingsMerged = mergeStandings(standings)
      dispatch({
        type: 'SET_POPULAR_MOVIES',
        payload: standingsMerged
      })
    })
}