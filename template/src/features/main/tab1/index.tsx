import React from 'react';
import { ActionSheet, Container, Header, LoadingHud, Text, TouchableOpacity } from 'components';
import { Dialog } from 'components/Dialog';
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
              {
                text: 'Show dialog',
                onPress: () => {
                  Dialog.show({
                    title: 'Hello you',
                    message: 'cancel',
                    buttons: [
                      {
                        text: 'Cancel',
                        isCancel: true,
                      },
                      {
                        text: 'Done',
                      },
                    ],
                  });
                },
              },
              {
                text: 'Show dialog with input',
                onPress: () => {
                  Dialog.show({
                    title: 'Hello you',
                    message: 'cancel',
                    buttons: [
                      {
                        text: 'Cancel',
                        isCancel: true,
                      },
                      {
                        text: 'Done',
                      },
                    ],
                    inputProps: {
                      placeholder: 'Enter your name',
                    },
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
