const initialState = {
  standings: [],
  standingsLoading: false,
}

const setStandings = (state, action) => {
  return { ...state, standings: action.payload, standingsLoading: false };
}

const setLoading = (state) => {
  return { ...state, standingsLoading: true };
}

export default (state = {initialState}, action) => {
  switch (action.type) {
    case 'LOADING_STANDINGS':
      return setLoading(state);
    case 'SET_POPULAR_MOVIES':
      return setStandings(state, action);
    default:
      return state;
  }
}

export const getStandingsLoading = (state) => state.standings.standingsLoading;
export const getStandings = (state) => state.standings.standings;
