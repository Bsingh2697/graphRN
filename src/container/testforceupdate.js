import React,{useState} from 'react'
import { View, TouchableOpacity, Text } from 'react-native'

// const useforceupdate = () => useState()[1]

const useForceUpdate = () => {
    const[sta,setSta] = useState("0")
    val = setSta(Math.random().toString())
    return () => setSta(Math.random().toString())
}

const testforceupdate = () =>  {

      const forceUpdate = useForceUpdate();
      console.log('rendering');
      return (
        <View>
            <Text>askanjkasdjkajkkanknaknkanjkasknasjkkasnkankidnakdnkjan</Text>
            <Text>askanjkasdjkajkkanknaknkanjkasknasjkkasnkankidnakdnkjan</Text>
            <Text>askanjkasdjkajkkanknaknkanjkasknasjkkasnkankidnakdnkjan</Text>

            <TouchableOpacity onPress={forceUpdate}><Text>Click To Render</Text></TouchableOpacity>
        </View>    
        )
    };

export default testforceupdate
