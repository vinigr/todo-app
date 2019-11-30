import React from 'react';
import {View, Text, StatusBar, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Container, Data, Dia, DataText, Tasks} from './styles';

import pt from 'date-fns/locale/pt';
import format from 'date-fns/format';

const Home = props => {
  const {screenProps} = props;

  const colorStatus =
    screenProps.theme.mode === 'LIGHT' ? 'dark-content' : 'light-content';

  return (
    <Container>
      <StatusBar
        backgroundColor={screenProps.theme.PRIMARY_COLOR}
        barStyle={colorStatus}
      />
      <Data>
        <Dia>{format(new Date(), 'EEEE', {locale: pt})}</Dia>
        <DataText>{format(new Date(), ', d LLL', {locale: pt})}</DataText>
      </Data>
      <Tasks>
        <TouchableOpacity>
          <Icon name="check-circle-outline" color="#00cc08" size={30} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon
            name="checkbox-blank-circle-outline"
            color={screenProps.theme.TEXT_COLOR}
            size={30}
          />
        </TouchableOpacity>
      </Tasks>
    </Container>
  );
};

export default Home;
