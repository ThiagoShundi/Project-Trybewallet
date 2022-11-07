import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { expenseEdit } from '../redux/actions';

class Table extends Component {
  handleClickDelet = (target) => {
    const { expenses, dispatch } = this.props;
    const filterExpenses = expenses.filter((del) => del.id !== target);
    console.log(filterExpenses);
    dispatch(expenseEdit(filterExpenses));
  };

  handleClickEdit = () => {};

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
              expenses.map((exp) => (
                <tr key={ exp.id }>
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
                      data-testid="edit-btn"
                      type="button"
                      onClick={ this.handleClickEdit }
                    >
                      Editar
                    </button>
                    <button
                      data-testid="delete-btn"
                      type="button"
                      onClick={ () => { this.handleClickDelet(exp.id); } }
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
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string })).isRequired,
};

export default connect(mapStateToProps)(Table);
