import React from 'react';
import { ActionSheet, Container, Header, LoadingHud, Text, TouchableOpacity } from 'components';
import Toast from 'utils/Toast';

const Tab1Screen = () => {
  return (
    <Container>
      <Header title="Tab 1" />
      <TouchableOpacity
        onPress={() => {
          ActionSheet.show({
            title: 'Choose option',
            buttons: [
              {
                text: 'Show hud',
                onPress: () => {
                  LoadingHud.show();
                  setTimeout(() => {
                    LoadingHud.hide();
                  }, 3000);
                },
              },
              {
                text: 'Show toast',
                onPress: () => {
                  Toast.show({
                    title: 'done',
                    message: 'cancel',
                  });
                },
              },
            ],
          });
        }}>
        <Text>Show action sheet</Text>
      </TouchableOpacity>
    </Container>
  );
};
export default Tab1Screen;
