import 'react-native-gesture-handler';
import './src/configs';

import { AppRegistry } from 'react-native';

import { name as appName } from './app.json';
import App from './src';

AppRegistry.registerComponent(appName, () => App);
