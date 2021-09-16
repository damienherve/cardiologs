/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {CardsApi} from '@api';
import {CardListItem, Layout, SearchInput, StatusFilter} from '@components';
import React, {useEffect, useState} from 'react';
import {FlatList, ListRenderItem} from 'react-native';
import {Card, Status} from 'src/api/types';
import styled from 'styled-components/native';

const CardList = styled(FlatList as new () => FlatList<Card>)``;

const App: React.FC = () => {
  const [cards, setCards] = useState<Array<Card>>([]);
  const [searchFilter, setSearchFilter] = useState<string | undefined>();
  const [activeStatusFilter, setActiveStatusFilter] = useState<
    Status | undefined
  >();
  const [filteredCards, setFilteredCards] = useState<Array<Card>>([]);

  const onCardPressed = (id: number) => {
    const updatedCards = cards.map(card =>
      card.id === id
        ? ({
            ...card,
            status:
              card.status === 'PENDING' || card.status === 'REJECTED'
                ? 'DONE'
                : 'REJECTED',
          } as Card)
        : card,
    );
    setCards(updatedCards);
  };

  const renderCard: ListRenderItem<Card> = ({item}) => {
    return <CardListItem card={item} onCardPressed={onCardPressed} />;
  };

  useEffect(() => {
    CardsApi.getCards().then(response => {
      setCards(response.data);
      setFilteredCards(response.data);
    });
  }, []);

  useEffect(() => {
    // Filtering
    var filtered = cards;

    if (activeStatusFilter) {
      const statusFilter = (card: Card) => card.status === activeStatusFilter;
      filtered = filtered.filter(statusFilter);
    }

    if (searchFilter) {
      const lcSearch = searchFilter.toLowerCase();
      filtered = filtered.filter(
        card =>
          card.patient_name.toLowerCase().includes(lcSearch) ||
          card.arrhythmias.includes(lcSearch),
      );
    }

    setFilteredCards(filtered);
  }, [cards, activeStatusFilter, searchFilter]);

  return (
    <Layout>
      <SearchInput onChangeText={text => setSearchFilter(text)} />
      <StatusFilter onFilterChange={status => setActiveStatusFilter(status)} />
      <CardList data={filteredCards} renderItem={renderCard} />
    </Layout>
  );
};

export default App;
