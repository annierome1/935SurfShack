// components/PDFViewer.js
import { useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

// Set up the PDF.js worker (ensure your version is correct)
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export default function PDFViewer({ pdfUrl }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const renderPDF = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;
        // For this example, we'll render only the first page.
        const page = await pdf.getPage(1);
        const scale = .25;
        const viewport = page.getViewport({ scale });
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        await page.render(renderContext).promise;
      } catch (error) {
        console.error('Error rendering PDF:', error);
      }
    };

    renderPDF();
  }, [pdfUrl]);

  return (
    <div style={{ width: '100%', textAlign: 'center' }}>
      <canvas ref={canvasRef} style={{ border: 'none' }} />
    </div>
  );
}
