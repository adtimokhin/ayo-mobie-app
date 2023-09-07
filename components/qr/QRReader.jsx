import { useEffect, useState } from "react";
import { Alert, View } from "react-native";

import { BarCodeScanner } from "expo-barcode-scanner";

// Fixed

const QRReader = ({ onFail, onQRScanned }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  // Requesting permissions to use camera for qr scanning
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === false) {
    Alert.alert(
      "Need camera access",
      "Please go to settings and allow the app to use camera. Otherwise you can't scan the QR code to join!"
    );
    onFail();
    return <></>;
  }

  //   Method for handling scanned qr
  const handleBarCodeScanned = ({ type, data }) => {
    onFail();
    onQRScanned(data);
  };

  return (
    <View
      style={{
        width: "100%",
        height:"100%",
        backgroundColor: "#FE6244",
      }}
    >
      {scanned ? (
        <></>
      ) : (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      )}
    </View>
  );
};

export default QRReader;
