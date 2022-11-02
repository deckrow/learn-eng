import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { useAddNewWordMutation }
	from '../../../app/services/words/words.service';

import type { AppWord } from '../../../types/words/words.types';

import { AddWordContainer } from './add-word.styles';

const defaultWordFields: AppWord = {
  word: '',
  wordTranslation: ''
};

const AddWord: FC = () => {
  const [addNewWord, { isSuccess }] = useAddNewWordMutation();
  const [newWord, setNewWord] = useState(defaultWordFields);

  useEffect(() => {
    if (isSuccess) {
      setNewWord(defaultWordFields);
    }
  }, [isSuccess]);

  const onFormSubmitted = async (e: FormEvent) => {
    e.preventDefault();

    if (newWord.word && newWord.wordTranslation) {
      await addNewWord(newWord);
    }
  };

  const onInputChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewWord((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <AddWordContainer>
      <h1>add a new word</h1>

      <form onSubmit={onFormSubmitted}>
        <input
          type='text'
          name='word'
					data-testid='word'
          value={newWord.word}
          onChange={onInputChanged}
        />

        <input
          type='text'
          name='wordTranslation'
					data-testid='word2'
          value={newWord.wordTranslation}
          onChange={onInputChanged}
        />

        <button data-testid='addButton' type='submit'>add</button>
      </form>
    </AddWordContainer>
  );
};

export default AddWord;
