import { Text,View,Button } from 'react-native';
import React, { useState } from "react";


import DateTimePickerModal from "react-native-modal-datetime-picker";

const Example = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const onConfirm = (date) => {
    console.warn("Data selecionada: ", date);
    hideDatePicker();
  };

  return (
    <View>
      <Button title="Selecionar data do empréstimo" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={onConfirm}
        onCancel={hideDatePicker}
        
      />
    </View>
  );
};

export default Example;

