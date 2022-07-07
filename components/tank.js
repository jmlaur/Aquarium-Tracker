import React, {useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Button, TextInput, TouchableOpacity, Text } from 'react-native';
import AddPhoto from './photo';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { useNavigation } from '@react-navigation/native';
import TaskApp from './screens/taskapp';

const AddTank = ({area}) => {
  const [tank, setTank] = useState("");
  const [tankItems, setTankItems] = useState([]);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const[image, setImage] = useState("");
  const navigation = useNavigation();

  const storeTankArray = async() => {
    try {
      await AsyncStorage.setItem(
        'TankItems', JSON.stringify(tankItems));
    } catch (error) {
    // Error saving data
    }
  }

  const loadTankArray = async () => {
    try {
      const value = await AsyncStorage.getItem('TankItems');
      const json = JSON.parse(value);
      setTankItems(json || [])
      if (json !== null) {
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  useEffect(() => {
    loadTankArray();
  }, [])

  const shouldSave = useRef(false);

  useEffect(() => { // when loadTankArray is called it will trigger this useEffect
    if(tankItems.length || shouldSave.current){ // to avoid just saving what you just loaded these check could be added
      if(shouldSave.current){
        storeTankArray();
      }else{
        shouldSave.current = true;
      }
    }
  }, [tankItems]);

  const handleAddTank = () => {
      setTankItems([...tankItems, {text: tank, image}])                       //adds a new profile to tankItems
      setTank(null);                                                          //Removes text in "edit name"
      setImage(null);                                                         //Removes re-rendered image selection.
  }

  const DeleteTank = (index) => {
      let itemsCopy = [...tankItems];
      itemsCopy.splice(index, 1);
      setTankItems(itemsCopy);
  }
  
  useEffect(() => {
      (async () => {
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');
      })();
  }, []);

  const pickImage = async (index) => {
    let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4,3],
    quality:1,
    });
    if(!result.cancelled){ 
    tankItems[index].image = result.uri;
    setTankItems([...tankItems]);
    }
  };

  if (hasGalleryPermission === false){
      return <Text>No access to internal storage.</Text>
  }

  const editTitle = (index, tank) => {
      tankItems[index].text = tank;
      setTank(tank);
      setTankItems([...tankItems])
  }

  const submitHandler = () => { 
      setTank("") 
    }
    
  return ( 
    <View style={styles.container}>
      {
        tankItems.map(({text, image}, index) => {
          return (
            <View>
                <AddPhoto text={text || tankItems[index].text} image={image}/>
                <Button title="Edit photo" color="lightgreen" onPress={() => pickImage(index)}/>
                <TextInput style={styles.input} placeholder={'Edit Tank Name'} value={tank} onChangeText={(tank) => editTitle(index, tank)} onSubmitEditing={submitHandler}/>
                <Button key={index} title="Remove tank" style={styles.removeTank} color="orange" onPress={() => DeleteTank(index)}/>
                <Button title="Go to tasks" color="lightblue" onPress={() => navigation.navigate('Tasks')}/>
            </View>
          )
        })
      }
      <Button title="Add Tank" color="lightpink" onPress={() => handleAddTank()}/> 
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  input: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  tankPhoto: {
    flex: 1,
    aspectRatio: 4/3,
    width: '100%',
    margin: 30,
  },
  removeTank: {
    margin: 20,
  }
})

export default AddTank;
