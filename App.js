'use strict';

import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import Toast from 'react-native-toast-message';
export default class App extends Component {
  onSuccess = e => {

    var d = new Date(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
    var newDate = month +'/'+ day +'/'+ year;
    console.log('eeeeeeeeeeeeeeeeee',e.data,newDate);

    fetch(`https://sheet.best/api/sheets/8db1df87-87da-4413-aa68-61d04b340566/Barcode/${e.data}`)
    .then(response => response.json())
    .then(data => 
       {
         if (data.length>0 && data !== undefined) {
          if(data[0].Date == newDate && data[0].Barcode == e.data){
            Toast.show({
              type:'error',
              position:'top',
              visibilityTime:2000,
              text1: 'Hello',
              text2: 'Barcode Already Scaned 👋'+ data[0].Date
            });
          }else{
           
            
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ Barcode:e.data,Date:newDate})
      };
        fetch('https://sheet.best/api/sheets/8db1df87-87da-4413-aa68-61d04b340566', requestOptions)
          .then(response => response.json())
          .then(dataSave =>  {
            if (dataSave.length>0) {
              console.log('eeeeeeeeeeeeeeeeee get new',dataSave)
              Toast.show({
                type:'success',
                position:'top',
                visibilityTime:2000,
                text1: 'Hello',
                text2: 'Barcode Registered 👋'
              });
             
    
             } else {
              Toast.show({
                type:'error',
                position:'top',
                visibilityTime:2000,
                text1: 'Hello',
                text2: 'Barcode Not Registered 👋'
              });
            }
          });


          }
         } else {


        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Barcode:e.data,Date:newDate})
        };
          fetch('https://sheet.best/api/sheets/8db1df87-87da-4413-aa68-61d04b340566', requestOptions)
            .then(response => response.json())
            .then(dataSave =>  {
              if (dataSave.length>0) {
                console.log('eeeeeeeeeeeeeeeeee get new',dataSave)
                Toast.show({
                  type:'success',
                  position:'top',
                  visibilityTime:2000,
                  text1: 'Hello',
                  text2: 'Barcode Registered 👋'
                });
               
      
               } else {
                Toast.show({
                  type:'error',
                  position:'top',
                  visibilityTime:2000,
                  text1: 'Hello',
                  text2: 'Barcode Not Registered 👋'
                });
              }
            });

         
          // console.log('eeeeeeeeeeeeeeeeee 333333333333',data)
         }
       }
      );
   
  };

  render() {
    return (
      <>
      <Toast ref={(ref) => Toast.setRef(ref)} />
      <QRCodeScanner
        onRead={this.onSuccess}
        // flashMode={RNCamera.Constants.FlashMode.torch}
        topContent={
          <Text style={styles.centerText}>
            {/* Go to{' '}
            <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
            your computer and scan the QR code. */}
          </Text>
        }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>OK. Got it!</Text>
          </TouchableOpacity>
        }
      />
    </>
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});