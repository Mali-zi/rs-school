import React from 'react';
import { useController, Control } from 'react-hook-form';
import { IFormInput } from '../utils/interfaces';
import { fileToBase64 } from '../utils/fileToBase64';

const CustomImage = ({ control }: { control: Control<IFormInput> }) => {
  const { field } = useController({
    control,
    name: 'image',
    rules: { required: true },
  });

  return (
    <>
      <label htmlFor="image" className="form-label fw-semibold mb-1">
        Picture
      </label>
      <input
        ref={field.ref}
        type="file"
        className="form-control"
        onChange={async (e) => {
          let tempFileList = { fileName: '', base64String: '' };
          const files = e.target.files;
          if (files) {
            const file = files[0];
            tempFileList = {
              fileName: file.name,
              base64String:
                file.type.indexOf('image') > -1 ? await fileToBase64(file) : '',
            };
          }
          field.onChange(tempFileList.base64String);
        }}
      />
    </>
  );
};

export default CustomImage;
