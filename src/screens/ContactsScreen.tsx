import React, {useState} from 'react';
import {
  FlatList,
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native'; // FlatList to list all contacts

// Enum-like objects for contact types. This is used to track the current status of a contact
const ContactType = {
  GENERAL: 'General',
  FRIENDS_FAMILY: 'Friends & Family',
  UNKNOWN: 'Unknown',
};

// Function to get the color of each tag based on contact type
const getTagColor = type => {
  switch (type) {
    case ContactType.GENERAL:
      return 'lightblue'; // Blue for general contacts
    case ContactType.FRIENDS_FAMILY:
      return 'yellow'; // Yellow for friends & family
    case ContactType.UNKNOWN:
      return 'lightgreen'; // Green for unknown contacts
    default:
      return 'gray'; // Default gray color for unknown types
  }
};

const MyContacts = () => {
  // State to hold the list of contacts (default contains one contact)
  const [contacts, setContacts] = useState([
    {
      id: '1',
      name: 'My Personal Number',
      phone: '0310 8490 1212',
      type: ContactType.GENERAL,
    },
  ]);

  // State to hold the new contact name and phone that are being added
  const [newContactName, setNewContactName] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  // State to control the visibility of the add contact form
  const [isFormVisible, setIsFormVisible] = useState(false); // Fixed: 'false' should be a boolean (false)

  // Function to add a new contact
  const handleAddContact = () => {
    // Check if both name and phone number are provided, show an error if not
    if (!newContactName || !newContactPhone) {
      Alert.alert('Error', 'Please provide both name and phone');
      return;
    }

    // Create a new contact object
    const newContact = {
      id: Math.random().toString(), // Generating a random id for new contact
      name: newContactName,
      phone: newContactPhone,
      type: ContactType.GENERAL, // By default, the contact will have the "General" type
    };

    // Add new contact to the list of contacts
    setContacts([...contacts, newContact]);

    // Clear the input fields after adding the contact
    setNewContactName('');
    setNewContactPhone('');
    // Hide the form after adding the contact
    setIsFormVisible(false);
  };

  // Function to delete a contact by its id
  const handleDelete = id => {
    setContacts(contacts.filter(contact => contact.id !== id)); // Remove contact with matching id
  };

  // Render function for FlatList header
  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>My Contacts</Text>
      <Pressable
        style={styles.headerAddButton}
        onPress={() => setIsFormVisible(true)}>
        <Text style={styles.headerAddText}>Add</Text>
      </Pressable>
    </View>
  );

  // Render function for individual contacts
  const renderItem = ({item}) => (
    <View style={styles.contactItem}>
      <Text style={[styles.type, {backgroundColor: getTagColor(item.type)}]}>
        {item.type}
      </Text>
      <Text style={styles.name}>{item.name}</Text>{' '}
      {/* Fixed: Was using item.type instead of item.name */}
      <Text>{item.phone}</Text>
      {/* Pressable component to delete the contact */}
      <Pressable
        style={styles.deleteButton}
        onPress={() => handleDelete(item.id)}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      {isFormVisible ? (
        <View style={styles.addContactContainer}>
          <Text style={styles.addContactTitleText}>Add New Contact</Text>
          {/* Input field for contact name */}
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={newContactName}
            onChangeText={setNewContactName} // Update state when user types
          />
          {/* Input field for contact phone number */}
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={newContactPhone} // Fixed: Was using newPhoneNumbere (undefined variable)
            onChangeText={setNewContactPhone} // Update state when user types
          />
          {/* Button to add the contact */}
          <Pressable style={styles.addButton} onPress={handleAddContact}>
            <Text style={styles.addButtonText}>Add Contact</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={contacts}
          keyExtractor={item => item.id} // Unique key for each contact
          renderItem={renderItem} // Custom render function for each contact item
          ListHeaderComponent={renderHeader} // Header name for the list
        />
      )}
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {flex: 1, padding: 20},
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerTitle: {fontSize: 20, fontWeight: 'bold'},
  headerAddButton: {backgroundColor: 'blue', padding: 10, borderRadius: 5},
  headerAddText: {color: 'white', fontWeight: 'bold'},
  addContactContainer: {
    padding: 20,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
  },
  addContactTitleText: {fontSize: 18, fontWeight: 'bold', marginBottom: 10},
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {color: 'white', fontWeight: 'bold'},
  contactItem: {padding: 10, borderBottomWidth: 1, borderColor: '#ddd'},
  tag: {padding: 5, borderRadius: 5, marginTop: 5},
  deleteButton: {
    marginTop: 10,
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {color: 'white', fontWeight: 'bold'},
});

export default MyContacts;
