import React, {useState, useRef, useEffect } from 'react';
import { KeyboardAvoidingView, View, TextInput, TouchableOpacity, ImageBackground, StyleSheet, Keyboard } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Task from '../task';
import AsyncStorage from '@react-native-async-storage/async-storage';

const hamburger = {uri: 'https://media.discordapp.net/attachments/639282516997701652/977054342161002506/hamburger.png?width=461&height=461'};
const done = {uri: 'https://media.discordapp.net/attachments/736824455170621451/976293111456231434/done.png?width=461&height=461'};
const add = {uri: 'https://media.discordapp.net/attachments/639282516997701652/976293252082839582/plus.png?width=461&height=461'}
const exit2 = {uri: 'https://media.discordapp.net/attachments/639282516997701652/976293251759898664/exit.png?width=461&height=461'};
const clock = {uri: 'https://media.discordapp.net/attachments/639282516997701652/977030033736617994/clock.png?width=461&height=461'};

const TaskApp = ( {navigation} ) => {
    const [task, setTask] = useState();
    const [taskItems, setTaskItems] = useState([]);
    const buttons = {hamburger, add, exit2, clock}
    const [isAVisible, setIsAVisible] = useState(false);
    const [finish, setFinish] = useState(true)
    const [hamburgerSign, sethamburgerSign] = useState(true)

    const storeTask = async() => {
      try {
        await AsyncStorage.setItem(
          'Task1', JSON.stringify(taskItems));
      } catch (error) {
      // Error saving data
      }
    }
    
    const loadTask = async () => {
      try {
        const value = await AsyncStorage.getItem('Task1');
        const json = JSON.parse(value);
        setTaskItems(json || [])
        if (json !== null) {
        }
      } catch (error) {
        // Error retrieving data
      }
    };
    console.log('taskItems:',taskItems)

    useEffect(() => {
      loadTask();
    }, [])
  
    const shouldSave = useRef(false);
  
    useEffect(() => { 
      if(taskItems.length || shouldSave.current){ 
        if(shouldSave.current){
          storeTask();
        }else{
          shouldSave.current = true;
        }
      }
    }, [taskItems]);

    const openMenu = () => {
        sethamburgerSign(!hamburgerSign)
        setFinish(!finish)
        setIsAVisible(prev => !prev)
      }
      const handleAddTask = () => {
        Keyboard.dismiss();
        setTaskItems([...taskItems, task]);
        setTask(null);
        storeTask([taskItems]);
      }
      const completeTask = (index) => {
        let itemsCopy = [...taskItems];
        itemsCopy.splice(index, 1);
        setTaskItems(itemsCopy);
        console.log(index)
      };
    
      

    const Stack = createNativeStackNavigator();
    return (
    <View style={styles.container}>
    <View style={styles.tasksWrapper}>
      <View style={styles.items}>
      {
        taskItems.map((item, index) => {
              return (
                <TouchableOpacity key={index}  onPress={() => completeTask(index)}>
                  <Task text={item} /> 
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>
    {/*Write a task*/} 
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.writeTaskWrapper}>
      <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={text => setTask(text)}/>
    <View style={styles.buttonRow}>

    {isAVisible && (
    <TouchableOpacity onPress={() => openConfig()}> 
      {/* Opens config for creation (i.e. calendar, timer, repetition, etc). */}
        <View style={styles.addWrapper}>
          <ImageBackground source={buttons.clock} alt='button' resizeMode="cover" style={styles.hamburgerButton} />
        </View>
      </TouchableOpacity>
    )}

      {isAVisible && (
      <TouchableOpacity onPress={() => handleAddTask()}> 
      {/* add (plus) button which does handleAddTask. */}
        <View style={styles.addWrapper}>
          <ImageBackground source={buttons.add} alt='button' resizeMode="cover" style={styles.hamburgerButton} />
        </View>
      </TouchableOpacity>
      )}

      <TouchableOpacity onPress={() => openMenu()}> 
      {/* Onpress opens menu, then shows exit button to go back and revert menu to one button. */}
        <View style={styles.addWrapper}>
          {/*<Text style={hamburgerSign ? styles.addText : styles.removeText}>+</Text>*/}
          <ImageBackground source={buttons.hamburger} alt='button' resizeMode="cover" style={hamburgerSign ? styles.hamburgerButton : styles.removeSign} />
          <ImageBackground source={buttons.exit2} alt='button' resizeMode="cover" style={finish ? styles.removeSign : styles.hamburgerButton}/>
        </View>
      </TouchableOpacity>
    </View>
    </KeyboardAvoidingView>
  </View>
)
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#E8EAED',
    },
    sectionTitle: {
      color: 'black',
      fontSize: 24,
      fontWeight: 'bold',
      fontFamily: 'monospace',
    },
    tasksWrapper: {
      paddingTop: 80,
      paddingHorizontal: 20,
    },
    items : {
      marginTop: 30,
    },
    writeTaskWrapper: {
      position: 'absolute',
      bottom: 60,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'flex-end',
    },
    input: {
      bottom: 0,
      paddingVertical: 15,
      paddingHorizontal: 15,
      backgroundColor: '#FFF',
      borderRadius: 60,
      borderColor: '#C0C0C0',
      borderWidth: 1,
      width: 250,
    },
    addWrapper: {
      width: 60,
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 60,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#C0C0C0',
      borderWidth: 1,
    },
    hamburgerButton: {
      width: '100%',
      height: 60,
      flex: 1,
      justifyContent: "center",
    },
    buttonRow: {
      alignItems: 'center', 
    },
    removeSign: {
      display: 'none',
      width: 60,
      height: 60,
    },
  });

export default TaskApp;