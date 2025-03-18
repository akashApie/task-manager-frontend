import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'react-native-axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { useDispatch } from 'react-redux';
import { updateTask } from "../../redux/slices/taskSlice";

const EditTaskScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { user } = useAuth(); 
  const route = useRoute();
  const task = route.params?.task;
  const dispatch = useDispatch();

  useEffect(()=>{
    console.log("task details",task)
    setTitle(task.title);
    setDescription(task.description);
  },[task])
  const handleEditTask = async () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert("Validation Error", "Title and Description are required.");
      return;
    }

    setLoading(true);
    try {
        dispatch(updateTask( {
            id:task._id,
            title,
            description,
          }))

      navigation.navigate("TaskDetails");
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Update Task</Text>
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
        onPress={handleEditTask} 
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? "Updating..." : "Update Task"}</Text>
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

export default EditTaskScreen;
