import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchApi, DATA_CHANGE } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      currency: '',
      description: '',
      tag: '',
      method: '',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchApi());
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  handleClick = () => {
    const { value, description, tag, method, currencies } = this.state;
    const { dispatch } = this.props;
    dispatch(DATA_CHANGE(value, description, tag, method, currencies));
    this.setState({
      value: '',
      currency: '',
      description: '',
      tag: '',
      method: '',
    });
  };

  render() {
    const { value, description, tag, method, currency } = this.state;
    const { currencies } = this.props;

    const newCurriencies = currencies;
    currencies.splice(1, 1);

    return (
      <>
        <div>WalletForm</div>
        <label htmlFor="value">
          Valor:
          <input
            type="text"
            id="value"
            name="value"
            data-testid="value-input"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currencies">
          Moeda:
          <select
            id="currencies"
            name="currencies"
            data-testid="currency-input"
            value={ currency }
            onChange={ this.handleChange }
          >
            {
              newCurriencies.map((currncy) => (
                <option value={ currncy } key={ currncy }>{ currncy }</option>
              ))
            }
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento:
          <select
            id="method"
            name="method"
            data-testid="method-input"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          TAG:
          <select
            id="tag"
            name="tag"
            required
            data-testid="tag-input"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            id="description"
            name="description"
            data-testid="description-input"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar despesas
        </button>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.wallet.data,
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.shape.isRequired,
  // currencies: PropTypes.shape.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
