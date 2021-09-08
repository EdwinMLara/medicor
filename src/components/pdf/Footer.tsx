import { View, Text,StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    containerFooter:{
        flexDirection:'row',
        justifyContent:'center',
        borderColor:'black',
        borderWidth:2
    },
    footer:{
        fontSize:16,
        fontWeight:'bold'
    }
});

export interface FooterType {
    calle:string,
    colonia:string,
    municipio:string,
    codigoPostal:number,
    tel:number
}


function Footer(props : FooterType) {
    const {calle,colonia,municipio,codigoPostal,tel} = props;
    return (
        <View style={styles.containerFooter}>
            <Text style={styles.footer}>{`${calle} ${colonia} ${municipio} C.P: ${codigoPostal} Tel: ${tel}`}</Text>
        </View>
    )
}

export default Footer
