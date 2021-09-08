import { Page, Document, StyleSheet } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
import Body from './Body';
import Header from './Header'

import {ConsultaValues} from '../redux/consultas/consultasTypes'
import Footer, { FooterType } from './Footer';



const styles = StyleSheet.create({
    body:{
        paddingTop:35,
        paddingBottom: 65,
        paddingHorizontal: 35
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
      }
});



function Receta(props : ConsultaValues) {

    const valuesFooter : FooterType = {
        calle: 'Dalia # 131',
        colonia: 'Zona Centro',
        municipio: 'Uriangato Gto',
        codigoPostal: 38980,
        tel: 4451001928
    }

    return (
        <PDFViewer width={500} height={600}>
            <Document>
                <Page style={styles.body}>
                    <Header {...props}/>
                    <Body {...props}/>
                    <Footer {...valuesFooter}/>
                </Page>
            </Document>
        </PDFViewer>
    )
}

export default Receta
