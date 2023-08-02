import React, { useState, useEffect } from 'react';
import { Document, Page, View, Text, Image, PDFViewer, StyleSheet, Font } from '@react-pdf/renderer';
Font.register({ family: "Rondal", src: "/assets/RondalRegular-K7ORW.otf" })
Font.register({ family: "Rondal-Bold", src: "/assets/RondalBold-2O4lW.otf" })

const styles = StyleSheet.create({
    body: {
        backgroundColor: "white",
        maxWidth: "1140px",
        marginRight: "auto",
        marginLeft: "auto",
        paddingRight: "15px",
        paddingLeft: "15px",
        position: "relative",
        fontFamily: "Rondal",
    },
    imgSize: {
        height: "100px",
        width: "100px",
    },
    container: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        maxWidth: "1140px",
        margin: "0 auto",
        padding: "15px",
    },
    col7: {
        flexBasis: "58%",
        //   border: "1px solid black",
    },
    col5: {
        flexBasis: "42%",
        //   border: "1px solid black",
    },
    triangle: {
        width: "0",
        height: "0",
        borderLeft: "500px solid blue",
        borderRight: "500px solid white",
        borderBottom: "100px solid white",
    },
});


const PDF = ({ cvData }) => {
    const name = "Daniyal";
    const imageData = localStorage.getItem('imageData');

    return (
        <Document>
            <Page size='A4'>
                <View style={styles.body}>
                    {/* <Text wrap={false}>{name}</Text> */}
                    <View style={[styles.container, {}]}>
                        <View style={[styles.col7, { position: "relative", border: "1px solid black" }]}>
                            <Image src={imageData} alt='userImage' height={100} width={100} style={{ height: "150px", width: "150px", position: "absolute", top: 10, left: 30, zIndex: "1", borderRadius: "100px" }} />

                            <View style={{ backgroundColor: "#d69d0d", width: "100vw", height: "70px", position: "absolute", top: "45px", left: "70px", zIndex: "2" }}>
                                <Text style={{ position: "relative", top: "10px", zIndex: "2", fontSize: "30px", color: "white", textAlign: "center" }}>{cvData.name}</Text>
                                <Text style={{ position: "relative", top: "5px", zIndex: "2", fontSize: "15px", color: "white", textAlign: "center" }}>{cvData.designation}</Text>
                            </View>
                            <View style={{ border: "1px solid pink" }}>
                                {/* Education */}
                                {cvData.education && cvData.education.length > 0 && cvData.education[0].degree && cvData.education[0].year && cvData.education[0].field && cvData.education[0].institutionName && <><View>
                                    <View style={[{ backgroundColor: "blue", borderRadius: "5px", textAlign: "center", marginTop: "10px" }]}><Text>Education</Text></View>
                                    {cvData.education.map(({ degree, year, field, institutionName }) => (
                                        <View key={degree} style={{ fontSize: "15px" }} >
                                            {degree && year && (
                                                <>
                                                    <Text style={{ fontFamily: "Rondal-Bold", marginTop: "10px" }}>{degree}</Text>
                                                    <Text style={{ marginTop: "3px" }} >{institutionName}</Text>
                                                    <Text style={{ marginTop: "3px" }}  >{field}</Text>
                                                    <Text style={{ marginTop: "3px" }} >{year}</Text>
                                                </>
                                            )}
                                        </View>
                                    ))}
                                </View></>}
                                {/* Education */}




                                                

                            </View>
                        </View>
                        <View style={[styles.col5, { border: "1px solid black" }]}>
                            <Text>sfad</Text>
                        </View>
                    </View>
                </View>

            </Page>
        </Document>
    );
};

const PDFView = () => {
    const [imageData, setImageData] = useState(null);
    const [cvData, setCvData] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            const dataURL = reader.result;
            setImageData(dataURL);
            localStorage.setItem('imageData', dataURL);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };


    useEffect(() => {
        console.log(cvData);

        const draftData = localStorage.getItem("draft2");
        if (draftData) {
            const parsedData = draftData ? JSON.parse(draftData) : null;
            setCvData(parsedData);
            console.log(cvData);
        }



    }, []);


    return (
        <div>
            {/* <input type="file" accept="image/*" onChange={handleImageUpload} /> */}
            {cvData && <PDFViewer style={{ height: "100vh", width: "100vw" }}>
                <PDF cvData={cvData} />
            </PDFViewer>}


        </div>
    );
};

export default PDFView;
