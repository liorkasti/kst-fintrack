// src/ReactotronConfig.ts
import Reactotron from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';
import {name as appName} from './app.json';

declare global {
  interface Console {
    tron: typeof Reactotron;
  }
}

const reactotron = Reactotron.configure({
  name: appName,
})
  .useReactNative({
    asyncStorage: false,
    editor: false,
    overlay: false,
  })
  .use(reactotronRedux())
  .connect();

Reactotron.clear?.();
console.tron = Reactotron;

export default reactotron;
