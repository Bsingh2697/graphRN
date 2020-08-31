import React, { useState, useEffect, useRef } from 'react'
import { View, Text, ScrollView, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import { VictoryChart, VictoryTheme, VictoryLine, VictoryZoomContainer } from "victory-native";


const data = []

const Chart = () => {
    const ws = useRef(null)
    const subscribe = {
        "type": "subscribe",
        "channels": [
            {
                "name": "ticker",
                "product_ids": [
                    "BTC-USD"
                ]
            }
        ]
    }

    const [refresh, setRefresh] = useState(false)

    useEffect(()=>{
        ws.current = new WebSocket("wss://ws-feed.gdax.com");
        ws.current.onopen = (open) => {
                        ws.current.send(JSON.stringify(subscribe))
                    };
        ws.current.onerror = () => console.log("ws error")
        ws.current.onclose = () => console.log("ws closed");
        return  () => {
            ws.current.close()
        }
    },[])

    useEffect(()=>{

        ws.current.onmessage = (e) => {
            setRefresh(false)
            let respData = JSON.parse(e.data)
            let x = data.length
            let y = `${parseFloat(respData.price).toFixed(1)}`
            console.log(y)
            // let y = respData.price
            y == "NaN" ? null :data.push({x:x,y:y})
            setTimeout(()=>setRefresh(true),1000)
        }
    },[refresh])

    let chartref = useRef(null)

    return (
        
        <View style={{alignItems:'center'}}>
          <View style={styles.container}>
                <VictoryChart  
                theme={VictoryTheme.material}
                containerComponent={
                    <VictoryZoomContainer
                        allowPan={true}
                        allowZoom={true}
                    />
                    }
                >
                <VictoryLine
                    data={data}
                    ref={(ref) => (chartref = ref)} 
                    padding={20}
                    animate={true}
                    scale="linear"
                    />
             </VictoryChart>
              </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width:'90%',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5fcff",
      }
})

export default Chart

