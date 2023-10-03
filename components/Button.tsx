import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { Audio } from "expo-av";

interface ButtonProps {
	text: string;
	pressedColor: string;
	soundData: string;
	openModal: (idx: number) => void;
	idx: number;
	bcg: string;
}

const Button: React.FC<ButtonProps> = ({
	text,
	pressedColor,
	soundData,
	openModal,
	idx,
	bcg,
}: ButtonProps) => {
	const [isPressed, setIsPressed] = useState<boolean>(false);
	const [soundObject, setSoundObject] = useState<Audio.Sound | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
// uses a function outside of the useEffect scope because of async requirements
		loadSound();

	}, [soundData]);

  //loads the sound using expo-av library
  const loadSound = async () => {
    const audioObject = new Audio.Sound();
    try {
      await audioObject.loadAsync({ uri: soundData });
      setSoundObject(audioObject);
    } catch (error) {
      console.error("Error loading sound", error);
    }
};

	const handlePress = async () => {
		setIsLoading(true); // loader until the sound uplods
		if (soundObject) {
			try {
				await soundObject.replayAsync();
				setIsLoading(false);
			} catch (error) {
				console.error("Error playing sound", error);
				setIsLoading(false);
			}
		}
	};

  //opens edit modal with the index of the sound that the use want to edit
	const handleLongPress = () => {
		openModal(idx);
	};

	return (
		<View style={styles.container}>
			{isLoading && <ActivityIndicator size="small" color={bcg} style={styles.loader} />}
      {/*view wrapper added for multi pressing functuality */}
			<View onTouchStart={handlePress} onTouchEnd={() => setIsPressed(false)}> 
				<TouchableWithoutFeedback
					onLongPress={handleLongPress}
					onPressIn={() => setIsPressed(true)}
					onPressOut={() => setIsPressed(false)}
				>
					<View style={[styles.button, { backgroundColor: isPressed ? pressedColor : bcg }]}>
						<Text style={styles.buttonText}>{text}</Text>
					</View>
				</TouchableWithoutFeedback>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: "relative",
	},
	button: {
		width: 100,
		height: 50,
		borderRadius: 30,
		backgroundColor: "blue",
		alignItems: "center",
		justifyContent: "center",
		padding: 10,
	},
	buttonText: {
		fontSize: 15,
		color: "white",
		textAlign: "center",
	},
	loader: {
		position: "absolute",
		bottom: 60,
		right: 40,
	},
});

export default Button;
