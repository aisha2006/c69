import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions'
import {BarCodeScanner} from 'expo-barcode-scanner'

export default class BookTransactionScreen extends React.Component{
    constructor(){
        super();
        this.state={
            hasCameraPermission: null,
            scanned: false,
            scannedData: '',
            ButtonState:'normal'
        }
    }

    getCameraPermission=async()=>{
      const {status}=await Permissions.askAsync(Permissions.CAMERA);
      this.setState({
          hasCameraPermission:status==='granted',
          ButtonState:'clicked'
      })
    }

    handleBarCodeScanner=async(type,data)=>{
        this.setState({
            scanned:true,
            scannedData:data,
            ButtonState:'normal'
        })
    }
  render(){
      const hasCameraPermission=this.state.hasCameraPermission;
      const scanned=this.state.scanned;
      const ButtonState=this.state.ButtonState;
      if(ButtonState==='clicked'&&hasCameraPermission){
          return(
              <BarCodeScanner
              onBarCodeScanned={
                  scanned?undefined:this.handleBarCodeScanner
              }
              style={StyleSheet.absoluteFillObject}
              />
          )
      }

      else if(ButtonState==='normal'){

      }
      return(
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
              <Text>
                  {hasCameraPermission===true?this.state.scannedData:'requestCameraPermission'}
              </Text>
              <TouchableOpacity
              onPress={()=>{
                  this.getCameraPermission();
              }}
              >
                  <Text>scan</Text>
              </TouchableOpacity>
          </View>
      );
  }
}