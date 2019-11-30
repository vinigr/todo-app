import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  padding: 10px;
  background-color: ${props => props.theme.PRIMARY_COLOR};
`;

export const Titulo = styled.Text`
  color: ${props => props.theme.TEXT_COLOR};
  font-size: 30px;
  margin-bottom: 10px;
  font-weight: bold;
`;

export const Input = styled.TextInput`
  background-color: ${props => props.theme.INPUT};
  border-radius: 6px;
  padding: 10px 8px;
  color: ${props => props.theme.TEXT_COLOR};
  font-size: 16px;
  margin-bottom: 10px;
`;

export const ButtonDate = styled.TouchableOpacity`
  background-color: ${props => props.theme.INPUT};
  border-radius: 6px;
  padding: 14px 8px;
  font-size: 16px;
  margin-bottom: 10px;
`;

export const TextDate = styled.Text`
  color: ${props => props.theme.TEXT_COLOR};
  font-size: 16px;
`;

export const ButtonAddSub = styled.TouchableOpacity`
  border-radius: 6px;
  padding: 10px 4px;
  font-size: 16px;
  margin-bottom: 10px;
  align-self: flex-start;
`;

export const TextAddSub = styled.Text`
  color: ${props => props.theme.TEXT_COLOR};
  font-size: 16px;
`;

export const SubAtividade = styled.View`
  padding: 10px;
  background-color: ${props => props.theme.SECONDARY};
  border-radius: 6px;
`;

export const ButtonDelete = styled.TouchableOpacity`
  border-radius: 6px;
  padding: 2px;
  margin-bottom: 4px;
  align-items: center;
  align-self: flex-end;
`;

export const ButtonSalvar = styled.TouchableOpacity`
  background-color: ${props => props.theme.SAVE};
  border-radius: 6px;
  padding: 14px 8px;
  font-size: 16px;
  margin: 20px 0;
  width: 40%;
  align-items: center;
  align-self: flex-end;
`;

export const TextSalvar = styled.Text`
  color: ${props => props.theme.PRIMARY_COLOR};
  font-size: 20px;
  font-weight: bold;
`;
