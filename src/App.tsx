import { useCallback, useEffect, useState, useRef } from "react";
import { generatePassword, generateBase64 } from "./functions";
import "./App.css";

function App() {
  const [isBase64, setIsBase64] = useState(false);
  const [length, setLength] = useState(8);
  const [pass, setPass] = useState("");
  const [copy, setCopy] = useState("Copy");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const generate = useCallback(() => {
    if (isBase64) {
      setPass(generateBase64(length));
    } else {
      setPass(generatePassword(length));
    }
    setCopy("Copy");
  }, [length, isBase64]);

  useEffect(() => {
    generate();
  }, [generate]);

  return (
    <div className="flex flex-col max-w-md m-4">
      <h1 className="text-3xl font-bold text-purple-500">Password Generator</h1>
      <div className="flex flex-row pt-2">
        <button
          onClick={() => {
            setIsBase64(!isBase64);
          }}
          className={`${
            isBase64 ? "bg-purple-300 border-purple-300" : "bg-purple-500 border-purple-500"
          } flex-1 rounded-lg  p-3 border-2 text-white text-center my-2 mr-2`}
        >
          Password
        </button>
        <button
          onClick={() => {
            setIsBase64(!isBase64);
          }}
          className={`${
            !isBase64
              ? "bg-purple-300 border-purple-300"
              : "bg-purple-500 border-purple-500"
          } flex-1 rounded-lg  p-3 border-2 text-white text-center my-2`}
        >
          Base64
        </button>
      </div>
      <div className="flex flex-row align-middle my-2">
        <div className="mr-2">{length}</div>
        <input
          type="range"
          min={6}
          max={128}
          step={1}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="flex-1 accent-purple-500"
        ></input>
      </div>
      <textarea
        ref={inputRef}
        value={pass}
        onChange={() => {}}
        rows={5}
        className="border-purple-500 border-solid border-2 p-3 rounded-lg my-2 resize-none"
      />
      <div className="flex flex-row">
        <button
          onClick={generate}
          className="flex-1 rounded-lg bg-purple-500 border-purple-500 p-3 border-2 text-white text-center my-2 mr-2"
        >
          Generate
        </button>
        <button
          onClick={() => {
            if (navigator.clipboard) {
              navigator.clipboard
                .writeText(pass)
                .then(() => {
                  setCopy("Copied!");
                })
                .catch(() => {
                  setCopy("Error!");
                });
            } else {
              setCopy("Error!");
            }
          }}
          className="flex-1 rounded-lg bg-purple-500 border-purple-500 p-3 border-2 text-white text-center my-2"
        >
          {copy}
        </button>
      </div>
    </div>
  );
}

export default App;
