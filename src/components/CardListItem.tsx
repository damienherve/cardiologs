import React from 'react';
import {Card, Status} from 'src/api/types';
import styled from 'styled-components/native';

const getBackgroundColor = (status: Status) => {
  switch (status) {
    case 'DONE':
      return '#8F8';
    case 'REJECTED':
      return '#F88';
    case 'PENDING':
      return '#FF8';
  }
};

const CardContainer = styled.Pressable<{status: Status}>`
  background-color: ${props => getBackgroundColor(props.status)};
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  border-radius: 10px;
  border-width: 3px;
  border-color: lightgray;
  margin-top: 10px;
`;

const LeftContainer = styled.View`
  flex: 1;
  padding: 10px;
`;

const RightContainer = styled.View`
  flex: 1;
  padding: 10px;
`;

const Title = styled.Text`
  color: black;
  font-weight: bold;
  font-size: 16px;
`;

const Content = styled.Text`
  color: black;
  font-size: 16px;
`;

const ArrhythmiaText = styled.Text`
  color: black;
`;

interface CardProps {
  card: Card;
  onCardPressed?: (id: number) => void;
}

export const CardListItem: React.FC<CardProps> = ({card, onCardPressed}) => {
  const date = new Date(card.created_date);
  console.log(card);
  return (
    <CardContainer
      key={card.id}
      status={card.status}
      onPress={() => onCardPressed?.(card.id)}>
      <LeftContainer>
        <Title>Patient</Title>
        <Content>{card.patient_name}</Content>
        <Title>Date</Title>
        <Content>{date.toLocaleDateString()}</Content>
      </LeftContainer>
      <RightContainer>
        <Title>Arrhytmias</Title>
        {card.arrhythmias.map(arrhythmia => (
          <Content>{arrhythmia}</Content>
        ))}
      </RightContainer>
    </CardContainer>
  );
};
