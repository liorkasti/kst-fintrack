import React from 'react';
import {Provider} from 'react-redux';
import store from './redux/store';
import RootStackScreen from './navigation';
import {StatusBar} from 'react-native';
import {ModalProvider} from './contexts/ModalContext';

const App = () => {
  return (
    <Provider store={store} /* persistor={persistor} */>
      <ModalProvider>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent={true}
        />
        <RootStackScreen />
      </ModalProvider>
    </Provider>
  );
};

export default App;
