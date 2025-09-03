import { createFileRoute } from '@tanstack/react-router'
import logo from '../logo.svg'
import { useEffect, useRef, useState } from 'react'
import { Designer } from '@pdfme/ui'
import { BLANK_A4_PDF, type Font } from '@pdfme/common'
import { text, barcodes, image, multiVariableText } from '@pdfme/schemas'

export const Route = createFileRoute("/")({
  component: PdfApp,
})

function PdfApp() {



  const containerRef = useRef<HTMLDivElement | null>(null)

  const [designer, setDesigner] = useState<Designer | null>(null)

  const font: Font = {
    sarabun: {
      data: "http://localhost:3000/Sarabun/Sarabun-Regular.ttf",
      fallback: true
    }
  }


  const designerOptions = {
    zoomLevel: 1,
    sidebarOpen: true,
    font
  }

  // const plugins = useMemo(() => ({
  //   // Text: multiVariableText,
  //   // 'QR Code': barcodes.qrcode,
  //   // Image: image,
  //   // MyCustomPlugin: myCustomPlugin,
  // }), []);

  useEffect(() => {

    const cnt = containerRef.current

    if (cnt === null) {
      return
    }

    const d = new Designer({
      domContainer: cnt,
      template: {
        basePdf: BLANK_A4_PDF,
        schemas: [
          [
            {
              name: 'example_text',
              type: 'text',
              position: { x: 0, y: 0 },
              width: 40,
              height: 10,
            },
            {
              name: 'example_image',
              type: 'image',
              position: { x: 200, y: 200 },
              width: 60,
              height: 40,
            },
            {
              name: 'example_qr_code',
              type: 'qrcode',
              position: { x: 100, y: 100 },
              width: 50,
              height: 50,
            },
          ],
        ],
        plugins: {
          text,
          image
        },
      },
      options: designerOptions,
    })


    setDesigner(d)
  }, [])


  return (
    <div ref={containerRef} id="pdfme"></div>
  )
}

function App() {
  return (
    <div className="text-center">
      <header className="min-h-screen flex flex-col items-center justify-center bg-[#282c34] text-white text-[calc(10px+2vmin)]">
        <img
          src={logo}
          className="h-[40vmin] pointer-events-none animate-[spin_20s_linear_infinite]"
          alt="logo"
        />
        <p>
          Edit <code>src/routes/index.tsx</code> and save to reload.
        </p>
        <a
          className="text-[#61dafb] hover:underline"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <a
          className="text-[#61dafb] hover:underline"
          href="https://tanstack.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn TanStack
        </a>
      </header>
    </div>
  )
}
