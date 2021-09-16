import {Status} from '@api';
import {Button} from '@components';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';

const StatusFilterContainer = styled.View`
  flex-direction: row;
  margin-top: 10px;
  margin-bottom: 10px;
  justify-content: space-evenly;
`;

interface StatusFilterProps {
  defaultActiveFilter?: Status;
  onFilterChange?: (status?: Status) => void;
}

export const StatusFilter: React.FC<StatusFilterProps> = ({
  defaultActiveFilter,
  onFilterChange,
}) => {
  const [activeFilter, setActiveFilter] = useState<Status | undefined>(
    defaultActiveFilter,
  );

  useEffect(() => {
    onFilterChange?.(activeFilter);
  }, [onFilterChange, activeFilter]);

  const onPress = (status: Status) => {
    setActiveFilter(status === activeFilter ? undefined : status);
  };
  return (
    <StatusFilterContainer>
      <Button
        onPress={() => onPress('PENDING')}
        status={'PENDING'}
        selected={activeFilter === 'PENDING'}>
        {'Pending'}
      </Button>
      <Button
        onPress={() => onPress('REJECTED')}
        status={'REJECTED'}
        selected={activeFilter === 'REJECTED'}>
        {'Rejected'}
      </Button>
      <Button
        onPress={() => onPress('DONE')}
        status={'DONE'}
        selected={activeFilter === 'DONE'}>
        {'Done'}
      </Button>
    </StatusFilterContainer>
  );
};
