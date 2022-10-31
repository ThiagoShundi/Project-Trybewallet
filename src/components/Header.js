import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      totalSpent: 0,
      exchange: 'BRL',
    };
  }

  render() {
    const { email } = this.props;
    const { totalSpent, exchange } = this.state;

    return (
      <>
        <div>TrybeWallet</div>
        <div data-testid="email-field">{ email }</div>
        <div data-testid="total-field">
          Total de despesas:
          {' '}
          { totalSpent }
        </div>
        <div data-testid="header-currency-field">{ exchange }</div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
