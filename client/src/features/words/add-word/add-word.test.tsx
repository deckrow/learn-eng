import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../../../utils/test/test.utils';

import AddWord from './add-word.component';

describe('add-word component', () => {
  it('should be able to type in input', () => {
    renderWithProviders(<AddWord />);

    const inputElement: HTMLInputElement = screen.getByTestId('word');
    fireEvent.change(inputElement, { target: { value: 'word' } });

    expect(inputElement.value).toBe('word');
  });

  it('should have an empty input when the word was added', async () => {
    renderWithProviders(<AddWord />);

    const buttonElement: HTMLButtonElement = screen.getByTestId('addButton');
    const inputElement: HTMLInputElement = screen.getByTestId('word');
    const inputElement2: HTMLInputElement = screen.getByTestId('word2');

    fireEvent.change(inputElement, { target: { value: 'word' } });
    fireEvent.change(inputElement2, { target: { value: 'слово' } });
    fireEvent.click(buttonElement);

		await waitFor(() => expect(inputElement.value).toBe(''));
  });
});
