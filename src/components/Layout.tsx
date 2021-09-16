import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  padding-left: 20px;
  padding-right: 20px;
  flex: 1;
`;

const SafeArea = styled.SafeAreaView`
  flex: 1;
  background-color: #eee;
`;

export const Layout: React.FC = ({children}) => (
  <SafeArea>
    <Container>{children}</Container>
  </SafeArea>
);
