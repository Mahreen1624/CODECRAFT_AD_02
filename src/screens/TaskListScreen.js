import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  TextInput,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native'; // Import useNavigation hook

//Enum-like object for task statuses( plain JavaScript objects to represent a set of named constants.)

const TaskStatus = {
  TODO: 'Todo',
  IN_PROGRESS: 'In Progress',
  COMPLETE: 'Complete',
};

//Function to get colour based on the status of their task
const getStatusColor = status => {
  switch (status) {
    case TaskStatus.TODO:
      return 'red';
    case TaskStatus.IN_PROGRESS:
      return 'yellow';
    case TaskStatus.COMPLETE:
      return 'green';
    default:
      return 'gray';
  }
};

//now writing the task list screen. What it will do?
//it will hold 2 task already on the screen. Ofcourse by using useState
//its a function..remember its syntax faiqa
const TaskListScreen = () => {
  //this will hold task useState
  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'First Task',
      description: 'PLEase work .......',
      status: TaskStatus.TODO,
    },
    {
      id: '2',
      title: 'Second Task',
      description: 'help!!!!111',
      status: TaskStatus.IN_PROGRESS,
    },
  ]);
  // State to hold the new task name and status that are being added
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskStatus, setNewTaskStatus] = useState('');
  // State to control the visibility of the add task form
  const [isFormVisible, setIsFormVisible] = useState(false); // Fixed: 'false' should be a boolean (false)

  // New state to control if we are editing an existing task (null means no editing)
  const [editingTaskId, setEditingTaskId] = useState(null);

  // Get navigation object from useNavigation hook
  const navigation = useNavigation();

  // Function to add a new task or update an existing task
  const handleAddTask = () => {
    // Check if both title and status are provided, show an error if not
    if (!newTaskTitle || !newTaskStatus) {
      Alert.alert('Error', 'Please provide both title and status'); //not adding description since it is optional
      return;
    }

    // If editingTaskId is not null, update the existing task
    if (editingTaskId) {
      const updatedTasks = tasks.map(task => {
        if (task.id === editingTaskId) {
          return {
            ...task,
            title: newTaskTitle,
            description: newTaskDescription,
            status: newTaskStatus,
          };
        }
        return task;
      });
      setTasks(updatedTasks);
      setEditingTaskId(null);
    } else {
      // Create a new  task
      const newTask = {
        id: Math.random().toString(), // Generating a random id for new task
        title: newTaskTitle,
        description: newTaskDescription,
        status: newTaskStatus,
        type: TaskStatus.TODO, // By default, the contact will have the "General" type
      };

      // Add new tasks to the list of contacts
      setTasks([...tasks, newTask]);
    }

    // Clear the input fields after adding/updating the task
    setNewTaskTitle('');
    setNewTaskDescription('');
    setNewTaskStatus('');
    // Hide the form after adding/updating the task
    setIsFormVisible(false);
  };

  // Function to delete a task by its id
  const handleDelete = id => {
    setTasks(tasks.filter(tasks => tasks.id !== id)); // Remove contact with matching id
  };

  // Function to initiate editing for a specific task
  const handleEdit = task => {
    // Pre-populate the form with the task's data
    setNewTaskTitle(task.title);
    setNewTaskDescription(task.description);
    setNewTaskStatus(task.status);
    setEditingTaskId(task.id);
    setIsFormVisible(true);
  };

  // Render function for each task in the flat list
  const renderTask = ({item}) => {
    // Create a snippet of the description: only the first 5 words are shown
    const descriptionSnippet =
      item.description.split(' ').slice(0, 5).join(' ') + '...';

    // Wrap the task item in a Pressable to navigate to TaskDetails screen
    return (
      <Pressable
        onPress={() => navigation.navigate('TaskDetails', {task: item})}
        style={styles.taskItem}>
        <Text style={styles.taskTitle}>{item.title}</Text>
        <Text style={styles.taskDescription}>{descriptionSnippet}</Text>
        {/* Render only a snippet of the description */}
        <View
          style={[
            styles.statusBadge,
            {backgroundColor: getStatusColor(item.status)},
          ]}>
          <Text style={styles.taskStatus}>{item.status}</Text>
        </View>
        <Pressable
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </Pressable>
        {/* New Edit button to update a task */}
        <Pressable style={styles.editButton} onPress={() => handleEdit(item)}>
          <Text style={styles.editButtonText}>Edit</Text>
        </Pressable>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks} // the array of tasks to display
        keyExtractor={item => item.id} // unique key for each task
        renderItem={renderTask} // how each task item is rendered
        ListHeaderComponent={<Text style={styles.header}>Task List</Text>}
      />

      {/* Conditionally render the add/edit task form */}
      {isFormVisible && (
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Task Title"
            value={newTaskTitle}
            onChangeText={setNewTaskTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Task Description"
            value={newTaskDescription}
            onChangeText={setNewTaskDescription}
          />
          {/* Instead of a text input for status, we add three buttons */}
          <View style={styles.statusButtonsContainer}>
            <Pressable
              style={[
                styles.statusButton,
                newTaskStatus === TaskStatus.TODO &&
                  styles.statusButtonSelected,
              ]}
              onPress={() => setNewTaskStatus(TaskStatus.TODO)}>
              <Text style={styles.statusButtonText}>TODO</Text>
            </Pressable>
            <Pressable
              style={[
                styles.statusButton,
                newTaskStatus === TaskStatus.IN_PROGRESS &&
                  styles.statusButtonSelected,
              ]}
              onPress={() => setNewTaskStatus(TaskStatus.IN_PROGRESS)}>
              <Text style={styles.statusButtonText}>In Progress</Text>
            </Pressable>
            <Pressable
              style={[
                styles.statusButton,
                newTaskStatus === TaskStatus.COMPLETE &&
                  styles.statusButtonSelected,
              ]}
              onPress={() => setNewTaskStatus(TaskStatus.COMPLETE)}>
              <Text style={styles.statusButtonText}>Complete</Text>
            </Pressable>
          </View>
          <Pressable style={styles.saveButton} onPress={handleAddTask}>
            <Text style={styles.saveButtonText}>
              {editingTaskId ? 'Update Task' : 'Save Task'}
            </Text>
          </Pressable>
        </View>
      )}

      {/* Button to show the add task form */}
      {!isFormVisible && (
        <Pressable
          style={styles.addButton}
          onPress={() => setIsFormVisible(true)}>
          <Text style={styles.addButtonText}>Add Task</Text>
        </Pressable>
      )}
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {flex: 1, padding: 20},
  header: {fontSize: 24, fontWeight: 'bold', marginBottom: 20},
  taskItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  taskTitle: {fontSize: 18},
  taskDescription: {fontSize: 14, color: 'gray', marginTop: 5},
  statusBadge: {
    padding: 5,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  taskStatus: {color: 'white', fontWeight: 'bold'},
  deleteButton: {
    marginTop: 10,
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  deleteButtonText: {color: 'white', fontWeight: 'bold'},
  // New styles for the Edit button
  editButton: {
    marginTop: 10,
    backgroundColor: 'orange',
    padding: 5,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  editButtonText: {color: 'white', fontWeight: 'bold'},
  addButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {color: 'white', fontWeight: 'bold'},
  formContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {color: 'white', fontWeight: 'bold'},
  // New styles for the status buttons container and buttons
  statusButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  statusButton: {
    padding: 10,
    backgroundColor: 'gray',
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  statusButtonSelected: {
    backgroundColor: 'black',
  },
  statusButtonText: {color: 'white', fontWeight: 'bold'},
});

export default TaskListScreen;
