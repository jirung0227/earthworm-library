import { useEffect, useRef, useState } from "react";
import previewImg from "../../assets/preview.png";
import styles from "./FileInput.module.css";
const FileInput = ({ name, value, onChange }) => {
  const [preview, setPreview] = useState();
  const inputRef = useRef();

  const handleChange = (e) => {
    const nextValue = e.target.files[0];
    onChange(name, nextValue);
  };

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    inputNode.value = "";
    onChange(name, null);
    setPreview(null);
  };

  useEffect(() => {
    if (!value) return;
    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);
  }, [value]);

  return (
    <div className={styles.fileInput}>
      <img
        className={`${styles.fileInputPreview} ${
          preview ? styles.selected : ""
        }`}
        src={preview || previewImg}
        alt='이미지 미리보기'
      />
      <input
        className={styles.fileInputHiddenOverlay}
        type='file'
        accept='image/png, image/jpeg'
        onChange={handleChange}
        ref={inputRef}
      />
      {value && (
        <button
          className={styles.fileInputClearButton}
          onClick={handleClearClick}
        >
          X
        </button>
      )}
    </div>
  );
};

export default FileInput;
