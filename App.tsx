import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TaskListScreen from './src/screens/TaskListScreen';
import TaskDetailsScreen from './src/screens/TaskDetailsScreen';
// If you have a separate TaskFormScreen, then import it like this:
// import TaskFormScreen from './src/screens/TaskFormScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TaskList">
        <Stack.Screen
          name="TaskList"
          component={TaskListScreen}
          options={{title: 'Tasks'}}
        />
        <Stack.Screen
          name="TaskDetails"
          component={TaskDetailsScreen}
          options={{title: 'Task Details'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
