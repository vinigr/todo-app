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
  ButtonHorarioBoolean,
  TextCheck,
} from './styles';

import {Activities, SubActivities} from '../../database';

const NewActivity = props => {
  const inputTitle = useRef(null);
  const inputSubtitle = useRef(null);

  const [title, setTitle] = useState();
  const [subtitle, setSubtitle] = useState();
  const [hourActive, setHourActive] = useState(true);
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
    hideDatePicker();
    setDate(value);
  };

  const addSubActivity = () => {
    setSubActivities([
      ...subActivities,
      {
        title: '',
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

  const saveActivity = () => {
    const activity = Activities.insert({
      title,
      subtitle,
      screduledAt: new Date(date),
      completed: false,
      hourActive,
    })[0];

    if (activity) {
      subActivities.map(item => {
        if (item && item.title !== '') {
          SubActivities.insert({
            title: item.title,
            completed: false,
            assignedTo: activity.id,
          })[0];
        }
      });
    }

    inputTitle.current.clear();
    inputSubtitle.current.clear();
    setSubActivities([]);

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
      <ButtonHorarioBoolean onPress={() => setHourActive(!hourActive)}>
        {!hourActive ? (
          <Icon
            name="checkbox-blank-outline"
            color={screenProps.theme.TEXT_COLOR}
            size={30}
          />
        ) : (
          <Icon
            name="checkbox-marked"
            color={screenProps.theme.TEXT_COLOR}
            size={30}
          />
        )}

        <TextCheck>Definir horário</TextCheck>
      </ButtonHorarioBoolean>
      <ButtonDate onPress={() => setDateVisible(true)}>
        <TextDate>
          {hourActive ? format(date, 'dd/M/y  H:mm') : format(date, 'dd/M/y')}
        </TextDate>
      </ButtonDate>
      <DateTimePickerModal
        date={date}
        value={date}
        isVisible={dateVisible}
        isDarkModeEnabled={true}
        mode={hourActive ? 'datetime' : 'date'}
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
            placeholderTextColor={screenProps.theme.INPUT_PLACEHOLDER}
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
