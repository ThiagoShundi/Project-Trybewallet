import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  handleClick = () => {
    // const { expenses } = this.props;
    // const select = document.querySelectorAll('.selected');
    // select.remove();
  };

  render() {
    const { expenses } = this.props;

    return (
      <>
        <div>Table</div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {
              expenses.map((exp, index) => (
                <tr key={ index }>
                  <td>{ exp.description }</td>
                  <td>{ exp.tag }</td>
                  <td>{ exp.method }</td>
                  <td>{ Number(exp.value).toFixed(2) }</td>
                  <td>
                    {
                      exp.exchangeRates[exp.currency].name
                    }
                  </td>
                  <td>{ (Number(exp.exchangeRates[exp.currency].ask)).toFixed(2) }</td>
                  <td>
                    {
                      (Number(exp.exchangeRates[exp.currency].ask)
                        * Number(exp.value)).toFixed(2)
                    }
                  </td>
                  <td>Real</td>
                  <td>
                    <button
                      data-testid="delete-btn"
                      type="button"
                      onClick={ this.handleClick }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string })).isRequired,
};

export default connect(mapStateToProps)(Table);
