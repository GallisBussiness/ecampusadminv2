import React from "react";
import {  Image, View} from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

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


function QRCodePage({ id }) {
  const dataUrl = document.getElementById(id).toDataURL();
  return (
      <View>
        <Image allowDangerousPaths src={dataUrl} style={tw('h-28 w-28 mt-5')} />
      </View>
  );
}

export default QRCodePage;
