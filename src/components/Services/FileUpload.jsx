import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import DoorEffect from "../UI-related-components/DoorOpen";
import { CiFileOn } from "react-icons/ci";
import ProcessFiles from "./ProcessFiles";
import Curtains from "../UI-related-components/Curtains";
import { ImArrowDown } from "react-icons/im";

const FileUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setUploadedFiles((prev) => {
        return [...prev, ...acceptedFiles];
      });
    },
  });

  const [curtains, setCurtains] = useState(false);

  const submitHandler = async () => {
    setCurtains(true);
    setTimeout(() => {
      setProcessing(true);
      setCurtains(false);
    }, 1000);
  };

  const [processing, setProcessing] = useState(false);

  return (
    <div className=" bg-white rounded-2xl  ">
      {!processing && (
        <div className="flex flex-col items-center p-4 md:p-7 gap-7 w-[90vw] md:w-[50vw] lg:w-[40vw] mx-auto">
          <div className="flex flex-col justify-center items-center gap-4">
            <p className="text-xl font-bold text-center">
              Put your potentially malicious file into this window.
            </p>
            <div>
              <ImArrowDown size={30}/>
            </div>
          </div>
          <div
            {...getRootProps()}
            className=" rounded-3xl bg-white h-[40vh] drop-box-container focus:outline-none transition duration-300 ease-in-out cursor-pointer"
          >
            <input {...getInputProps()} />
            <DoorEffect />
          </div>
          <ul>
            {uploadedFiles.map((file) => (
              <li key={file.name}>
                <div className="flex gap-16  items-center">
                  <div className="relative">
                    <CiFileOn size={80} />
                    <p className="absolute top-[50%] -right-[50%] text-xs bg-blue-500 text-white p-1 rounded-md">
                      {file.type}
                    </p>
                  </div>

                  <p className="font-semibold text-lg">{file.name}</p>
                </div>
              </li>
            ))}
          </ul>

          {uploadedFiles.length > 0 && <p>You can add more files</p>}
          {uploadedFiles.length > 0 && (
            <button
              onClick={submitHandler}
              className="font-semibold bg-black text-white px-7 py-2 rounded-full border-[1.5px] border-black hover:text-black hover:bg-white transition duration-300"
            >
              Launch
            </button>
          )}
          {uploadedFiles.length === 0 && (
            <p>
              Click to browse to your files{" "}
              <span className="underline">OR</span> Drag and drop your files
            </p>
          )}
        </div>
      )}

      {processing && (
        <ProcessFiles
          uploadFiles={uploadedFiles}
          setProcessing={setProcessing}
        />
      )}
      {curtains && <Curtains />}
    </div>
  );
};
export default FileUpload;
