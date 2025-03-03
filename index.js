import { registerRootComponent } from 'expo';

import Groceries_App_UI from './Groceries_App_UI';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(Groceries_App_UI);
