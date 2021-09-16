/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {Card, CardsApi, Status} from '@api';
import {CardListItem, Layout, SearchInput, StatusFilter} from '@components';
import React, {useEffect, useState} from 'react';
import {FlatList, ListRenderItem} from 'react-native';
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
    setCards(orderCardsByStatus(updatedCards));
  };

  const renderCard: ListRenderItem<Card> = ({item}) => {
    return <CardListItem card={item} onCardPressed={onCardPressed} />;
  };

  useEffect(() => {
    CardsApi.getCards().then(response => {
      // Reordering cards by status
      // (top) PENDING -> REJECTED -> DONE (bottom)
      const orderedCards = orderCardsByStatus(response.data);
      setCards(orderedCards);
      setFilteredCards(orderedCards);
    });
  }, []);

  const orderCardsByStatus = (array: Array<Card>) => {
    return array.sort((a, b) => {
      const statusToOrder = (s: Status) => {
        switch (s) {
          case 'PENDING':
            return 0;
          case 'REJECTED':
            return 1;
          case 'DONE':
            return 2;
        }
      };
      return statusToOrder(a.status) - statusToOrder(b.status);
    });
  };

  useEffect(() => {
    // Filtering change effect
    var filtered = cards;

    if (activeStatusFilter) {
      //
      const statusFilter = (card: Card) => card.status === activeStatusFilter;
      filtered = filtered.filter(statusFilter);
    }

    if (searchFilter) {
      const lcSearch = searchFilter.toLowerCase();
      // Filtering by patient name or arrythmia
      filtered = filtered.filter(
        card =>
          card.patient_name.toLowerCase().includes(lcSearch) ||
          card.arrhythmias.filter(arr => arr.toLowerCase().includes(lcSearch))
            .length >= 1,
      );
    }

    setFilteredCards(filtered);
  }, [cards, activeStatusFilter, searchFilter]);

  return (
    <Layout>
      <SearchInput onChangeText={text => setSearchFilter(text)} />
      <StatusFilter
        defaultActiveFilter="PENDING"
        onFilterChange={status => setActiveStatusFilter(status)}
      />
      <CardList data={filteredCards} renderItem={renderCard} />
    </Layout>
  );
};

export default App;
