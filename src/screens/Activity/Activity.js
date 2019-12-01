import React, {useState, useEffect, useRef} from 'react';
import {TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import AlertPro from 'react-native-alert-pro';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import format from 'date-fns/format';

import {
  Container,
  Title,
  TextDate,
  SubTitle,
  ViewInput,
  ButtonInput,
  InputEdit,
} from './styles';

import {Tasks, Task, TaskText} from '../../screens/Home/styles';
import {
  ButtonAddSub,
  TextAddSub,
  Input,
  ButtonDelete,
  SubAtividade,
  ButtonSalvar,
  TextSalvar,
} from '../NewActivity/styles';

import {Activities, SubActivities} from '../../database';

const Activity = props => {
  let alert = useRef(null);

  const [subActivities, setSubactivities] = useState([]);
  const [subactivitySelected, setSubactivitySelected] = useState();

  const [subactivityNew, setSubactivityNew] = useState(false);

  const [editTitle, setEditTitle] = useState(false);

  const [textTitle, setTextTitle] = useState();

  const [title, setTitle] = useState();
  const [subtitle, setSubtitle] = useState();

  const {navigation, screenProps} = props;

  const activity = navigation.getParam('activity');

  console.log(activity);

  useEffect(() => {
    if (activity) {
      const subactivitiesData = SubActivities.data();

      setSubactivities(
        subactivitiesData.filter(
          subactivity =>
            subactivity.assignedTo_id === activity.id ||
            subactivity.assignedTo === activity.id,
        ),
      );
    }
  }, [activity]);

  let lastTap;

  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) {
      setEditTitle(true);
      setTextTitle(activity.title);
    } else {
      lastTap = now;
    }
  };

  const handleCheckActivity = (id, index, value) => {
    SubActivities.update(id, {completed: value});

    const subactivitiesSave = [...subActivities];

    subactivitiesSave[index].completed = value;

    setSubactivities(subactivitiesSave);
  };

  const deleteSubActivity = () => {
    SubActivities.remove(subactivitySelected);

    const subactivitiesSave = [...subActivities];

    alert.close();

    setSubactivities(
      subactivitiesSave.filter(
        subactivity => subactivity.id !== subactivitySelected,
      ),
    );
  };

  const saveSubActivity = () => {
    const newActivity = SubActivities.insert({
      title: title,
      subtitle: subtitle,
      completed: false,
      assignedTo: activity.id,
    })[0];

    setSubactivities([...subActivities, newActivity]);

    setSubactivityNew(false);
  };

  const updateTitleActivity = () => {
    const activityEdit = Activities.update(activity.id, {title: textTitle});

    activity.title = activityEdit.title;

    setEditTitle(false);
  };

  const openAlert = id => {
    alert.open();
    setSubactivitySelected(id);
  };

  return (
    <Container>
      {editTitle ? (
        <ViewInput>
          <InputEdit
            value={textTitle}
            onChangeText={text => setTextTitle(text)}
            placeholder="Título"
            placeholderTextColor={screenProps.theme.TEXT_COLOR}
          />
          <ButtonInput onPress={updateTitleActivity}>
            <Icon
              name="check"
              color={screenProps.theme.PRIMARY_COLOR}
              size={30}
            />
          </ButtonInput>
        </ViewInput>
      ) : (
        <TouchableWithoutFeedback onPress={handleDoubleTap}>
          <Title>{activity.title}</Title>
        </TouchableWithoutFeedback>
      )}

      {activity.subtitle && <SubTitle>{activity.subtitle}</SubTitle>}

      <TextDate>
        {activity.hourActive
          ? format(activity.screduledAt, 'dd/M/y  H:mm')
          : format(activity.screduledAt, 'dd/M/y')}
      </TextDate>
      <Tasks>
        {subActivities.map((subactivity, index) => (
          <Task key={subactivity.id}>
            {subactivity.completed ? (
              <>
                <TouchableOpacity
                  onPress={() =>
                    handleCheckActivity(subactivity.id, index, false)
                  }>
                  <Icon name="check-circle" color="#00cc08" size={30} />
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity
                  onPress={() =>
                    handleCheckActivity(subactivity.id, index, true)
                  }>
                  <Icon
                    name="checkbox-blank-circle-outline"
                    color={screenProps.theme.TEXT_COLOR}
                    size={30}
                  />
                </TouchableOpacity>
              </>
            )}
            <TaskText onLongPress={() => openAlert(subactivity.id)}>
              {subactivity.title}
            </TaskText>
          </Task>
        ))}
      </Tasks>
      {subactivityNew && (
        <SubAtividade>
          <ButtonDelete onPress={() => setSubactivityNew(false)}>
            <Icon name="close" color={screenProps.theme.TEXT_COLOR} size={30} />
          </ButtonDelete>
          <Input
            value={title}
            onChangeText={text => setTitle(text)}
            placeholder="Título"
            placeholderTextColor={screenProps.theme.TEXT_COLOR}
          />
          <Input
            value={subtitle}
            onChangeText={text => setSubtitle(text)}
            placeholder="Subtítulo"
            placeholderTextColor={screenProps.theme.TEXT_COLOR}
          />
          <ButtonSalvar onPress={saveSubActivity}>
            <TextSalvar>Salvar</TextSalvar>
          </ButtonSalvar>
        </SubAtividade>
      )}
      <ButtonAddSub onPress={() => setSubactivityNew(true)}>
        <TextAddSub>Adicionar subatividade</TextAddSub>
      </ButtonAddSub>
      <AlertPro
        ref={ref => {
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
            backgroundColor: screenProps.theme.SECONDARY,
          },
          title: {
            color: screenProps.theme.TEXT_COLOR,
          },
        }}
      />
    </Container>
  );
};

export default Activity;
