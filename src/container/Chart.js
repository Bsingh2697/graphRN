import React, { useState, useEffect, useRef } from 'react'
import { View, Text, ScrollView, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import { AreaChart, Grid, LineChart, XAxis, YAxis  } from 'react-native-svg-charts'
import * as shape from 'd3-shape'

// import {LineChart} from "react-native-chart-kit";
import { parse } from 'react-native-svg';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryArea, VictoryLine, VictoryZoomContainer,VictoryScatter, VictoryAxis } from "victory-native";


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
            let y = respData.price
            y == undefined ? null :data.push({x:x,y:y})
            setTimeout(()=>setRefresh(true),1000)
        }
    },[refresh])

    let chartref = useRef(null)

    return (
        
        <View style={{alignItems:'center'}}>
          {/* <View style={styles.container}> */}
                <VictoryChart  
                theme={VictoryTheme.material}
                width={400}
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
                    />
             </VictoryChart>
              {/* </View> */}
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,,
        height:'90%',
        width:'90%',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5fcff",
      }
})

export default Chart






//Working
//   <View style={styles.container}>
            //         <VictoryChart width={350} theme={VictoryTheme.material}>
            //         <VictoryLine
            //             data={data}
            //             ref={(ref) => (chartref = ref)} />
            //         </VictoryChart>
            //     </View>







// { data.length < 0 ? null :<LineChart
//     data={{
//         datasets : [{data:data}]
//     }}
//     width={Dimensions.get("window").width} // from react-native
//     height={220}
//     yAxisLabel="$"
//     yAxisSuffix="k"
//     yAxisInterval={1} // optional, defaults to 1
//     chartConfig={{
//     backgroundColor: "#e26a00",
//     backgroundGradientFrom: "#fb8c00",
//     backgroundGradientTo: "#ffa726",
//     decimalPlaces: 2, // optional, defaults to 2dp
//     color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//     labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//     style: {
//         borderRadius: 16
//     },
//     propsForDots: {
//         r: "6",
//         strokeWidth: "2",
//         stroke: "#ffa726"
//     }
//     }}
//     bezier
//     style={{
//     marginVertical: 8,
//     borderRadius: 16
//     }}
// />}















{/* <YAxis
                    data={data.labels}
                    style={{ marginBottom: xAxisHeight }}
                    contentInset={verticalContentInset}
                    svg={axesSvg}
                />
                <View style={{ flex: 1, marginLeft: 10 }}>
                    { data.length > 0 ? 
                        <LineChart
                            style={{ flex: 1 }}
                            data={data.datasets[data]}
                            contentInset={verticalContentInset}
                            animationDuration={500}         
                            svg={{ stroke: 'red' }}>
                            <Grid/>
                        </LineChart>
                    : null
                    }
                    {
                        data.length > 0 ? (console.log("Data"),console.log(data)) : (console.log("No Data"),console.log(data))
                    }
                    <XAxis
                        style={{ marginHorizontal: -10, height: xAxisHeight }}
                        data={data}
                        formatLabel={(value, index) => index}
                        contentInset={{ left: 10, right: 10 }}
                        svg={axesSvg}
                    />
                </View> */}
