import React, { useState , useEffect } from 'react';
import { Document, Page, View, Text, Image, PDFViewer, StyleSheet, Font } from '@react-pdf/renderer';
Font.register({family: "Rondal" , src: "/assets/RondalRegular-K7ORW.otf"})
Font.register({family: "Rondal-Bold" , src: "/assets/RondalBold-2O4lW.otf"})

const styles = StyleSheet.create({
    body: {
      backgroundColor: "#AFDDFF",
      maxWidth: "1140px",
      marginRight: "auto",
      marginLeft: "auto",
      paddingRight: "15px",
      paddingLeft: "15px",
      position:"relative",
      fontFamily : "Rondal",
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
    col: {
      flexBasis: "50%",
    //   border: "1px solid black",
    },
    triangle : {
        width: "0",
        height: "0",
        borderLeft: "500px solid blue",
        borderRight: "500px solid white",
        borderBottom: "100px solid white",
      },
  });
  

const PDF = ({ cvData } ) => {
  const name = "Daniyal";
  const imageData = localStorage.getItem('imageData');

  return (
    <Document>
    <Page size='A4'>
        <View style={styles.triangle}></View>
      <View style={styles.body}>
        {/* <Text wrap={false}>{name}</Text> */}
        <View style={[styles.container , {marginTop:"-50px"}]}>
          <View style={[styles.col , {paddingRight:"10px"}]}>
            <Image src={imageData} alt="yourpic" style={{borderRadius:"150px" ,height:"150px" , width:"150px" , border:"1px solid black" , marginLeft:"20px"}}/>
            <Text style={{ fontSize:"20px" , marginTop : "5px"}}><Image src="/email4.png" style={{height:"20px" , width:"20px"  }} ></Image>{cvData.contact}</Text>
            <Text style={{ fontSize:"20px", marginTop : "5px"}}><Image src="/phone.png" style={{height:"20px" , width:"20px" }} ></Image>{cvData.email}</Text>
            <Text style={{ fontSize:"20px", marginTop : "5px"}}><Image src="/location.png" style={{height:"20px" , width:"20px"  }} ></Image>{cvData.address}</Text>
            {/* skills */}
            {cvData.skill &&  <><View> 
            <View style={[ {backgroundColor:"blue" , borderRadius:"5px", textAlign:"center" , marginTop : "10px"}]}><Text>SKILLS</Text></View>
            {cvData.skill.map(({ name, level }) => (
                                     <View key={name} >
                                    {name && level && (
                                                <>
                                                    <Text style={{fontSize:"15px", marginTop : "5px"}}>{name} ({level})</Text>
                                                     
                                                 </>
                                                             )}
                                                        </View>
                                                                ))}
            </View></>}
            

            {/* skills */}

            {/* Education */}
            {cvData.education && cvData.education.length > 0 && cvData.education[0].degree && cvData.education[0].year && cvData.education[0].field && cvData.education[0].institutionName &&<><View> 
            <View style={[ {backgroundColor:"blue" , borderRadius:"5px", textAlign:"center", marginTop : "10px"}]}><Text>Education</Text></View>
            {cvData.education.map(({ degree, year , field , institutionName }) => (
                                     <View key={degree} style={{fontSize:"15px"}} >
                                    {degree && year && (
                                                <>
                                                    <Text style={{fontFamily:"Rondal-Bold", marginTop : "10px"}}>{degree}</Text>
                                                     <Text style={{marginTop:"3px"}} >{institutionName}</Text>
                                                     <Text  style={{marginTop:"3px"}}  >{field}</Text>
                                                     <Text   style={{marginTop:"3px"}} >{year}</Text>
                                                 </>
                                                             )}
                                                        </View>
                                                                ))}
            </View></>}
            {/* Education */}
            {/* Language */}
            {console.log(cvData.language)}
            {cvData.language && cvData.language.length > 0  && <>
                                                            <View style={{fontSize:"15px"}}>
                                                                <View >
                                                                    <Text style={[ {backgroundColor:"blue" , borderRadius:"5px", textAlign:"center" , marginTop : "10px" , marginBottom:"5px"}]} >LANGUAGES</Text>
                                                                </View>
                                                                {cvData.language.map(( languageName ) => (
                                                                    <View key={languageName} >
                                                                        {languageName && (
                                                                            <Text  style={{marginTop:"5px"}} >{languageName}</Text>
                                                                        )}
                                                                    </View>
                                                                ))}
                                                            </View></>
                                                            }
            {/* Language */}
          </View>
          <View style={[styles.col , {paddingLeft:"10px" , border:"1px solid black" , marginTop:"70px"}]}>
            <Text style={{fontSize:"30px" , fontFamily:"Rondal-Bold" , color:"blue" , textAlign:"center"}}>{cvData.name}</Text>
            <Text style={{fontFamily:"Rondal-Bold" , fontSize:"20px"  }}>{cvData.designation}</Text>
            <Text style={{fontSize:"15px" , marginTop:"5px" , marginBottom:"5px"}}>{cvData.objective}</Text>
            {/* EXPERIENCE */}
            {cvData.experience && cvData.experience.length > 0 && cvData.experience[0].jobTitle && cvData.experience[0].companyName && cvData.experience[0].experienceStarting && cvData.experience[0].experienceEnding && <>
                                                            <View>
                                                                <View >
                                                                    <Text style={[ {backgroundColor:"blue" , borderRadius:"5px" , textAlign:"center"}]} >EXPERIENCE</Text>
                                                                </View>
                                                                {cvData.experience.map(({ jobTitle, companyName, experienceStarting, experienceEnding }) => (
                                                                    <View key={jobTitle} >
                                                                        {jobTitle && companyName && experienceStarting && experienceEnding && (
                                                                            <>
                                                                               <Text style={{fontSize:"15px" , marginTop:"10px"}}><Text style={{fontFamily:"Rondal-Bold" , fontSize:"15px"}}>{jobTitle}</Text><Text> at {companyName}</Text></Text>
                                                                                <Text style={{fontSize:"15px"}} >{experienceStarting} TO {experienceEnding}</Text>
                                                                                
                                                                            </>
                                                                        )}
                                                                    </View>
                                                                ))}
                                                            </View>
                                                            </>}
            {/* EXPERIENCE */}
            {/* CERTIFICATES */}
            {cvData.certificate  && cvData.certificate.length > 0 &&<>
                                                            <View>
                                                                <View  >
                                                                    <Text style={[ {backgroundColor:"blue" , borderRadius:"5px" , textAlign:"center" , marginTop:"10px"}]} >CERTIFICATES</Text>
                                                                </View>
                                                                {cvData.certificate.map(({ name, date, organisation }) => (
                                                                    <View key={name} >
                                                                        {name && date && organisation && (
                                                                           
                                                                                <View style={{fontSize:"15px"}}>
                                                                                    <Text style={{fontFamily:"Rondal-Bold" , marginTop:"5px" }} >{name}</Text>
                                                                                    <Text style={{ marginTop:"3px"}}>{organisation }</Text>
                                                                                    <Text style={{ marginTop:"3px"}}>{date}</Text> 
                                                                                </View>)}
                                                                    </View>
                                                                ))}
                                                            </View>
                                                            </>}
            {/* CERTIFICATES */}
            {/* REFERENCE */}
            {cvData.reference  && <>
                                                            <View>
                                                                <View >
                                                                    <Text style={[ {backgroundColor:"blue" , borderRadius:"5px" , textAlign:"center" , marginTop:"10px"}]}>REFERENCES</Text>
                                                                </View>
                                                                <Text style={{fontSize:"15px" , marginTop:"5px"}}>{cvData.reference}</Text>
                                                            
                                                            </View>
                                                            </>}
            {/* REFERENCE */}
          </View>
        </View>
       
      </View>
    </Page>
  </Document>
  );
};

const PDFView = () => {
  const [imageData, setImageData] = useState(null);
  const [cvData , setCvData] = useState(null);

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
    // const storedImageData = localStorage.getItem('imageData');
    // if (storedImageData) {
    //   setImageData(storedImageData);
    // }
//     const img = localStorage.getItem('draft2');
//     setCvData( img)
//    console.log(cvData);

   const draftData = localStorage.getItem("draft2");
   if(draftData){
     const parsedData = draftData ? JSON.parse(draftData) : null;
   setCvData(parsedData);
   console.log(cvData);
   }
  
   
    
  }, []);
  

  return (
    <div>
      {/* <input type="file" accept="image/*" onChange={handleImageUpload} /> */}
      
        {cvData && <>
        
        
        
        <PDFViewer style={{height: "100vh" , width: "100vw" }}>
          <PDF cvData={cvData}  />
        </PDFViewer></>}
        
     
    </div>
  );
};

export default PDFView;







// import React, { useState, useEffect } from 'react';
// import { Document, Page, View, Text, Image, PDFViewer, StyleSheet, Font } from '@react-pdf/renderer';

// const styles = StyleSheet.create({
//   container: {
   
//     maxWidth: "1140px",
//     width : "1140px",
//     marginRight: "auto",
//     marginLeft: "auto",
//     paddingRight: "15px",
//     paddingLeft: "15px",
  
//   },
//   marginTop : {
//     marginTop : "200px",
//   },
//   imgStyle :{
//     width : "100px",
//     height : "100px",
//   },
//   background: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     height :"200px",
//   },
//   row :{
//     display: "flex",
//     flexWrap: "wrap",
//     justifyContent: 'center', // Horizontally center the columns
//     alignItems: 'center', // Vertically center the columns
  
//   },
//   col6: {
    
//     flex: "0 0 50%",
//     border : "1px solid black",
   
//   },
//   col62: {
    
//     flex: "0 0 50%",
//     border : "1px solid black",

//     /* Add any additional styles for the columns */
//   }
// });
// const BackgroundImage = ({ imageSrc, children }) => (
//     <View style={[styles.container]}>
//       <Image src={imageSrc} style={styles.background} />
//       <View style={styles.content}>{children}</View>
//     </View>
//   );
  

// const PDF = ({ cvData }) => {
//   const name = "Daniyal";
//   const backgroundImageSrc = '/wave.png';

//   return (
//     <Document>
//       <Page>
//       <BackgroundImage imageSrc={backgroundImageSrc}>
//       <View style={[styles.container, { marginTop: "-100px" }]}>
//         <View style={styles.row}>
            
//         <View style={styles.col6}><View><Text>f</Text></View></View>
//         <View style={styles.col6}><Text>{cvData.name}</Text><Image src="/wave.png" style={styles.imgStyle}/></View>
//         </View>
//         </View>
        
//         <View>
//             <Text> </Text>
//             <Text> </Text>
//         </View>
//         </BackgroundImage>
//       </Page>
//     </Document>
//   );
// };

// const PDFView = () => {
//   const [imageData, setImageData] = useState(null);
//   const [cvData , setCvData] = useState(null)

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();

//     reader.onloadend = () => {
//       const dataURL = reader.result;
//       setImageData(dataURL);
//       localStorage.setItem('imageData', dataURL);
//     };

//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   };

//   useEffect(() => {
//     const storedImageData = localStorage.getItem('imageData');
//     if (storedImageData) {
//        const img =  localStorage.getItem('formimage')
//       setImageData(img);
//     }
//     const draftData = localStorage.getItem("draft2");
//     if(draftData){
//         const parsedData = draftData ? JSON.parse(draftData) : null;
//         setCvData(parsedData);
//     }
        
//   }, []);

//   return (
//     <div>
//       <input type="file" accept="image/*" onChange={handleImageUpload} />
//       {cvData && (
//         <PDFViewer>
//           <PDF cvData={cvData}  imageData={imageData} />
//         </PDFViewer>
//       )}
//     </div>
//   );
// };

// export default PDFView;
