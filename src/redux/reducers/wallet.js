// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_STATE = {
  isFetching: false,
  error: '',
  expenses: [],
  currencies: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'API_DATA_CURRENCIES':
    return {
      ...state,
      currencies: action.currencies,
    };
  case 'REQUEST_API':
    return {
      ...state,
      isFetching: true,
    };
  case 'FAILED_REQUEST':
    return {
      ...state,
      error: action.error,
    };
  case 'EXPENSES_CHANGE':
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  case 'EXPENSES_EDIT':
    return {
      ...state,
      expenses: action.expenses,
    };
  default:
    return state;
  }
};

export default wallet;
