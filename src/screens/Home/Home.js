import React, {useState, useEffect} from 'react';
import {StatusBar, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import GestureRecognizer from 'react-native-swipe-gestures';

import addDays from 'date-fns/addDays';
import subDays from 'date-fns/subDays';

import Modal from '../../components/ModalActivity/ModalActivity';

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
  ButtonTask,
} from './styles';

import pt from 'date-fns/locale/pt';
import format from 'date-fns/format';

import {Activities} from '../../database';

const Home = props => {
  const [activities, setActivities] = useState([]);
  const [date, setDate] = useState(new Date());

  const [activityActiveIndex, setActivityActiveIndex] = useState();

  const [dateVisible, setDateVisible] = useState(false);

  useEffect(() => {
    Activities.onLoaded(() => {
      const activitiesData = Activities.data();

      setActivities(
        activitiesData.filter(
          activity =>
            format(activity.screduledAt, 'd/M/y') === format(date, 'd/M/y'),
        ),
      );
    });
  }, [date]);

  const hideDatePicker = () => {
    setDateVisible(false);
  };

  const handleConfirm = value => {
    hideDatePicker();
    setDate(value);
  };

  const handleCheckActivity = (id, index, value) => {
    Activities.update(id, {completed: value});

    const activitiesSave = [...activities];

    activitiesSave[index].completed = value;

    setActivities(activitiesSave);
  };

  function onSwipeLeft() {
    const newDate = addDays(date, 1);
    setDate(newDate);
  }

  function onSwipeRight() {
    const newDate = subDays(date, 1);
    setDate(newDate);
  }

  function closeModal() {
    setActivityActiveIndex(null);
  }

  const {screenProps} = props;

  const colorStatus =
    screenProps.theme.mode === 'LIGHT' ? 'dark-content' : 'light-content';

  return (
    <Container>
      <StatusBar
        backgroundColor={screenProps.theme.PRIMARY_COLOR}
        barStyle={colorStatus}
      />
      <GestureRecognizer
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
        config={{velocityThreshold: 0.3, directionalOffsetThreshold: 80}}
        style={{
          flex: 1,
        }}>
        <>
          <Header>
            <Data onPress={() => setDateVisible(true)}>
              <Dia>{format(date, 'EEEE', {locale: pt})}</Dia>
              <DataText>{format(date, ', d LLL', {locale: pt})}</DataText>
            </Data>
            <ButtonAdd onPress={() => props.navigation.navigate('NewActivity')}>
              <Icon
                name="plus"
                color={screenProps.theme.PRIMARY_COLOR}
                size={30}
              />
            </ButtonAdd>
          </Header>

          <Tasks>
            {activities.map((activity, index) => (
              <Task key={activity.id}>
                {activity.completed ? (
                  <>
                    <TouchableOpacity
                      // onLongPress={() => handleCheckActivity(id, false)}
                      onPress={() =>
                        handleCheckActivity(activity.id, index, false)
                      }>
                      <Icon
                        name="check-circle-outline"
                        color="#00cc08"
                        size={30}
                      />
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <TouchableOpacity
                      onPress={() =>
                        handleCheckActivity(activity.id, index, true)
                      }>
                      <Icon
                        name="checkbox-blank-circle-outline"
                        color={screenProps.theme.TEXT_COLOR}
                        size={30}
                      />
                    </TouchableOpacity>
                  </>
                )}
                <ButtonTask onPress={() => setActivityActiveIndex(index)}>
                  <TaskText>{activity.title}</TaskText>
                </ButtonTask>
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
        </>
      </GestureRecognizer>
      {activityActiveIndex !== null && (
        <Modal
          activity={activities[activityActiveIndex]}
          closeModal={closeModal}
        />
      )}
    </Container>
  );
};

export default Home;
