import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getStandings, sortStandings } from './actions/standings';
import {
  getStandingsList, getStandingsLoading, getApiError
} from './reducers/standings';
import Button from './Button';

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

  renderRow = (standing, index) => {
    const { team, position, crest, total, away, home } = standing
    const columns = [
      'PTS-points','PG-playedGames','W-won','D-draw','L-lost','GF-goalsFor','GA-goalsAgainst'
    ];
    return (
      <div key={`${team}row`} className={index === 19 ? style.rowLast : style.row}>
        <div key={`${team}firstColumn`} className={style.firstColumn}>
          <div id="position" key={`${team}countColHead`} className={style.countColHead}>
            {position}
          </div>
          <div key={`${team}teamColHead`} className={style.teamColHead}>
            <img className={style.crest} src={crest} alt="" />
            {team}
          </div>
        </div>
        <div key={`${team}total`} className={style.total}>
          {columns.map(column => (
            <div key={`${team}total${column.split('-')[0]}`}>
              {total[column.split('-')[1]]}
            </div>
          ))}
        </div>
        <div key={`${team}home`} className={style.home}>
          {columns.map(column => (
            <div key={`${team}total${column.split('-')[0]}`}>
              {home[column.split('-')[1]]}
            </div>
          ))}
        </div>
        <div key={`${team}away`} className={style.away}>
          {columns.map(column => (
            <div key={`${team}total${column.split('-')[0]}`}>
              {away[column.split('-')[1]]}
            </div>
          ))}
        </div>
      </div>
    )
  }

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
