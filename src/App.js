import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getStandings } from './actions/standings';
import { getStandingsList, getStandingsLoading } from './reducers/standings';

import style from './App.module.scss';

class App extends Component {
  componentDidMount = async () => {
    const { getStandings } = this.props;
    await getStandings()
  }

  render() {
    const { standings } = this.props;
    console.warn('standings ', standings)
    return (
      <div className={style.app}>
        Test
      </div>
    );
  }
}

const mapStateToProps = state => ({
  standings: getStandingsList(state),
  standingsLoading: getStandingsLoading(state)
})

const mapDispatchToProps = dispatch => ({
  getStandings: () => dispatch(getStandings())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
