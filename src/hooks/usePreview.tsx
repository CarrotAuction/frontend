import React, { useState } from 'react';

const UsePreview = () => {
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (!target.files) return;
    const selectedFile = target.files[0];
    setFile(selectedFile);
    const reader = new FileReader();
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
      reader.onload = () => {
        setImage(reader.result as string);
      };
    }
  };

  return { file, image, handleImage };
};

export default UsePreview;
