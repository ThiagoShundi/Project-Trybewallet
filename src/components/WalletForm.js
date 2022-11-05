import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchApiCurrencies,
  expenseChange } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: [],
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchApiCurrencies());
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  handleClick = async () => {
    const { dispatch } = this.props;
    const { id } = this.state;

    const request = await fetch('https://economia.awesomeapi.com.br/json/all');
    const requestJson = await request.json();
    delete requestJson.USDT;

    this.setState({
      exchangeRates: requestJson,
    });

    dispatch(expenseChange({ ...this.state, exchangeRates: requestJson }));

    this.setState({
      id: id + 1,
      value: '',
      description: '',
    });
  };

  render() {
    const { value, description, tag, method, currency } = this.state;
    const { currencies } = this.props;

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
            id="currency"
            name="currency"
            data-testid="currency-input"
            value={ currency }
            onChange={ this.handleChange }
          >
            {
              currencies.map((currncy) => (
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
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
