import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Todo1 from './src/components/Todo1';
import {Provider} from 'react-redux';
import myStore from './src/redux/store';

const Stack = createNativeStackNavigator();

export class App extends Component {
  render() {
    return (
      <Provider store={myStore}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Todo1" component={Todo1} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
