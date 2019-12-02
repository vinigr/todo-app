import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 10px;
  background-color: ${props => props.theme.PRIMARY_COLOR};
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-left: 6px;
`;

export const ButtonAdd = styled.TouchableOpacity`
  height: 50px;
  width: 50px;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.TEXT_COLOR};
  border-radius: 25px;
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
  padding: 10px 4px;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const ContentTask = styled.View`
  flex-direction: row;
  width: 92%;
  justify-content: space-between;
`;

export const ButtonTask = styled.TouchableOpacity`
  width: 80%;
`;

export const TaskText = styled.Text`
  font-size: 22px;
  margin-left: 10px;
  text-align: left;
  color: ${props => props.theme.TEXT_COLOR};
`;

export const TaskHour = styled.Text`
  font-size: 22px;
  color: ${props => props.theme.TEXT_COLOR};
`;
