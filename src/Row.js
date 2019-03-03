import React from 'react';

import style from './Row.module.scss';

const Row = (props) => {
  const { standing, index } = props;
  const { team, position, crest, total, away, home } = standing;
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

export default Row;
