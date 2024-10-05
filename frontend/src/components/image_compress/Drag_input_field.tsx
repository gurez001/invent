import React from "react";
import { useDropzone, DropzoneOptions, Accept } from "react-dropzone";

// Define the type for the onDrop function prop
interface DragInputFieldProps {
  onDrop: (acceptedFiles: File[]) => void;
}

const Drag_input_field: React.FC<DragInputFieldProps> = ({ onDrop }) => {
  // Configure dropzone options
  const accept: Accept = {
    'image/*': [] // Allows all image file types
  };
  const dropzoneOptions: DropzoneOptions = {
    onDrop,
    accept,
    multiple: true, // Allow multiple files
  };

  // Use the dropzone hook
  const { getRootProps, getInputProps } = useDropzone(dropzoneOptions);

  return (
    <div>
      <div
        {...getRootProps({
          className:
            "dropzone px-10 py-14 border-dashed border-1 rounded-xl cursor-pointer border-current bg-red",
        })}
        style={{border:'1px solid #00000033',margin:'0px 0 10px'}}
      >
        <input {...getInputProps()} />
        <p  >Drag 'n' drop some files here, or click to select files</p>
      </div>
    </div>
  );
};

export default Drag_input_field;
