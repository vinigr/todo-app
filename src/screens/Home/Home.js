import React, {useState, useEffect} from 'react';
import {StatusBar, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {
  Container,
  Header,
  Data,
  ButtonAdd,
  Dia,
  DataText,
  Tasks,
  TaskText,
  Task,
} from './styles';

import pt from 'date-fns/locale/pt';
import format from 'date-fns/format';

import {Activities} from '../../database';

const Home = props => {
  const [activities, setActivities] = useState([]);
  const [date, setDate] = useState(new Date());

  const [dateVisible, setDateVisible] = useState(false);

  useEffect(() => {
    const activitiesData = Activities.data();
    setActivities(
      activitiesData.filter(
        activity =>
          format(activity.screduledAt, 'd/M/y') === format(date, 'd/M/y'),
      ),
    );
  }, [date]);

  const showDateTimePicker = () => {
    setDateVisible(true);
  };

  const hideDatePicker = () => {
    setDateVisible(false);
  };

  const handleConfirm = value => {
    setDate(value);
    hideDatePicker();
  };

  const {screenProps} = props;

  const colorStatus =
    screenProps.theme.mode === 'LIGHT' ? 'dark-content' : 'light-content';

  return (
    <Container>
      <StatusBar
        backgroundColor={screenProps.theme.PRIMARY_COLOR}
        barStyle={colorStatus}
      />
      <Header>
        <Data onPress={showDateTimePicker}>
          <Dia>{format(date, 'EEEE', {locale: pt})}</Dia>
          <DataText>{format(date, ', d LLL', {locale: pt})}</DataText>
        </Data>
        <ButtonAdd onPress={() => props.navigation.navigate('NewActivity')}>
          <Icon name="plus" color={screenProps.theme.PRIMARY_COLOR} size={30} />
        </ButtonAdd>
      </Header>

      <Tasks>
        {activities.map(activity => (
          <Task key={activity.id}>
            {activity.completed ? (
              <>
                <TouchableOpacity
                  onLongPress={() => console.log('segura')}
                  onPress={() => console.log('click')}>
                  <Icon name="check-circle-outline" color="#00cc08" size={30} />
                </TouchableOpacity>
                <TaskText>{activity.title}</TaskText>
              </>
            ) : (
              <>
                <TouchableOpacity>
                  <Icon
                    name="checkbox-blank-circle-outline"
                    color={screenProps.theme.TEXT_COLOR}
                    size={30}
                  />
                </TouchableOpacity>
                <TaskText>{activity.title}</TaskText>
              </>
            )}
          </Task>
        ))}
      </Tasks>
      <DateTimePickerModal
        date={date}
        value={date}
        isVisible={dateVisible}
        isDarkModeEnabled={true}
        mode="date"
        is24Hour={true}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </Container>
  );
};

export default Home;
