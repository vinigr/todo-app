import React, {useState, useEffect} from 'react';
import Modal from 'react-native-modal';

import format from 'date-fns/format';

import {Container, Title, TextDate, SubTitle} from './styles';

import {SubActivities} from '../../database';

const ModalActivity = props => {
  const [subActivities, setSubactivities] = useState([]);

  const {activity} = props;

  useEffect(() => {
    if (activity) {
      SubActivities.get({assignedTo: activity.id});
    }
  }, [activity, activity.id]);

  return (
    <Modal isVisible={true} onBackButtonPress={props.closeModal}>
      <Container>
        <Title>{activity.title}</Title>
        {activity.subtitle && <SubTitle>{activity.subtitle}</SubTitle>}

        <TextDate> {format(activity.screduledAt, 'dd/M/y  HH:mm')}</TextDate>
      </Container>
    </Modal>
  );
};

export default ModalActivity;
