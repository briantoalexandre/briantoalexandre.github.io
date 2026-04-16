document.getElementById("downloadCV").addEventListener("click", function () {
    try {
        // URL of the PDF file (can be local or remote)
        const pdfUrl = "assets/cv/Brianto_Alexandre_CV.pdf"; // Replace with your PDF path or URL

        // Create a temporary <a> element
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.download = "myfile.pdf"; // Suggested filename for download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error("Error downloading PDF:", error);
        alert("Failed to download PDF.");
    }
});
    
