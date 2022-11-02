export type Word = {
	id: string | number;
	createdAt: Date;

  word: string;
  wordTranslation: string;
};

export type AppWord = Omit<Word, 'id' | 'createdAt'>;
