import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Touchable } from 'react-native';
import * as SecureStore from 'expo-secure-store'

export default function App() {

  const [key, setKey] = useState(null)
  const [value, setValue] = useState(null)

  const [contacts, setContacts] = useState([])

  console.log("CONTACTS: ", contacts)

  const saveSecureContacts = async() => {

    const newContacts = [
      {id: 1, name: 'Jack', age: 34},
      {id: 2, name: 'Murphy', age: 12},
      {id: 3, name: 'Teddy', age: 12},
      {id: 4, name: 'Doug', age: 35},
      {id: 5, name: 'Marty', age: 36},
      {id: 6, name: 'Anna', age: 33},
      {id: 7, name: 'Munson', age: 25},
      ]

      const stringifiedContacts = JSON.stringify(newContacts)

      await SecureStore.setItemAsync('contactsKey', stringifiedContacts)

      // alert("Contacts saved!")

  }

  const getContacts = async() => {
    let result = await SecureStore.getItemAsync('contactsKey')
    
    setContacts(JSON.parse(result))
  }

  const saveSecureValue = async() => {
    console.log(key, value)
    await SecureStore.setItemAsync(key, value)
    setKey(null)
    setValue(null)
  }

  const retrieveSecureValue = async() => {
    let result = await SecureStore.getItemAsync(key)
    setValue(result)
  }

  const deleteSecureValue = async() => {
    await SecureStore.deleteItemAsync('contactsKey')
    console.log('deleted')
  }

  console.log(contacts)

  useEffect(()=> {

    saveSecureContacts()
    getContacts()

  }, [])

  const list = contacts?.map(item => (
    <View key={item.id} className="bg-white flex-row items-center justify-between p-2 rounded-md self-center my-1 w-11/12">
      <Text>{item.name}</Text>
      <Text>{item.age}</Text>
    </View>
  ))

  return (
    <View className="pt-14 flex-1 bg-gray-200">
      <View className="mx-4">
        <Text className="text-2xl mb-4">SecureStore</Text>

        <View>
        <TextInput 
          className="w-full bg-white rounded-md p-2 text-xl my-2"
          placeholder='Enter key'
          value={key}
          onChangeText={setKey}
        />
        <TextInput 
          className="w-full bg-white rounded-md p-2 text-xl"
          placeholder='Enter value'
          value={value}
          onChangeText={setValue}
        />

        <Button title="Save Key/Value pair" onPress={saveSecureValue} />

        <Button title="Retrieve" onPress={retrieveSecureValue} />
        </View>

        <Text>Key: {key}</Text>
        <Text>Value: {value}</Text>

      </View>

        <View className="flex-row items-center justify-center mt-4">

        <TouchableOpacity className="bg-green-400 rounded-md items-center p-2 self-center  mx-2" onPress={saveSecureContacts}>
          <Text className="text-white text-xl">Save </Text>
        </TouchableOpacity>

        <TouchableOpacity className="bg-blue-400 rounded-md items-center p-2 self-center mx-2" onPress={getContacts}>
          <Text className="text-white text-xl">Retrieve</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-red-400 rounded-md items-center p-2 self-center mx-2" onPress={deleteSecureValue}>
          <Text className="text-white text-xl">Delete</Text>
        </TouchableOpacity>
        
          
        </View>

      {/* CONTACTS LIST */}
        {list}
      

      
      
      <StatusBar style="auto" />
    </View>
  );
}


