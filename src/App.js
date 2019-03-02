import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getStandings } from './actions/standings';

import style from './App.module.scss';

class App extends Component {
  componentDidMount = async () => {
    const { getStandings } = this.props;
    await getStandings()
  }

  render() {
    return (
      <div className={style.app}>
        Test
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
  getStandings: () => dispatch(getStandings())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
