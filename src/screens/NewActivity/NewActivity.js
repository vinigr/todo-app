import React, {useState, useEffect, useRef} from 'react';
import {Keyboard} from 'react-native';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import format from 'date-fns/format';

import {
  Container,
  Titulo,
  Input,
  ButtonDate,
  TextDate,
  ButtonSalvar,
  TextSalvar,
  TextAddSub,
  ButtonAddSub,
  SubAtividade,
  ButtonDelete,
} from './styles';

import {Activities, SubActivities} from '../../database';

const NewActivity = props => {
  const inputTitle = useRef(null);
  const inputSubtitle = useRef(null);

  const [title, setTitle] = useState();
  const [subtitle, setSubtitle] = useState();
  const [date, setDate] = useState(new Date());

  const [subActivities, setSubActivities] = useState([]);
  const [dateVisible, setDateVisible] = useState(false);
  const {screenProps} = props;

  useEffect(() => {
    inputTitle.current.focus();
  }, []);

  const hideDatePicker = () => {
    setDateVisible(false);
  };

  const handleConfirm = value => {
    setDate(value);
    hideDatePicker();
  };

  const addSubActivity = () => {
    setSubActivities([
      ...subActivities,
      {
        title: '',
        subtitle: '',
      },
    ]);
  };

  const deleteSubActivity = index => {
    const activitiesSave = [...subActivities];

    activitiesSave.splice(index, 1);

    setSubActivities(activitiesSave);
  };

  const updateTitle = (text, index) => {
    const activitiesSave = [...subActivities];
    let newEditActivity = {...activitiesSave[index]};
    newEditActivity.title = text;
    activitiesSave[index] = newEditActivity;
    setSubActivities(activitiesSave);
  };

  const updateSubTitle = (text, index) => {
    const activitiesSave = [...subActivities];
    let newEditActivity = {...activitiesSave[index]};
    newEditActivity.subtitle = text;
    activitiesSave[index] = newEditActivity;
    setSubActivities(activitiesSave);
  };

  const saveActivity = () => {
    const activity = Activities.insert({
      title,
      subtitle,
      screduledAt: new Date(date),
      completed: false,
    })[0];

    if (activity) {
      subActivities.map(item => {
        if (item && item.title !== '') {
          SubActivities.insert({
            title: item.title,
            subtitle: item.subtitle,
            completed: false,
            assignedTo: activity.id,
          })[0];
        }
      });
    }

    Keyboard.dismiss();
  };

  return (
    <Container keyboardShouldPersistTaps="handled">
      <Titulo>Nova atividade</Titulo>
      <Input
        ref={inputTitle}
        value={title}
        onChangeText={text => setTitle(text)}
        placeholder="Título"
        placeholderTextColor={screenProps.theme.INPUT_PLACEHOLDER}
        returnKeyType="next"
        onSubmitEditing={() => inputSubtitle.current.focus()}
      />
      <Input
        ref={inputSubtitle}
        value={subtitle}
        onChangeText={text => setSubtitle(text)}
        placeholder="Subtítulo"
        placeholderTextColor={screenProps.theme.INPUT_PLACEHOLDER}
      />
      <ButtonDate onPress={() => setDateVisible(true)}>
        <TextDate>{format(date, 'd/M/y  H:mm')}</TextDate>
      </ButtonDate>
      <DateTimePickerModal
        date={date}
        value={date}
        isVisible={dateVisible}
        isDarkModeEnabled={true}
        mode="datetime"
        is24Hour={true}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      {subActivities.map((activity, index) => (
        <SubAtividade key={index}>
          <ButtonDelete onPress={() => deleteSubActivity(index)}>
            <Icon name="close" color={screenProps.theme.TEXT_COLOR} size={30} />
          </ButtonDelete>
          <Input
            value={activity.title}
            onChangeText={text => updateTitle(text, index)}
            placeholder="Título"
            placeholderTextColor={screenProps.theme.TEXT_COLOR}
          />
          <Input
            value={activity.subTitle}
            onChangeText={text => updateSubTitle(text, index)}
            placeholder="Subtítulo"
            placeholderTextColor={screenProps.theme.TEXT_COLOR}
          />
        </SubAtividade>
      ))}
      <ButtonAddSub onPress={addSubActivity}>
        <TextAddSub>Adicionar subatividade</TextAddSub>
      </ButtonAddSub>
      <ButtonSalvar onPress={saveActivity}>
        <TextSalvar>Salvar</TextSalvar>
      </ButtonSalvar>
    </Container>
  );
};

export default NewActivity;
