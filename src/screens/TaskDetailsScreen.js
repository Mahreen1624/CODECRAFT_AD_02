import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

const TaskDetailsScreen = ({route, navigation}) => {
  // Retrieve the task passed as a parameter
  const {task} = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.description}>{task.description}</Text>
      <Text
        style={[styles.status, {backgroundColor: getStatusColor(task.status)}]}>
        {task.status}
      </Text>
      <Pressable
        style={styles.editButton}
        onPress={() => navigation.navigate('TaskForm', {task})}>
        <Text style={styles.editButtonText}>Edit Task</Text>
      </Pressable>
    </View>
  );
};

// You can re-use the getStatusColor function from your TaskListScreen or import it
const getStatusColor = status => {
  switch (status) {
    case 'Todo':
      return 'red';
    case 'In Progress':
      return 'yellow';
    case 'Complete':
      return 'green';
    default:
      return 'gray';
  }
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20},
  title: {fontSize: 24, fontWeight: 'bold'},
  description: {fontSize: 16, marginVertical: 10},
  status: {padding: 10, borderRadius: 5, color: 'white', fontWeight: 'bold'},
  editButton: {
    marginTop: 20,
    backgroundColor: 'orange',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  editButtonText: {color: 'white', fontWeight: 'bold'},
});

export default TaskDetailsScreen;
