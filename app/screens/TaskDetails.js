import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { DataTable, Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, deleteTask } from "../../redux/slices/taskSlice";
import { changePassword,logout } from "../../redux/slices/changePasswordSlice";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const TaskDetailsScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const user = useSelector((state) => state.auth);
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const { passwordChangeSuccess, error: passwordError } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.user?.id) {
      dispatch(fetchTasks({ id: user.user.id }));
    }
  }, [dispatch, user]);

  useEffect(()=>{
console.log("tasks",tasks)
  },[tasks])
  useEffect(() => {
    if (passwordChangeSuccess) {
      Alert.alert("Success", "Password updated successfully");
      setModalVisible(false);
      setOldPassword("");
      setNewPassword("");
    }
    if (passwordError) {
      Alert.alert("Error", passwordError);
    }
  }, [passwordChangeSuccess, passwordError]);

  const handleAddTask = () => {
    navigation.navigate("AddTask", { userId: user.user.id });
  };

  const handleEditTask = (task) => {
    navigation.navigate("EditTask", { task });
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigation.replace("SignIn"); 
  };

  const handlePasswordChange = () => {
    if (!oldPassword || !newPassword) {
      Alert.alert("Error", "Both fields are required");
      return;
    }
      dispatch(changePassword({ userId: user.user.id, oldPassword, newPassword }))
    .unwrap()
    .then((res) => {
      Alert.alert("Success", "Password changed successfully");
    })
    .catch((err) => {
      Alert.alert("Error", err || "Something went wrong");
    });
    setModalVisible(false)
  };

  if (loading)
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#C8EE44" />
      </View>
    );
  if (error)
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Task List</Text>
        <Button mode="contained" onPress={handleAddTask} style={styles.addButton}>
          <Text style={styles.buttonText}>Add Task</Text>
        </Button>
      </View>

      <DataTable style={styles.table}>
        <DataTable.Header style={styles.tableHeader}>
          <DataTable.Title style={styles.cell}>Title</DataTable.Title>
          <DataTable.Title style={styles.cell}>Description</DataTable.Title>
          <DataTable.Title style={styles.cell}>Actions</DataTable.Title>
        </DataTable.Header>

        <FlatList
          data={tasks}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <DataTable.Row style={styles.row}>
              <DataTable.Cell style={styles.cell}>{item.title}</DataTable.Cell>
              <DataTable.Cell style={styles.cell}>{item.description}</DataTable.Cell>
              <DataTable.Cell style={styles.actionCell}>
                <TouchableOpacity onPress={() => handleEditTask(item)} style={[styles.iconButton,styles.iconSpacing]}>
                  <FontAwesome name="pencil" size={18} color="#007bff" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteTask(item._id)} style={styles.iconButton}>
                  <FontAwesome name="trash" size={18} color="#dc3545" />
                </TouchableOpacity>
              </DataTable.Cell>
            </DataTable.Row>
          )}
        />
      </DataTable>

      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Change Password</Text>
            <TextInput
              placeholder="Current Password"
              style={styles.input}
              secureTextEntry
              value={oldPassword}
              onChangeText={setOldPassword}
            />
            <TextInput
              placeholder="New Password"
              style={styles.input}
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <Button mode="contained" onPress={handlePasswordChange} style={styles.modalButton}>
              <Text style={styles.buttonText}>Update Password</Text>
            </Button>
            <Button mode="text" onPress={() => setModalVisible(false)}>
              Cancel
            </Button>
          </View>
        </View>
      </Modal>

      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={() => setModalVisible(true)} style={styles.changePasswordButton}>
          <Text style={styles.buttonText}>Password-Reset</Text>
        </Button>
        <Button mode="contained" onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.buttonText}>Logout</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 16,
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
  },
  table: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3,
  },
  tableHeader: {
    backgroundColor: "#C8EE44",
  },
  cell: {
    padding: 8,
    color: "#333",
  },
  row: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 16,
  },
  changePasswordButton: {
    backgroundColor: "#C8EE44",
    flex: 1,
    marginRight: 8,
  },
  logoutButton: {
    backgroundColor: "#dc3545",
    flex: 1,
    marginLeft: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 10,
    borderBottomWidth: 1,
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: "#C8EE44",
    marginTop: 10,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  iconButton: {
    padding: 8,
  },
  iconSpacing: {
    marginRight: 15,
  },
});

export default TaskDetailsScreen;
