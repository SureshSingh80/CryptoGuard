"use client";

import { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import { Copy, Check } from "lucide-react";
import CryptoGrahpy from "@/utils/handleCryptoGraphy";

export default function Home() {
  const [text, setText] = useState("");
  const [key, setKey] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState({
    keyError: "",
    textError: "",
  });

  const handleCryptoGrahpy = ()=>{
      CryptoGrahpy(text,key,setError,setOutput);
  }

  useEffect(() => {

  if (!text || !key) {
    setOutput("");
    setError({ textError: "", keyError: "" });
  }

  if (text && key) {
    const isCipherText = /^U2FsdGVkX1/.test(text);
    setButtonText(isCipherText ? "DECRYPT" : "ENCRYPT");
  } else {
    setButtonText("");
  }
}, [text, key]);

  const handleCopy = (value) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(value)
        .then(() => {
          setCopied(true);
        })
        .catch((err) => {
          console.error("Clipboard copy failed:", err);
          alert("Copy failed. Try manually.");
        });
    } else {
      alert("Clipboard not supported in this environment.");
    }

    // Reset copied state after 2 seconds
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div
      style={{
        backgroundImage:
          "url('https://www.logsign.com/uploads/encryption_ff2b4dd67c.jpg')",
      }}
      className="bg-gray-50 min-h-screen text-black flex items-center justify-center "
    >
      <div className="bg-white p-8  shadow mx-4 rounded-2xl">
        <h1 className="text-xl md:text-2xl font-bold mb-4 text-center">
          Welcome to the CryptoGuard Tool
        </h1>
        <p className="text-sm md:text-base mb-4 text-center">
          This tool allows you to decrypt and encrypted messages using the
          CryptoJS library.
        </p>
        {/* input box */}
        <div className="p-4">
          <input
            type="text"
            value={text}
            required
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter Text fro encryption or Decryption"
            className="p-1 md:p-2 w-full border-2 border-gray-300 rounded focus:border-blue-400 focus:outline-none focus:ring-0"
          />
          <p className="text-red-500 ml-2">
            {error.textError && error.textError}
          </p>
        </div>

        {/* Key */}
        <div className="p-4">
          <input
            type="text"
            value={key}
            required
            onChange={(e) => setKey(e.target.value)}
            placeholder="Enter Key"
            className="p-1 md:p-2 w-full border-2 border-gray-300 rounded focus:border-blue-400 focus:outline-none focus:ring-0"
          />
          <p className="text-red-500 ml-2">
            {error.keyError && error.keyError}
          </p>
         
         <button onClick={()=>{
          setText("");
          setKey("");
         }} className="mb-4 md:mb-0 float-right mt-2 
          border 
        border-gray-400 
        text-gray-700 
        text-sm
        md:text-base
        py-1 
        px-2
        md:py-2 
        md:px-4 
        rounded-lg 
        hover:bg-gray-100 
        transition ease-in duration-200 cursor-pointer ">Reset Fields</button>

        </div>

        {/* button */}
        <div onClick={handleCryptoGrahpy} className="p-4 mt-0 md:mt-6">
          {buttonText && (
            <button
              className="bg-blue-500 w-full hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              {buttonText}
            </button>
          )}
        </div>

        {/* output */}
        <div className="flex flex-col">
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">
            Output:
          </h2>
          <p className="  w-[300px] overflow-scroll md:w-full md:overflow-auto">
            {output && (
              <span className="flex items-center">
                <span className="mr-2 text-sm md:text-base">{output}</span>
                <span>
                  {copied ? (
                    <Check className="mr-2 ml-2" size={15} />
                  ) : (
                    <Copy
                      className=" md:mr-2 md:ml-2 cursor-pointer"
                      onClick={() => handleCopy(output)}
                      size={15}
                    />
                  )}
                </span>
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
