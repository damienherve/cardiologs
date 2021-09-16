import React from 'react';
import {PressableProps} from 'react-native';
import {Status} from 'src/api/types';
import styled from 'styled-components/native';

const ButtonContainer = styled.Pressable<ButtonTextProps>`
  overflow: hidden;
  border-radius: 10px;
  border-width: 3px;
  border-color: ${({selected}) => (selected ? '#22F' : 'lightgray')};
`;

interface ButtonTextProps {
  readonly selected: boolean;
  status: Status;
}

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

const ButtonText = styled.Text<ButtonTextProps>`
  background-color: ${({status}) => getBackgroundColor(status)};
  padding: 10px;
  overflow: hidden;
`;

interface ButtonProps extends PressableProps, ButtonTextProps {}

export const Button: React.FC<ButtonProps> = ({
  children,
  selected,
  status,
  ...rest
}) => {
  return (
    <ButtonContainer selected={selected} status={status} {...rest}>
      <ButtonText selected={selected} status={status}>
        {children}
      </ButtonText>
    </ButtonContainer>
  );
};
