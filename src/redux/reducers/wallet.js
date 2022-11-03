// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_STATE = {
  isFetching: false,
  error: '',
  apidata: '',
  data: [],
  currencies: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'API_DATA':
    return {
      ...state,
      currencies: Object.keys(action.currencies),
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
  case 'DATA_CHANGE':
    return {
      ...state,
      data: [...state.data, action.data],
    };
  default:
    return state;
  }
};

export default wallet;
