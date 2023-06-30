import { Page, Text, Document, StyleSheet } from "@react-pdf/renderer";
const styles = StyleSheet.create({
  title: {
    textDecoration: "underline",
    textAlign: "center",
    textTransform: "capitalize",
    color: "#0c0c22",
    fontWeight: "bold",
    marginBottom: 20,
  },
  synopsis: {
    textDecoration: "underline",
    textAlign: "center",
    textTransform: "capitalize",
    color: "#0b2056",
    marginBottom: 20,
  },
  body: {
    textAlign: "justify",
    lineHeight: 1.8,
    color: "#222",
  },
  page: {
    padding: 20,
  },
});
const NotesPDF = ({ title, synposis, bodyPreview }) => {
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title} fixed>
          {title}
        </Text>
        <Text style={styles.synopsis} fixed>
          {synposis}
        </Text>
        <Text style={styles.body} fixed>
          {bodyPreview}
        </Text>
      </Page>
    </Document>
  );
};
export default NotesPDF;
