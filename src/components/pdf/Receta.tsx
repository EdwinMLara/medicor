import { Page, Text, Document, StyleSheet } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
import Header from './Header'
import List from './List';

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

function Receta(props : any) {
    console.log("Receta Props",props);
    return (
        <PDFViewer width={500} height={600}>
            <Document>
                <Page style={styles.body}>
                    <Header/>
                    <Text style={styles.title}> {props.paciente.sintomas}</Text>
                    <Text style={styles.title}> {props.paciente.diagnostico}</Text>
                    <List {...props}/>
                </Page>
            </Document>
        </PDFViewer>
    )
}

export default Receta
