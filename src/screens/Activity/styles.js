import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 10px;
  background-color: ${props => props.theme.PRIMARY_COLOR};
`;

export const Title = styled.Text`
  padding: 4px 10px;
  font-size: 24px;
  color: ${props => props.theme.TEXT_COLOR};
`;

export const SubTitle = styled.Text`
  padding: 4px 10px;
  font-size: 16px;
  color: ${props => props.theme.TEXT_COLOR};
`;

export const TextDate = styled.Text`
  padding: 4px 10px;
  font-size: 14px;
  color: ${props => props.theme.TEXT_COLOR};
`;

export const ViewInput = styled.View`
  background-color: ${props => props.theme.INPUT};
  flex-direction: row;
  align-items: center;
`;

export const InputEdit = styled.TextInput`
  background-color: ${props => props.theme.INPUT};
  border-radius: 6px;
  padding: 10px 8px;
  color: ${props => props.theme.TEXT_COLOR};
  font-size: 16px;
  width: 100%;
`;

export const ButtonInput = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.SAVE};
  padding: 0 8px;
`;
