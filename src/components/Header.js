import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      exchange: 'BRL',
    };
  }

  render() {
    const { email, expenses } = this.props;
    const { exchange } = this.state;

    const values = expenses.map((exp) => (
      Number(exp.exchangeRates[exp.currency].ask) * Number(exp.value)
    ));

    const sumValor = expenses.length !== 0
      ? (values.reduce((acc, val) => acc + val)).toFixed(2) : 0;

    return (
      <>
        <div>TrybeWallet</div>
        <div data-testid="email-field">{ email }</div>
        <div>
          Total despesas:
          {' '}
          <span data-testid="total-field">
            { sumValor }
          </span>
        </div>
        <div data-testid="header-currency-field">{ exchange }</div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string })).isRequired,
};

export default connect(mapStateToProps)(Header);
