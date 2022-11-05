// Coloque aqui suas actions

export const emailChange = (email) => ({
  type: 'EMAIL_CHANGE',
  email,
});

export const expenseChange = (expenses) => ({
  type: 'EXPENSES_CHANGE',
  expenses,
});

export function getApiDataCurrencies(currencies) {
  return {
    type: 'API_DATA_CURRENCIES',
    currencies,
  };
}
export function requestApi() {
  return { type: 'REQUEST_API' };
}

function failedRequest(error) {
  return {
    type: 'FAILED_REQUEST',
    error,
  };
}

export function fetchApiCurrencies() {
  return (dispatch) => {
    dispatch(requestApi());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((apidata) => {
        delete apidata.USDT;
        const currencies = Object.keys(apidata);
        dispatch(getApiDataCurrencies(currencies));
      })
      .catch((error) => dispatch(failedRequest(error)));
  };
}
