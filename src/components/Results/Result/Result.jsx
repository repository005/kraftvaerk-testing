import React from 'react';
import styles from './Result.module.scss';
import { ReactComponent as BookIcon } from '../../../assets/images/book.svg';

const Result = ({data}) => {
  return (
    <div
      className={styles.result}
    >
      <BookIcon className={styles['book-icon']}/>
      <p>{data.name}</p>
    </div>
  );
};

export default Result;