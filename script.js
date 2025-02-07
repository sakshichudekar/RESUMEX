async function downloadImageAsPDF(imageUrl) {
    try {
        const response = await fetch(imageUrl);
        if (!response.ok) throw new Error(`Image fetch failed! Status: ${response.status}`);

        const blob = await response.blob();
        const reader = new FileReader();

        reader.onloadend = function () {
            const imgData = reader.result;
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            doc.addImage(imgData, 'JPEG', 10, 10, 180, 250); // Adjust width & height as needed
            doc.save("Resume_Template.pdf");
        };

        reader.readAsDataURL(blob);
    } catch (error) {
        console.error("Error:", error);
        alert(error.message);
    }
}
