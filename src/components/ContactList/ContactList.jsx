import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ContactList.module.css';
import stylesApp from '../../components/App.module.css';

class ContactList extends Component {
  render() {
    const { contacts, handleDelete } = this.props;
    return (
      <div className={styles.listAbonent}>
        {contacts.map(({ name, number, id }, index) => (
          <li className={styles.item_contact} key={index}>
            <div className={styles.text_contact}>
              <span>{name} </span>
              <span className={styles.accent_text}>{number}</span>
            </div>
            <button
              type="button"
              className={stylesApp.btn}
              onClick={() => handleDelete(id)}
            >
              delete
            </button>
          </li>
        ))}
      </div>
    );
  }
}
export default ContactList;

ContactList.protoTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
    })
  ),
  handleDelete: PropTypes.func.isRequired,
};
