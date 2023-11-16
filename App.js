import { StatusBar } from 'expo-status-bar';
import { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store'

export default function App() {

  const [key, setKey] = useState(null)
  const [value, setValue] = useState(null)



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

      
      
      <StatusBar style="auto" />
    </View>
  );
}


