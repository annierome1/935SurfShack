import { useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';


pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export default function PDFViewer({ pdfUrl }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const renderPDF = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;
      
        const page = await pdf.getPage(1);

       
        const containerWidth = containerRef.current?.clientWidth || window.innerWidth;

        const defaultViewport = page.getViewport({ scale: 1 });
        const scale = containerWidth / defaultViewport.width;
        const viewport = page.getViewport({ scale });

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        canvas.width = viewport.width;
        canvas.height = viewport.height;

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


    renderPDF();


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
