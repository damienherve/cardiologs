import {apiClient} from '@config';
import {Card} from './types';

const getCards = () => apiClient.get<Array<Card>>('/cards');

export const CardsApi = {
  getCards,
};
