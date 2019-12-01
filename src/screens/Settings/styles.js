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
  font-weight: bold;
`;

export const TextTheme = styled.Text`
  color: ${props => props.color};
  font-weight: bold;
  font-size: 16px;
`;

export const OptionsTheme = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const ButtonTheme = styled.TouchableOpacity`
  background-color: ${props => props.color};
  flex-direction: row;
  align-items: center;
  padding: 10px 20px;
  border-radius: 4px;
  border: 1px ${props => props.theme.TEXT_COLOR};
  width: 46%;
`;
