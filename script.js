function downloadImageAsDoc(imageName) {
    var imageUrl = 'image1/' + imageName; // Correct path for your images

    // Fetch the image and convert it to base64
    fetch(imageUrl)
        .then(response => response.blob())
        .then(blob => {
            var reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = function () {
                var base64Image = reader.result;
                generateDocx(base64Image, imageName);
            };
        })
        .catch(error => console.error('Error loading image:', error));
}

function generateDocx(base64Image, imageName) {
    var zip = new JSZip();

    // Word document structure with embedded base64 image
    var docTemplate = `
        <w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
            <w:body>
                <w:p>
                    <w:r>
                        <w:t>Resume Template:</w:t>
                    </w:r>
                </w:p>
                <w:p>
                    <w:r>
                        <w:pict>
                            <v:shape style="width:500px;height:600px;"> 
                                <v:imagedata src="data:image/png;base64,${base64Image.split(',')[1]}" />
                            </v:shape>
                        </w:pict>
                    </w:r>
                </w:p>
            </w:body>
        </w:document>
    `;

    zip.file("word/document.xml", docTemplate);
    zip.generateAsync({ type: "blob" }).then(function (content) {
        saveAs(content, imageName.replace('.jpg', '.docx')); // Save as .docx
    });
}
