import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getStandings, sortStandings } from './actions/standings';
import {
  getStandingsList, getStandingsLoading, getApiError
} from './reducers/standings';
import Button from './Button';
import Row from './Row';

import style from './App.module.scss';

class App extends Component {
  state = {
    sort: {
      which: 'total-position',
      order: 'ascending'
    }
  }

  componentDidMount = () => {
    const { getStandings } = this.props;
    getStandings()
  }

  handleClick = (e) => {
    const { id } = e.target;
    const { sortStandings } = this.props;
    const { sort } = this.state;
    const { which, order } = sort;
    if (which === id && order === 'ascending') {
      sort.order = 'descending';
      sortStandings(sort);
      this.setState({ sort });
    } else if (which === id && order === 'descending') {
      sort.order = 'ascending';
      sortStandings(sort);
      this.setState({ sort });
    } else {
      sort.which = id;
      sort.order = 'ascending';
      sortStandings(sort);
      this.setState({ sort });
    }
  }

  renderButton = (type, column, label) => {
    const { sort } = this.state;
    return (
      <Button data={{ sort, type, column, label }} handleClick={e => this.handleClick(e)}/>
    )
  }

  renderTitles = (type) => {
    return (
      <div className={style[type]}>
        <div>{this.renderButton(type, 'points', 'PTS')}</div>
        <div>{this.renderButton(type, 'playedGames', 'PLD')}</div>
        <div>{this.renderButton(type, 'won', 'W')}</div>
        <div>{this.renderButton(type, 'draw', 'D')}</div>
        <div>{this.renderButton(type, 'lost', 'L')}</div>
        <div>{this.renderButton(type, 'goalsFor', 'GF')}</div>
        <div>{this.renderButton(type, 'goalsAgainst', 'GA')}</div>
      </div>
    )
  }

  renderRow = (standing, index) => (
    <Row
      key={`rowComponent${standing.team}`}
      standing={standing}
      index={index}
    />
  )

  render() {
    const { standings, standingsLoading, apiError } = this.props;

    return (
      <div className={style.app}>
        {apiError && <div className={style.error}>Error: {apiError}</div>}
        {standingsLoading && <div className={style.loading}>Loading...</div>}
        {!standingsLoading && !apiError && (
            <div className={style.container}>
              <header className={style.mainHeader}>
                <h3>Standings</h3>
                <div></div>
              </header>
              <div className={style.headerOne}>
                <div></div>
                <div>Clips</div>
                <div className={style.homeLabel}>At Home</div>
                <div className={style.awayLabel}>Away</div>
              </div>
              <div className={style.headerTwo}>
                <div className={style.positionHolder}>
                  <div className={style.countColHead}>
                    {this.renderButton('total', 'position', '#')}
                  </div>
                  <div className={style.teamColHead}></div>
                </div>
                {this.renderTitles('total')}
                {this.renderTitles('home')}
                {this.renderTitles('away')}
              </div>
              {standings && standings.map((standing, index) => {
                return this.renderRow(standing, index)
              })
              }
            </div>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  standings: getStandingsList(state),
  standingsLoading: getStandingsLoading(state),
  apiError: getApiError(state)
})

const mapDispatchToProps = dispatch => ({
  getStandings: () => dispatch(getStandings()),
  sortStandings: (sort) => dispatch(sortStandings(sort))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
