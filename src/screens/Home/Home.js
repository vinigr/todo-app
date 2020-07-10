import React, {useState, useEffect, useRef} from 'react';
import {StatusBar, TouchableOpacity, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AlertPro from 'react-native-alert-pro';

import GestureRecognizer from 'react-native-swipe-gestures';

import addDays from 'date-fns/addDays';
import subDays from 'date-fns/subDays';

import {
  Container,
  Header,
  Data,
  ButtonAdd,
  Dia,
  DataText,
  TaskText,
  Task,
  ButtonTask,
  ContentTask,
  TaskHour,
} from './styles';

import pt from 'date-fns/locale/pt';
import format from 'date-fns/format';

import {Activities} from '../../database';
import {useTheme} from '@react-navigation/native';

const Home = (props) => {
  let alert = useRef(null);

  const [activities, setActivities] = useState([]);
  const [date, setDate] = useState(new Date());
  const [activitySelected, setActivitySelected] = useState();
  const [loading, setLoading] = useState(true);

  const [dateVisible, setDateVisible] = useState(false);

  const {colors, dark} = useTheme();

  useEffect(() => {
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  const fetchData = () => {
    setLoading(true);
    Activities.onLoaded(() => {
      const activitiesData = Activities.data();

      setActivities(
        activitiesData.filter(
          (activity) =>
            format(activity.screduledAt, 'd/M/y') === format(date, 'd/M/y'),
        ),
      );

      setLoading(false);
    });
  };

  const hideDatePicker = () => {
    setDateVisible(false);
  };

  const handleConfirm = (value) => {
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

  const deleteSubActivity = () => {
    Activities.remove(activitySelected);

    const activitiesSave = [...activities];

    alert.close();

    setActivities(
      activitiesSave.filter(
        (subactivity) => subactivity.id !== activitySelected,
      ),
    );
  };

  const openAlert = (id) => {
    alert.open();
    setActivitySelected(id);
  };

  const {screenProps} = props;

  const colorStatus = dark ? 'dark-content' : 'light-content';

  return (
    <Container>
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
              <Icon name="plus" color={colors.background} size={30} />
            </ButtonAdd>
          </Header>

          <FlatList
            data={activities}
            keyExtractor={(item) => item.id}
            onRefresh={fetchData}
            refreshing={loading}
            renderItem={({item, index}) => (
              <Task>
                {item.completed ? (
                  <>
                    <TouchableOpacity
                      onPress={() =>
                        handleCheckActivity(item.id, index, false)
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
                      onPress={() => handleCheckActivity(item.id, index, true)}>
                      <Icon
                        name="checkbox-blank-circle-outline"
                        color={screenProps.theme.TEXT_COLOR}
                        size={30}
                      />
                    </TouchableOpacity>
                  </>
                )}
                <ContentTask>
                  <ButtonTask
                    onPress={() =>
                      props.navigation.navigate('Activity', {activity: item})
                    }
                    onLongPress={() => openAlert(item.id)}>
                    <TaskText>{item.title}</TaskText>
                  </ButtonTask>
                  {item.hourActive && (
                    <TaskHour>{format(item.screduledAt, 'HH:mm')}</TaskHour>
                  )}
                </ContentTask>
              </Task>
            )}
          />
        </>
      </GestureRecognizer>
      <DateTimePickerModal
        date={date}
        value={date}
        isVisible={dateVisible}
        isDarkModeEnabled={true}
        mode="date"
        is24Hour={true}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        timePickerModeAndroid="spinner"
      />
      <AlertPro
        ref={(ref) => {
          alert = ref;
        }}
        title={'Apagar atividade?'}
        textConfirm="Sim"
        textCancel="Não"
        useNativeDriver
        onCancel={() => alert.close()}
        onConfirm={deleteSubActivity}
        customStyles={{
          container: {
            backgroundColor: colors.SECONDARY,
          },
          title: {
            color: colors.TEXT_COLOR,
          },
        }}
      />
    </Container>
  );
};

export default Home;
