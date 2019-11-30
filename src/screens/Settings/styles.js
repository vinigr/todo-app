import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.PRIMARY_COLOR};
  padding: 10px;
`;

export const Titulo = styled.Text`
  color: ${props => props.theme.TEXT_COLOR};
  margin-bottom: 20px;
  font-size: 24px;
`;

export const Text = styled.Text`
  color: ${props => props.theme.TEXT_COLOR};
`;

export const ButtonTheme = styled.TouchableOpacity`
  color: ${props => props.theme.TEXT_COLOR};
  flex-direction: row;
  align-items: center;
  padding: 0 10px;
  margin-bottom: 10px;
`;
