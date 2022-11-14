import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';

describe('1 - Testando a aplicação', () => {
  const emailInput = 'email-input';
  const passInput = 'password-input';

  test('Verificar se existe uma págian de Login.', () => {
    renderWithRouterAndRedux(<App />);
    const title = screen.getByText('Hello, TrybeWallet!');
    expect(title).toBeInTheDocument();

    const email = screen.getByTestId(emailInput);
    expect(email).toBeInTheDocument();
    const password = screen.getByTestId(passInput);
    expect(password).toBeInTheDocument();
  });

  test('Verificar o botão.', () => {
    renderWithRouterAndRedux(<App />);

    const buttonDisabled = screen.getByRole('button', { name: /entrar/i });
    expect(buttonDisabled).toBeDisabled();

    const email = screen.getByTestId(emailInput);
    const password = screen.getByTestId(passInput);

    userEvent.type(email, 'abc@mail.com');
    userEvent.type(password, '123');

    expect(buttonDisabled).toBeDisabled();
  });

  test('Verificar se ao clicar no botão, será redirecionado para a próxima página.', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const email = screen.getByTestId(emailInput);
    const password = screen.getByTestId(passInput);

    userEvent.type(email, 'abcd@mail.com');
    userEvent.type(password, '123456');

    const button = screen.getByRole('button', { name: /entrar/i });
    userEvent.click(button);

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });

  test('Verificar os componentes da tela da carteira.', () => {
    renderWithRouterAndRedux(<App />);

    const email = screen.getByTestId(emailInput);
    const password = screen.getByTestId(passInput);
    const emailInputData = 'abcd@mail.com';

    userEvent.type(email, emailInputData);
    userEvent.type(password, '123456');

    const button = screen.getByRole('button', { name: /entrar/i });
    userEvent.click(button);

    const value = screen.getByText(/Total despesas:/i);
    const valueTotal = screen.getByTestId('email-field');

    const emailInputScreen = screen.getByText(emailInputData);

    expect(emailInputScreen).toBeInTheDocument();
    expect(value).toBeInTheDocument();
    expect(valueTotal).toBeInTheDocument('0');
  });

  it('Testa se a despesa corretamente adicionada aos inputs', () => {
    renderWithRouterAndRedux(<Wallet />);

    const valueInput = screen.getByTestId('value-input');
    const description = screen.getByTestId('description-input');
    const button = screen.getByRole('button');

    userEvent.type(valueInput, '50');
    userEvent.type(description, 'Despesas Semanais');
    userEvent.click(button);

    expect(valueInput).not.toBe('');
    expect(description).not.toBe('');
  });
});
