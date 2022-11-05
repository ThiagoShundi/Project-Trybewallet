import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { emailChange } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      emailInput: '',
      passwordInput: '',
      isButtonDisable: true,
    };
  }

  emailValidation = () => {
    const { emailInput } = this.state;
    return (/[\w-.]+@[\w]+.com/.test(emailInput));
  };

  passwordValidation = () => {
    const maiorQue6 = 6;
    const { passwordInput } = this.state;
    return (passwordInput.length >= maiorQue6);
  };

  onInputChange = () => {
    const validate = (this.emailValidation() && this.passwordValidation());
    this.setState({
      isButtonDisable: !validate,
    });
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, this.onInputChange);
  };

  handleClick = () => {
    const { emailInput } = this.state;
    const { dispatch, history } = this.props;
    dispatch(emailChange(emailInput));
    history.push('/carteira');
  };

  render() {
    const { emailInput, passwordInput, isButtonDisable } = this.state;

    return (
      <>
        <div>Login</div>
        <label htmlFor="login">
          <input
            type="text"
            name="emailInput"
            placeholder="E-mail"
            data-testid="email-input"
            value={ emailInput }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password">
          <input
            type="text"
            name="passwordInput"
            placeholder="Senha"
            data-testid="password-input"
            value={ passwordInput }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          disabled={ isButtonDisable }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Login);
