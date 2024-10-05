import React, { useMemo, useRef } from 'react';
// import {JoditEditor} from 'jodit-react';

interface MyEditorProps {
    value: string;
    setEditorValue: (value: string) => void; // Correct function to update the value
}

const JoditTextEditor: React.FC<MyEditorProps> = ({ value, setEditorValue }) => {
    // Ref for the editor instance
    // const editorRef = useRef(null);

    // // Jodit editor configuration
    // const config = useMemo(
    //     () => ({
    //         enableDragAndDropFileToEditor: true,
    //         spellcheck: true,
    //         readonly: false,
    //         placeholder: '',
    //         "autofocus": true,
    //         uploader: {
    //             insertImageAsBase64URI: true, // Should work if Jodit supports this
    //         },
    //         statusbar: false,
    //         sizeLG: 900,
    //         sizeMD: 700,
    //         sizeSM: 400,
    //         toolbarAdaptive: false,
    //         defaultLineHeight: 1.5,
    //         buttons: [
    //             'format', // Headings options
    //             'bold', 'italic', 'underline', 'strikethrough', // Text formatting
    //             '|', // Separator
    //             'ul', 'ol', 'indent', 'outdent', // List options
    //             '|',
    //             'font', 'fontsize', 'brush', 'paragraph', // Font size, style
    //             '|',
    //             'align', // Text alignment
    //             '|',
    //             'undo', 'redo', // Undo/Redo
    //             '|',
    //             'hr', 'link', 'image', // Insert options (line, link, image)
    //             '|',
    //         ],
    //         defaultMode: 1, // WYSIWYG mode
    //     }),
    //     [],
    // );


    return (
<></>
        // <JoditEditor
        //     ref={editorRef}
        //     value={value} // Set the initial value
        //     config={config} // Pass the correct configuration
        //     onBlur={(newContent: string) => setEditorValue(newContent)} // Update the state on blur
        // />
    );
};

export default JoditTextEditor;
