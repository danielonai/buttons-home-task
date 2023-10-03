import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import { UseFetch } from "../hooks/useFetch";
import { Sound } from "../types/Sound";
import CustomModal from "../components/Modal";

const HomeScreen = () => {
	const [data, setData] = useState<Sound[] | null>(null);
	const [soundToEdit, setsoundToEdit] = useState<Sound | null>(null);
	const [editedButtonIdx, setEditedButtonIdx] = useState<number | null>(null);
	const [isEditingButton, setIsEditingButton] = useState<boolean>(false);

	// the background colors for tapping
	const colorPalette: string[] = [
		"#5bff53",
		"#ff2b2b",
		"#3636ff",
		"#0bb2f4ff",
		"#cb21ff",
		"#ff60ef",
		"#ffff4a",
		"#ff9633",
	];

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		let data = await UseFetch("http://3.73.116.126:3000/api/sounds/category/Darbuka");

		// adding a color field to each sound object with the value of the default color
		data = data.map((sound: Sound, idx: number) => {
			if (idx < 8) sound.color = "#1d1d20ff";
			return sound;
		});
		setData(data);
	};

	// sets the index of the edited sound object for later and opens the modal with the sound object to be edited
	const openModal = (idx: number) => {
		setEditedButtonIdx(idx);
		setsoundToEdit(data[idx]);
		setIsEditingButton(true);
	};

	//sets the new sound modal containing the new title and background color into the data array and resets the states
	const onSubmitModal = (newSound: Sound) => {
		const newData = data;
		newData[editedButtonIdx] = newSound;
		setData(newData);
		setIsEditingButton(false);
		setEditedButtonIdx(null);
		setsoundToEdit(null);
	};
	return (
		<View style={styles.mainContainer}>
			<View style={styles.headerContainer}>
				<Text style={styles.header}>We Are Tech Home Task - Daniel Scwartz</Text>
			</View>
			<View style={styles.container}>
				{data ? (
					data.map((sound: Sound, idx) => {
						if (idx < 8)
							return (
								<Button
									openModal={openModal}
									key={sound.soundId}
									text={sound.title}
									pressedColor={colorPalette[idx]}
									bcg={sound.color}
									soundData={sound.soundData}
									idx={idx}
								/>
							);
					})
				) : (
					<ActivityIndicator size="large" color="blue" style={styles.loader} />
				)}
			</View>
			{isEditingButton && (
				<CustomModal onSubmit={onSubmitModal} sound={soundToEdit} onClose={setIsEditingButton} />
			)}
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	loader: {
		alignSelf: 'center',
		position: 'absolute',
		top:150
	},
	mainContainer: {
		flex: 1,
		backgroundColor: "#fff",
		gap: 50,
		justifyItems: "space-between",
		alignItems: "center",
	},
	headerContainer: {
		alignItems: "center",
		justifyContent: "center",
		marginTop: 30,
	},
	header: {
		textAlign: "center",
		fontSize: 20,
		fontWeight: "bold",
	},
	container: {
		flexWrap: "wrap",
		justifyContent: "center",
		backgroundColor: "#fff",
		gap: 50,
		flexDirection: "row",
		justifyItems: "space-between",
		alignItems: "center",
	},
	button: {
		width: 100,
		height: 50,
		borderRadius: 30,
		backgroundColor: "blue",
	},
	buttonText: {
		textAlign: "center",
		fontSize: 10,
	},
});
