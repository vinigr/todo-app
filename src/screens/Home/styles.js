import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 10px;
  background-color: ${props => props.theme.PRIMARY_COLOR};
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const ButtonAdd = styled.TouchableOpacity`
  height: 40px;
  width: 40px;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.TEXT_COLOR};
  border-radius: 20px;
`;

export const Data = styled.TouchableOpacity`
  flex-direction: row;
  align-items: flex-end;
`;

export const Dia = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: ${props => props.theme.TEXT_COLOR};
`;

export const DataText = styled.Text`
  font-size: 26px;
  color: ${props => props.theme.TEXT_COLOR};
`;

export const Tasks = styled.ScrollView`
  padding: 10px;
  flex: 1;
`;

export const Task = styled.View`
  padding: 10px;
  flex-direction: row;
  align-items: center;
`;

export const TaskText = styled.Text`
  font-size: 26px;
  margin-left: 10px;
  color: ${props => props.theme.TEXT_COLOR};
`;
