import React from 'react';
import styles from './Filter.module.css';
import stylesApp from '../../components/App.module.css';
import PropTypes from 'prop-types';

export const Filter = ({ value, onChange } = this.props) => {
  return (
    <div className={styles.filter_wrapper}>
      <label className={stylesApp.label_input}>
        Filter
        <input
          className={stylesApp.field}
          type="text"
          value={value}
          onChange={onChange}
        />
      </label>
    </div>
  );
};
export default Filter;

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
