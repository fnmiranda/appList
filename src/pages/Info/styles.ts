import { Dimensions, StyleSheet } from "react-native";
import { themas } from "../../global/themes";


export const styles = StyleSheet.create({
    viewAll:{
      marginTop:10
    },
    materialIcon: {
      marginRight: 10,
    },
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
      },
      secao: {
        marginBottom: 30,
      },
      tituloSecao: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 15,
        textAlign:'center',
        color: "#333",
      },
      texto: {
        fontSize: 16,
        color: "#666",
        lineHeight: 24,
      },
      noticiaItem: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
        borderColor: "#ccc",
        borderWidth: 1,
      },
      noticiaTitulo: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
      },
      noticiaData: {
        fontSize: 14,
        color: "#666",
      },
      materialItem: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        borderColor: "#ccc",
        borderWidth: 1,
      },
      materialNome: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
      },
      materialTipo: {
        fontSize: 14,
        color: "#666",
      },
});