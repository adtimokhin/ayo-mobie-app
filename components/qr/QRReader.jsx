import { useEffect, useState } from "react";
import { Alert, View } from "react-native";

import { BarCodeScanner } from "expo-barcode-scanner";

const QRReader = () => {
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
    return <></>;
  }

  //   Method for handling scanned qr
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`QR code with data ${data} has been scanned!`);
  };

  return (
    <View className="w-[300px] h-[300px] bg-orange">
      {scanned ? (
        <></>
      ) : (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          className="w-full h-full"
        />
      )}
    </View>
  );
};

export default QRReader;
