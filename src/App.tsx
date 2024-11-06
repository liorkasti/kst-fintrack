import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {ModalProvider} from './contexts/ModalContext';
import RootStackScreen from './navigation';
import {persistor, store} from './store';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ModalProvider>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent={true}
          />
          <RootStackScreen />
        </ModalProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
