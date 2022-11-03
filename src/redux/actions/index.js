// Coloque aqui suas actions
// import getData from '../../helpers/getData';

export const EMAIL_CHANGE = (email) => ({
  type: 'EMAIL_CHANGE',
  email,
});

export const DATA_CHANGE = (data) => ({
  type: 'DATA_CHANGE',
  data,
});

// const getApiData = (apidata) => ({
//   type: 'API_DATA',
//   apidata,
// });

// export function fetchData() {
//   return async (dispatch) => {
//     try {
//       const response = await getData();
//       console.log(response);
//       dispatch(getApiData(response));
//     } catch (e) {
//       console.erro(e.message);
//     }
//   };
// }

function getApiData(currencies) {
  return {
    type: 'API_DATA',
    currencies,
  };
}

function requestApi() {
  return { type: 'REQUEST_API' };
}

function failedRequest(error) {
  return {
    type: 'FAILED_REQUEST',
    error,
  };
}

export function fetchApi() {
  return (dispatch) => {
    dispatch(requestApi());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((apidata) => dispatch(getApiData(apidata)))
      .catch((error) => dispatch(failedRequest(error)));
  };
}
