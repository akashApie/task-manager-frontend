import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'react-native-axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { useDispatch } from 'react-redux';
import { addTask } from "../../redux/slices/taskSlice";

const AddTaskScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { user } = useAuth(); 
  const route = useRoute();
  const userId = route.params?.userId || user?._id;
  const dispatch = useDispatch();

  const handleAddTask = async () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert("Validation Error", "Title and Description are required.");
      return;
    }

    setLoading(true);
    try {
        dispatch(addTask( {
            userId,
            title,
            description,
          }))

      Alert.alert("Success", "Task added successfully!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Add New Task</Text>
      </View>
      <Text style={styles.label}>Title</Text>
      <TextInput 
        style={styles.input} 
        value={title} 
        onChangeText={setTitle} 
        placeholder="Enter task title" 
      />
      <Text style={styles.label}>Description</Text>
      <TextInput 
        style={styles.input} 
        value={description} 
        onChangeText={setDescription} 
        placeholder="Enter task description"
        multiline
      />
      <TouchableOpacity 
        style={[styles.addButton, loading && styles.disabledButton]} 
        onPress={handleAddTask} 
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? "Adding..." : "Add Task"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  addButton: {
    backgroundColor: "#C8EE44",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});

export default AddTaskScreen;
