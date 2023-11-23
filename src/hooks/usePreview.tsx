import React, { useRef, useState } from 'react';

const UsePreview = () => {
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    if (!target.files) return;
    const selectedFile = target.files[0];
    setFile(selectedFile);
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (reader.readyState === 2) {
          // 파일 onLoad가 성공하면 2, 진행 중은 1, 실패는 0 반환
          setImage(reader.result as string);
        }
      };
    }
  };

  return { file, image, handleImage };
};

export default UsePreview;
