import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 10px;
  background-color: ${props => props.theme.PRIMARY_COLOR};
`;

export const Data = styled.View`
  flex-direction: row;
`;

export const Dia = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${props => props.theme.TEXT_COLOR};
`;

export const DataText = styled.Text`
  font-size: 24px;
  color: ${props => props.theme.TEXT_COLOR};
`;

export const Tasks = styled.View`
  padding: 10px;
`;
