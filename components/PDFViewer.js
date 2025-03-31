import { useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

// Set up the PDF.js worker (ensure your version is correct)
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export default function PDFViewer({ pdfUrl }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const renderPDF = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;
        // Render only the first page for this example.
        const page = await pdf.getPage(1);

        // Get the container's width (fallback to window width if unavailable)
        const containerWidth = containerRef.current?.clientWidth || window.innerWidth;

        // Get the default viewport at scale = 1 to determine original width.
        const defaultViewport = page.getViewport({ scale: 1 });
        // Calculate a new scale so that the page fits the container width.
        const scale = containerWidth / defaultViewport.width;
        const viewport = page.getViewport({ scale });

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // Set canvas dimensions to match the scaled PDF page
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        // Clear any previous render
        context.clearRect(0, 0, canvas.width, canvas.height);

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        await page.render(renderContext).promise;
      } catch (error) {
        console.error('Error rendering PDF:', error);
      }
    };

    // Initial render
    renderPDF();

    // Re-render on window resize to adjust the scale
    const handleResize = () => {
      renderPDF();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [pdfUrl]);

  return (
    <div ref={containerRef} style={{ width: '70%', textAlign: 'center', height: '70%', margin: '0 auto', }}
>
      <canvas ref={canvasRef} style={{ border: 'none', maxWidth: '100%' }} />
    </div>
  );
}
