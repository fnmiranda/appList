import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface CustomDropdownProps {
  options: string[];
  selectedValue: string | null;
  onValueChange: (value: string) => void;
  placeholder?: string;
  width?: number;
  height?: number;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ options, selectedValue, onValueChange, placeholder = "Select", width = 160, height = 45  }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [dropdownTop, setDropdownTop] = useState(0);
  const [dropdownLeft, setDropdownLeft] = useState(0);
  const dropdownRef = useRef<View>(null);

  const showDropdown = () => {
    if (dropdownRef.current) {
      dropdownRef.current.measure((x, y, width, height, pageX, pageY) => {
        setDropdownTop(pageY + height);
        setDropdownLeft(pageX)
        setModalVisible(true);
      });
    }
  };

  return (
    <View>
      <TouchableOpacity
        ref={dropdownRef}
        style={[styles.dropdown, { width, height }]}
        onPress={showDropdown}
      >
        <Text style={styles.selectedText}>{selectedValue || placeholder}</Text>
        <MaterialIcons name="arrow-drop-down" size={24} color="#333" style={styles.icon} />
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        transparent
        animationType="none"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <View style={[styles.modalContainer, { top: dropdownTop, width, left: dropdownLeft, right: 10, position: "absolute" }]}> 
            <FlatList
              data={options}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    onValueChange(item);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
    marginTop:5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  selectedText: {
    fontSize: 16,
    color: "#333",
  },
  icon: {
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "transparent",
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionText: {
    fontSize: 14,
    color: "#333",
  },
});

export default CustomDropdown;
