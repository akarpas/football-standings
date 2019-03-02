import _ from 'lodash';

const initialState = {
  standings: [],
  standingsLoading: false,
}

const setStandings = (state, action) => {
  return { ...state, standings: action.payload, standingsLoading: false };
}

const sortStandings = (state, action) => {
  const { payload } = action;
  const { which, order } = payload;
  const [category,type] = which.split('-');
  const sortedStandings = _(state.standings).orderBy(item => item[category][type]).value();
  return { ...state, standings: order === 'ascending' ? sortedStandings : sortedStandings.reverse() };
}

const setLoading = (state) => {
  return { ...state, standingsLoading: true };
}

export default (state = {initialState}, action) => {
  switch (action.type) {
    case 'LOADING_STANDINGS':
      return setLoading(state);
    case 'SET_STANDINGS':
      return setStandings(state, action);
    case 'SORT_STANDINGS':
      return sortStandings(state, action);
    default:
      return state;
  }
}

export const getStandingsLoading = (state) => state.standings.standingsLoading;
export const getStandingsList = (state) => state.standings.standings;
