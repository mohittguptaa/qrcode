"use client";
import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import { QrCode, Github, Download, X } from "lucide-react";

function App() {
  const [text, setText] = useState("");
  const [qrCodeDataURL, setQrCodeDataURL] = useState("");
  const [dataSize, setDataSize] = useState(0);

  useEffect(() => {
    generateQRCode(text);
  }, [text]);

  const generateQRCode = async () => {
    try {
      const dataURL = await QRCode.toDataURL(text, {
        width: 300,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#ffffff",
        },
      });
      setQrCodeDataURL(dataURL);
      calculateDataSize(dataURL);
    } catch (err) {
      console.error(err);
    }
  };

  const calculateDataSize = (dataURL) => {
    const base64Length = dataURL.length - "data:image/png;base64,".length;
    const sizeInBytes =
      base64Length * (3 / 4) -
      (dataURL.endsWith("==") ? 2 : dataURL.endsWith("=") ? 1 : 0);
    const sizeInKB = sizeInBytes / 1024;
    setDataSize(sizeInKB);
  };

  const downloadQRCode = () => {
    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = qrCodeDataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearInput = () => {
    setText(" ");
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-black via-gray-900 to-sky-900">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center mb-0">
          <div className="flex justify-center mb-1">
            <QrCode className="w-12 h-12 text-sky-400" />
          </div>
          <h1 className="mb-1 text-4xl font-bold text-white">
            QR Code Generator
          </h1>
          <p className="text-sky-400">Generate beautiful QR codes instantly</p>
        </div>

        <div className="p-6 space-y-6 bg-white/10 backdrop-blur-lg rounded-xl">
          <div className="relative flex  flex-row">
            <div className="relative space-y-2 w-full">
              <label
                htmlFor="text"
                className="block text-sm font-medium text-sky-400"
              >
                Enter URL or text
              </label>
              <input
                type="text"
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full px-4 py-2 text-white transition-all border rounded-lg bg-white/5 border-sky-400/20 focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                placeholder="Enter text to generate QR code"
              />
            </div>
            {text.length > 0 && (
              <button
                onClick={clearInput}
                className="absolute top-12 right-4 -translate-y-1/2 text-sky-400"
              >
                <X />
              </button>
            )}
          </div>

          <div className="flex justify-center">
            {qrCodeDataURL && (
              <div className="p-4 bg-white rounded-lg shadow-xl">
                <img src={qrCodeDataURL} alt="QR Code" className="w-64 h-64" />
              </div>
            )}
          </div>
          <div className="text-center text-sky-400">
            {dataSize > 0 && <p>QR Code Size: {dataSize.toFixed(2)} KB</p>}
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={downloadQRCode}
              className="flex items-center px-4 py-2 text-white transition-colors rounded-lg bg-sky-500 hover:bg-sky-600"
            >
              <Download className="w-4 h-4 mr-2" />
              Download QR Code
            </button>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 text-white transition-colors bg-gray-700 rounded-lg hover:bg-gray-800"
            >
              <Github className="w-4 h-4 mr-2" />
              View Source
            </a>
          </div>
        </div>

        {/* 
        <p className="text-sm text-center text-sky-400/60">
          Made with ❤️ using Next and QRCode.js
        </p> 
        */}
      </div>
    </div>
  );
}

export default App;
