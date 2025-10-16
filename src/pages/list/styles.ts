import { Dimensions, StyleSheet } from "react-native";
import { themas } from "../../global/themes";


export const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",

    },
    header: {
        width: '100%',
        height: Dimensions.get('window').height / 7,
        backgroundColor: themas.colors.primary,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    subHeader: {
        alignItems: "center",
        flexDirection: 'row',
        alignContent: 'center',
        gap: 10
    },
    greeting: {
        fontSize: 20,
        color: '#FFF',
        marginTop: 0,
        fontWeight: '800'
    },
    boxInput: {
        width: '55%'
    },
    boxList: {
        flex: 1,
        width: '160%',
    },
    card: {
        width: '100%',
        height: 85,
        backgroundColor: '#FFF',
        marginTop: 2,
        borderRadius: 10,
        justifyContent: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: themas.colors.lightgray
    },
    rowCard: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    rowCardLeft: {
        width: '58%',
        flexDirection: "row",
        alignItems: 'center',
        gap: 10
    },
    titleCard: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    dateCard: {
        fontSize: 15,
        // fontWeight:'bold'
    },
    typeCard: {
        fontSize: 14,
        // fontWeight:'bold'
    },
    descriptionCard: {
        color: themas.colors.gray
    },

    addButton: {
        position: "absolute",
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: themas.colors.primary,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
    },
    addButtonText: {
        fontSize: 30,
        color: themas.colors.bgScrean,
    },

    //tab
    tab: {
        paddingHorizontal: 4, // px-4
        paddingVertical: 8,     // py-2
    },
    text: {
        fontSize: 16,           // text-lg
        color: "#4B5563",       // text-gray-600
    },
    activeTab: {
        borderBottomWidth: 4,
        borderBottomColor: 'rgba(34, 72, 177, 0.88)',
    },
    activeText: {
        fontWeight: "bold",
    },


})
