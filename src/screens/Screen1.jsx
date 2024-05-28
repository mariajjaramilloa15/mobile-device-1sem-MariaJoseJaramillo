import React, { useEffect, useState } from "react";
import { Text, ScrollView, View, StyleSheet, Image, TouchableOpacity, Alert, TextInput, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import client from "../../api/client";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export const Screen1 = () => {
    const navigation = useNavigation();
    const [users, setUsers] = useState([]);
    const [isEditing, setIsEditing] = useState(null); // Track if a user is being edited
    const [editForm, setEditForm] = useState({ fullname: '', email: '', password: '', role: '' });
    const AVATAR_FALLBACK_URL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-SnDtnoTbs_JJtNW62ALeA4gKPtpCGcQ5CnVEJNNAddxjuLwrbo1c16rExrxYL4xLmIw";

    const fetchUsers = async () => {
        try {
            const response = await client.get('/users');
            setUsers(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const startEditing = (user) => {
        setIsEditing(user.id);
        setEditForm({ fullname: user.fullname, email: user.email, password: '', role: user.role });
    };

    const cancelEditing = () => {
        setIsEditing(null);
        setEditForm({ fullname: '', email: '', password: '', role: '' });
    };

    const handleEdit = async (id) => {
        try {
            await client.patch(`/users/edit/${id}`, editForm); // Updated to PATCH and correct route
            setIsEditing(null);
            fetchUsers();
            Alert.alert("User updated successfully");
        } catch (error) {
            console.error(error);
            Alert.alert("Failed to update user");
        }
    };

    const deleteUser = async (id) => {
        try {
            await client.delete(`/users/remove/${id}`); // Updated to correct route
            setUsers(users.filter(user => user.id !== id));
            Alert.alert("User deleted successfully");
        } catch (error) {
            console.error(error);
            Alert.alert("Failed to delete user");
        }
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.listContainer}>
                    {users.map((user) => (
                        <View key={user.id} style={styles.userItem}>
                            {user.avatar && (
                               <Image
                               source={{uri: user.avatar ? `http://192.168.116.32:3001/uploads/users/${user.avatar}` : AVATAR_FALLBACK_URL}}

                               style={{ width: 50, height: 50, borderRadius: 25 }}
                           />

                            )}
                            {isEditing === user.id ? (
                                <View style={styles.userContent}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Full Name"
                                        value={editForm.fullname}
                                        onChangeText={(value) => setEditForm({ ...editForm, fullname: value })}
                                    />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Email"
                                        value={editForm.email}
                                        onChangeText={(value) => setEditForm({ ...editForm, email: value })}
                                    />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Password"
                                        value={editForm.password}
                                        onChangeText={(value) => setEditForm({ ...editForm, password: value })}
                                    />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Role"
                                        value={editForm.role}
                                        onChangeText={(value) => setEditForm({ ...editForm, role: value })}
                                    />
                                    <Button title="Guardar" onPress={() => handleEdit(user.id)} />
                                    <Button title="Cancelar" onPress={cancelEditing} />
                                </View>
                            ) : (
                                <View style={styles.userContent}>
                                    <Text style={styles.userName}>{user.fullname}</Text>
                                    <Text style={styles.userEmail}>{user.email}</Text>
                                    <Text style={styles.userRole}>{user.role}</Text>

                                </View>
                            )}
                            <View style={styles.buttonsContainer}>
                                <TouchableOpacity onPress={() => startEditing(user)}>
                                    <Ionicons name="pencil" size={24} color="black" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => deleteUser(user.id)}>
                                    <Ionicons name="trash" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 70,
        paddingHorizontal: 20,
    },
    listContainer: {
        flex: 1,
        width: '100%',
    },
    userItem: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#F8F7F7',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 10,
    },
    userContent: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 10,
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        width: '100%',
    },
});