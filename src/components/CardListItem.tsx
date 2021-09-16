import {Card, Status} from '@api';
import {Button} from '@components';
import React from 'react';
import styled from 'styled-components/native';

const getBorderColor = (status: Status) => {
  switch (status) {
    case 'DONE':
      return '#8F8';
    case 'REJECTED':
      return '#F88';
    case 'PENDING':
      return '#FF8';
  }
};

const CardContainer = styled.View<{status: Status}>`
  background-color: #cde4f1;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  border-radius: 10px;
  border-width: 3px;
  border-color: ${props => getBorderColor(props.status)};
  margin-top: 10px;
`;

const ColumnContainer = styled.View`
  flex: 1;
  padding: 10px;
`;

const Title = styled.Text`
  color: black;
  font-weight: bold;
  font-size: 16px;
`;

const TitleWithMargin = styled(Title)`
  margin-top: 10px;
`;

const Content = styled.Text`
  color: black;
  font-size: 16px;
`;

interface CardProps {
  card: Card;
  onCardPressed?: (id: number) => void;
}

export const CardListItem: React.FC<CardProps> = ({card, onCardPressed}) => {
  const date = new Date(card.created_date);

  const getButtonText = (status: Status) => {
    switch (status) {
      case 'DONE':
        return 'Reject';
      default:
        return 'Done';
    }
  };

  return (
    <CardContainer status={card.status} key={card.id}>
      <ColumnContainer>
        <Title>Patient</Title>
        <Content>{card.patient_name}</Content>
        <TitleWithMargin>Date</TitleWithMargin>
        <Content>{date.toLocaleDateString()}</Content>
      </ColumnContainer>
      <ColumnContainer>
        <Title>Arrhytmias</Title>
        {card.arrhythmias.map((arrhythmia, index) => (
          <Content key={index}>{arrhythmia}</Content>
        ))}
      </ColumnContainer>
      <ColumnContainer>
        <Button onPress={() => onCardPressed?.(card.id)}>
          {getButtonText(card.status)}
        </Button>
      </ColumnContainer>
    </CardContainer>
  );
};
