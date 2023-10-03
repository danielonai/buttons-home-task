import React, { useState } from "react";
import { Modal, View, TextInput, Button, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Sound } from "../types/Sound";

interface CustomModalProps {
  onClose: (value: React.SetStateAction<boolean>) => void;
  sound: Sound;
  onSubmit: (newSound: Sound) => void;
}

const CustomModal: React.FC<CustomModalProps> = ({ onClose, sound, onSubmit }) => {
  //states for the inputs
  const [color, setColor] = useState(sound.color);
  const [title, setTitle] = useState(sound.title);

  const handleSubmit = () => {
    const newSound = sound;
    newSound.title = title;
    // toLowerCase and trim applied to color so we can get the color the user aimed for even if he enters "Red  " 
    newSound.color = color.toLowerCase().trim(); 
    onSubmit(newSound);
  };

  return (
    <Modal transparent animationType="slide">
      <TouchableOpacity
        style={styles.overlay}
        onPress={() => onClose(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={() => onClose(false)}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Background Color</Text>
            <TextInput
              style={styles.input}
              value={color}
              onChangeText={(text) => setColor(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={(text) => setTitle(text)}
            />
          </View>
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  closeButton: {
    position: "absolute",
    top: 0,
    right: 10,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  inputContainer: {
    marginVertical: 10,
  },
  label: {
    marginBottom: 5,
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
  },
});

export default CustomModal;
