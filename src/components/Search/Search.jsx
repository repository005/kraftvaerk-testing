import React, { useState, useEffect, useMemo } from 'react';
import { sortArrayByValue } from '../../helpers/utils';
import { ReactComponent as SearchIcon } from '../../assets/images/search.svg';
import { ReactComponent as CloseIcon } from '../../assets/images/close.svg';
import Loader from '../Tools/Loader';
import styles from './Search.module.scss';
import Results from '../Results/Results';
import cn from 'classnames';

const Search = () => {
  const [searchInput, setSearchInput] = useState('');
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [clickedOutside, setClickedOutside] = useState(false);

  useEffect(() => {
    const clickOut = (e) => {
      if (!e.target.closest(`.${styles.wrapper}`)) {
        setClickedOutside(true);
      }
    };

    window.addEventListener('mousedown', clickOut);

    return () => {
      window.removeEventListener('mousedown', clickOut);
    };
  }, [clickedOutside]);

  async function loadList() {
    setLoading(true);

    try {
      let response = await fetch(
        'https://api.github.com/orgs/kraftvaerk/repos'
      );
      let json = await response.json();
      let sortedList = sortArrayByValue(json, 'string', 'name');

      let modifiedList = sortedList.map((item) => {
        return {
          id: item.id,
          name: item.name,
          url: item.html_url,
        };
      });

      setList(modifiedList);
      setLoading(false);

      if (errorMessage) {
        setErrorMessage(null);
      }
      filterList(searchInput);
    } catch (err) {
      setLoading(false);
      setErrorMessage('Something went wrong');
    }
  }

  const filterList = (key) => {
    const newList = list.filter((item) =>
      item.name.toLowerCase().includes(key.toLowerCase())
    );
    setFilteredList(newList);
  };

  const activeDropdown = useMemo(() => {
    return !!filteredList.length && searchInput.length > 1 && !clickedOutside;
  }, [filteredList, searchInput, clickedOutside]);

  return (
    <div className={styles.navbar}>
      <div className={styles.wrapper}>
        <label className={styles.label}>
          <input
            className={styles.input}
            placeholder="Type anything..."
            type="text"
            value={searchInput}
            onFocus={() => setClickedOutside(false)}
            onChange={(e) => {
              e.preventDefault();
              if (!list.length) {
                loadList();
              }
              filterList(e.target.value);
              setSearchInput(e.target.value);
            }}
          />

          <SearchIcon
            className={cn(styles['input-icon'], styles['search-icon'])}
          />

          {!!searchInput.length && !loading && (
            <CloseIcon
              className={cn(styles['input-icon'], styles['close-icon'])}
              onClick={() => setSearchInput('')}
            />
          )}

          {loading && <Loader />}
        </label>

        <div
          className={styles['results-wrapper']}
        >
          {activeDropdown && <Results data={filteredList} />}
          {errorMessage && <div>{errorMessage}</div>}
        </div>
      </div>
    </div>
  );
};

export default Search;
