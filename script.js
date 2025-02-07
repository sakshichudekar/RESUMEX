async function downloadImageAsDoc(imageUrl) {
    try {
        // Wait until docx.js is loaded
        if (!window.docx) {
            throw new Error("docx.js library is not loaded. Check script order in HTML.");
        }

        // Fetch image
        const response = await fetch(imageUrl);
        if (!response.ok) {
            throw new Error(`Image fetch failed! Status: ${response.status}`);
        }

        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();

        // Destructure docx components
        const { Document, Packer, Paragraph, ImageRun, TextRun } = window.docx;

        // Create a Word document
        const doc = new Document({
            sections: [
                {
                    children: [
                        new Paragraph({
                            children: [
                                new TextRun({ text: "Resume Template", bold: true, size: 32 }),
                            ],
                        }),
                        new Paragraph({
                            children: [
                                new ImageRun({
                                    data: new Uint8Array(arrayBuffer),
                                    transformation: { width: 400, height: 600 },
                                }),
                            ],
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({ text: "This document is editable.", italics: true }),
                            ],
                        }),
                    ],
                },
            ],
        });

        // Generate and download the .docx file
        const docBlob = await Packer.toBlob(doc);
        saveAs(docBlob, "Resume_Template.docx");

    } catch (error) {
        console.error("Error:", error);
        alert(error.message);
    }
}
