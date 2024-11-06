import React from 'react';
import {StatusBar} from 'react-native';
import {QueryClientProvider} from 'react-query';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {ModalProvider} from './contexts/ModalContext';
import {usePersistedQueryClient} from './hooks/usePersistedQueryClient';
import RootStackScreen from './navigation';
import {persistor, store} from './store';

const App = () => {
  const queryClient = usePersistedQueryClient();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <ModalProvider>
            <StatusBar
              barStyle="dark-content"
              backgroundColor="transparent"
              translucent={true}
            />
            <RootStackScreen />
          </ModalProvider>{' '}
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
