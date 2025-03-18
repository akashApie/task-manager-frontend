import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../screens/SignIn';
import SignUpScreen from '../screens/SignUp';
import TaskDetailsScreen from '../screens/TaskDetails';
import AddTaskScreen from '../screens/AddTask';
import EditTaskScreen from '../screens/EditTask';

const AuthStack = createStackNavigator();

const AuthNavigator = () => {

  return (
    <AuthStack.Navigator
      initialRouteName={'SignIn'}
      screenOptions={{
        headerShown: false,
      }}
    >
        <>
          <AuthStack.Screen name="SignIn" component={SignInScreen} />
          <AuthStack.Screen name="SignUp" component={SignUpScreen} />
          <AuthStack.Screen name="TaskDetails" component={TaskDetailsScreen} />
          <AuthStack.Screen name="AddTask" component={AddTaskScreen} />
          <AuthStack.Screen name="EditTask" component={EditTaskScreen} />
        </>
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
