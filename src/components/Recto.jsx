import React from 'react'
import { Document,Font,Image,Page, Path, StyleSheet, Svg, Text, View } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
Font.register({
  family: 'Bebas Neue',
  src:'/Bebas_Neue/BebasNeue-Regular.ttf'
})
const tw = createTw({
  theme: {
    fontFamily: {
      sans: ["Comic Sans"],
    },
    extend: {
      fontFamily: {
        'roboto': ['"Roboto Serif"', "serif"],
      },
    },
  },
});

const styles = StyleSheet.create({
  pageBackground: {
    position: 'absolute',
    minWidth: '100%',
    minHeight: '100%',
    display: 'block',
    height: '100%',
    width: '100%',
  },
});





function Recto({compte}) {
  return (
    <Document>
    <Page size={[285, 175]} style={tw('flex')} >
    <Image src="/img/bg_recto.png" style={styles.pageBackground} />
          {/* <View style={tw('flex flex-row justify-between p-2')}>
              <View style={tw("flex flex-col items-center")}>
              <View  style={tw('flex flex-col items-center justify-center')} >
              <Text style={{fontFamily:'Bebas Neue',fontSize:'8px',textAlign:'center'}}>Centre Régional des Oeuvres Universitaires Sociales de
                Ziguinchor </Text> 
                <Text style={{fontFamily:'Bebas Neue',fontSize:'8px',textAlign:'center'}}>CROUS/Z</Text>  
              </View>
             </View>
        </View> */}
        {/* <View style={tw('flex flex-row items-center justify-center')}>
          <Text style={{fontFamily:'Bebas Neue',fontSize:'24px',textAlign:"center",color:'green'}}>CARTE SOCIALE</Text>
        </View> */}
        <View style={tw("flex flex-row items-center justify-between w-11/12")}>
            <Image
              src={{uri:`${import.meta.env.VITE_BACKURL_ETUDIANT}/${compte?.etudiant.avatar}`}}
              style={tw('rounded-full object-center object-cover h-32 w-32 m-6')}
            />

            <View style={tw('flex flex-col items-center')}>
            <View>
              <Text style={{fontFamily:'Bebas Neue',fontSize:'24px',textAlign:"center",color:'#2290f0'}}>CARTE SOCIALE</Text>
            </View>
              <View>
               <Text style={{fontFamily:'Bebas Neue',fontSize:'18px',textAlign:'center'}}>{compte?.etudiant.prenom} {compte?.etudiant.nom}</Text>
              </View>
              <View style={tw('flex flex-row items-center')}>
              <Svg
                  viewBox="0 0 1024 1024"
                  fill="#2290f0"
                  height="10"
                  width="10"

                >
                  <Path d="M872 394c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8H708V152c0-4.4-3.6-8-8-8h-64c-4.4 0-8 3.6-8 8v166H400V152c0-4.4-3.6-8-8-8h-64c-4.4 0-8 3.6-8 8v166H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h168v236H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h168v166c0 4.4 3.6 8 8 8h64c4.4 0 8-3.6 8-8V706h228v166c0 4.4 3.6 8 8 8h64c4.4 0 8-3.6 8-8V706h164c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8H708V394h164zM628 630H400V394h228v236z" />
                </Svg>
                <Text style={{fontFamily:'Bebas Neue',fontSize:'10px',textAlign:'center',marginLeft:'2px'}}> {compte?.etudiant.nce} </Text>
              </View>
              <View style={tw('flex flex-row items-center')}>
              <Svg
                      viewBox="0 0 448 512"
                      fill="#2290f0"
                      height="10"
                      width="10"
                      
                    >
                      <Path d="M64 32C28.7 32 0 60.7 0 96v320c0 35.3 28.7 64 64 64h320c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm90.7 96.7c9.7-2.6 19.9 2.3 23.7 11.6l20 48c3.4 8.2 1 17.6-5.8 23.2L168 231.7c16.6 35.2 45.1 63.7 80.3 80.3l20.2-24.7c5.6-6.8 15-9.2 23.2-5.8l48 20c9.3 3.9 14.2 14 11.6 23.7l-12 44C336.9 378 329 384 320 384 196.3 384 96 283.7 96 160c0-9 6-16.9 14.7-19.3l44-12z" />
                    </Svg>
                <Text style={{fontFamily:'Bebas Neue',fontSize:'10px',textAlign:'center',marginLeft:'2px'}}>{compte?.etudiant.telephone} </Text>
              </View>
            </View>
          </View>
    </Page>
   
  </Document>
  )
}

export default Recto