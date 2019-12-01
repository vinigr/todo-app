import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 10px;
  background-color: ${props => props.theme.PRIMARY_COLOR};
`;

export const Title = styled.Text`
  padding: 10px;
  font-size: 24px;
  color: ${props => props.theme.TEXT_COLOR};
`;

export const SubTitle = styled.Text`
  padding: 10px;
  font-size: 20px;
  color: ${props => props.theme.TEXT_COLOR};
`;

export const TextDate = styled.Text`
  padding: 10px;
  font-size: 16px;
  color: ${props => props.theme.TEXT_COLOR};
`;
