import React from 'react';
import Result from './Result/Result';
import styles from './Results.module.scss';

const Results = ({data}) => {
  return (
    <div className={styles.wrapper}>
      {data.map(item => (
        <Result data={item} key={item.id} />
      ))}
    </div>
  );
};

export default Results;
