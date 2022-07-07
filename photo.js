import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, TextInput, ImageBackground, Image } from 'react-native';

const AddPhoto = (props) => {
const add = {uri: 'https://media.discordapp.net/attachments/639282516997701652/976293252082839582/plus.png?width=461&height=461'}
    return (
        <View style={styles.container}>
          <Text style={styles.tankTitle}>{props.text || JSON.stringify(props.jsonText)}</Text>
            {!!props.image && <Image source={{uri: props.image || props.jsonImage}} style={styles.tankPhoto} />}
            
        </View>
    )
}


const styles = StyleSheet.create({
  container: {
    borderColor: '#C0C0C0',
    borderWidth: 1,
    backgroundColor: '#FFF',
    width: '100%',
    height: 'auto',
    flex: 1,
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    margin: 30,
  },
  tankPhoto: {
    flex: 1,
    aspectRatio: 4/3,
    width: '100%',
    margin: 30,
  },
  tankTitle: {
    color: 'black',
    margin: 10,
    fontSize: 25,
    fontWeight: 'bold',
  }
})

export default AddPhoto;