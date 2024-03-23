const { PDFDocument, rgb } = PDFLib

// const imgList = [
// 'brick_05.png',
// 'door_03.png',
// 'filing_04.png',
// 'gate_06.png',
// 'roof_03.png',
// 'stone_05.png',
// 'windows_04.png']



function hex2rgb(hex){return{r:'0x'+hex[1]+hex[2]|0,g:'0x'+hex[3]+hex[4]|0,b:'0x'+hex[5]+hex[6]|0}}

function normalizeHex2rgb(hex) {
  console.log("hex",hex);
  const rgb = {r:'0x'+hex[1]+hex[2]|0,g:'0x'+hex[3]+hex[4]|0,b:'0x'+hex[5]+hex[6]|0}
  // Check if input is an object with r, g, b properties
  if (typeof rgb !== 'object' || !('r' in rgb) || !('g' in rgb) || !('b' in rgb)) {
    throw new TypeError('Input must be an object with r, g, and b properties');
  }
  console.log("RGB",rgb);
  // Normalize each color component (red, green, blue)
  const r = rgb.r / 255.0;
  const g = rgb.g / 255.0;
  const b = rgb.b / 255.0;
  // Return the normalized RGB object
  console.log("Nrgb",{ r, g, b });
  return { r, g, b };
}

export async function downloadPDF(imgList,iconList, colorList) {
console.log(colorList);
  const materialList = [
    {name:"Wall1",src:iconList[0],x:24,y:527},
    {name:"Wall2",src:iconList[1],x:24,y:396},
  ]
  
  const colorInPDF = [
    {name:"Roof",color:colorList[0],x:23,y:260+38},
    {name:"SoffitFascia",color:colorList[1],x:415,y:525+37},
    {name:"GarageDoor",color:colorList[2],x:415,y:430+37},
    {name:"Door",color:colorList[3],x:415,y:336+37},
    {name:"Windows",color:colorList[4],x:415,y:238+37}
  ]

  // SVG path for a wavy line
  const svgPath =
  'M1 31V7C1 3.68629 3.68629 1 7 1H31C34.3137 1 37 3.68629 37 7V31C37 34.3137 34.3137 37 31 37H7C3.68629 37 1 34.3137 1 31Z'
  // Fetch an existing PDF document
    const url = '../resources/maket.pdf'
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())
    // Load a PDFDocument from the existing PDF bytes
    const pdfDoc = await PDFDocument.load(existingPdfBytes)



    // Get the first page of the document
  const pages = pdfDoc.getPages()
  const firstPage = pages[0]
  const thirdPage = pages[2]
    // Fetch JPG BG image
  const jpgUrl = '../bg.jpg'
  const jpgImageBytes = await fetch(jpgUrl).then((res) => res.arrayBuffer())
  const jpgImage = await pdfDoc.embedJpg(jpgImageBytes)
  const jpgDims = jpgImage.scaleToFit(597, 447)
  console.log('jpgDims', jpgDims);
  firstPage.drawImage(jpgImage, {
    x: 0,
    y: 0,
    width: jpgDims.width,
    height: jpgDims.height,
  })

    // Fetch PNG image
  for( const imgName of imgList ) {
    console.log(imgName);
    const pngUrl = `../images/${imgName}`
    const pngImageBytes = await fetch(pngUrl).then((res) => res.arrayBuffer())
    const pngImage = await pdfDoc.embedPng(pngImageBytes)
    const pngDims = pngImage.scaleToFit(597, 447)

    firstPage.drawImage(pngImage, {
      x: 0,
      y: 0,
      width: pngDims.width,
      height: pngDims.height,
    })
  };

  for( const icon of materialList ) {
    console.log(icon.src.replace(".jpg", ".png"));
    const pngUrl = `../icons/${icon.src.replace(".jpg", ".png")}`
    console.log(pngUrl);
    const pngImageBytes = await fetch(pngUrl).then((res) => res.arrayBuffer())
    const pngImage = await pdfDoc.embedPng(pngImageBytes)
    const pngDims = pngImage.scaleToFit(36, 36)

    thirdPage.drawImage(pngImage, {
      x: icon.x,
      y: icon.y,
      width: pngDims.width,
      height: pngDims.height,
    })
  };

  for( const paint of colorInPDF ) {
    console.log(paint);
    thirdPage.moveTo(paint.x, paint.y)
    console.log(normalizeHex2rgb(paint.color));
    const rgbColors = normalizeHex2rgb(paint.color)
    thirdPage.drawSvgPath(svgPath, { color: rgb(rgbColors.r, rgbColors.g, rgbColors.b) })

  };
  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save()

  // Trigger the browser to download the PDF document
  download(pdfBytes, "pdf-lib_modification_example.pdf", "application/pdf");
}