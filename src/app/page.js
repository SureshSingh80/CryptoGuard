"use client";

import { useState } from "react";
import CryptoJS from "crypto-js";

export default function Home() {
  const [text, setText] = useState("");
  const [key, setKey] = useState("");
  const [selected, setSelected] = useState("Encrypt");
  const [output, setOutput] = useState("");

  const handleCryptoGrahpy = () => {
    if (text === "" || key === "") return;
    if (selected === "Encrypt") {
      const encryptedText = CryptoJS.AES.encrypt(text, key).toString();
      // console.log(encryptedText);
      setOutput(encryptedText);
    } else {
      const decryptedText = CryptoJS.AES.decrypt(text, key).toString(
        CryptoJS.enc.Utf8
      );
      // console.log(decryptedText);
      setOutput(decryptedText);
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          "url('https://www.logsign.com/uploads/encryption_ff2b4dd67c.jpg')",
      }}
      className="bg-gray-50 min-h-screen text-black flex items-center justify-center rounded-xl"
    >
      <div className="bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Welcome to the CryptoJS Decryption Tool
        </h1>
        <p className="text-base mb-4">
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
            className="p-2 w-full border-2 border-gray-300 rounded focus:border-blue-400 focus:outline-none focus:ring-0"
          />
        </div>

        {/* Key */}
        <div className="p-4">
          <input
            type="text"
            value={key}
            required
            onChange={(e) => setKey(e.target.value)}
            placeholder="Enter Key"
            className="p-2 w-full border-2 border-gray-300 rounded focus:border-blue-400 focus:outline-none focus:ring-0"
          />
        </div>

        {/* selector */}
        <div className="p-4">
          <select
            className="p-2 w-full border-2 border-gray-300 rounded 
              focus:border-blue-400
              focus:outline-none 
              focus:ring-0 
              active:outline-none 
              active:ring-0 "
              onChange={(e) => setSelected(e.target.value)}
          >
            <option value="Encrypt">Encrypt</option>
            <option value="Decrypt">Decrypt</option>
          </select>
        </div>

        {/* button */}
        <div onClick={handleCryptoGrahpy} className="p-4 mt-8">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full ">
            {selected}
          </button>
        </div>

        {/* output */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-center">Output:</h2>
          <p className="text-center">{output}</p>
        </div>
      </div>
    </div>
  );
}
