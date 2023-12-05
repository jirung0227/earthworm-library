import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import previewImg from "../../assets/preview.png";
import Button from "../Button/Button";
import FileInput from "../FileInput/FileInput";
import Rating from "../Rating/Rating";
import RatingInput from "../RatingInput/RatingInput";
import styles from "./Modal.module.css";
const Backdrop = ({ onClose }) => {
  return <div className={styles.backdrop} onClick={onClose} />;
};

const ModalOverlay = ({
  isNew = false,
  originItem,
  onClose,
  onNew,
  onEdit,
  onDelete,
}) => {
  const [item, setItem] = useState(originItem);
  const [isEdit, setIsEdit] = useState(false);
  const [preview, setPreview] = useState();
  const handleNew = () => {
    if (isNew) {
      onNew(item);
    } else {
      onEdit(item);
    }

    onClose();
  };

  const handleCancel = () => {
    setIsEdit(false);
  };

  const handleDelete = () => {
    onDelete(item.id);
    onClose();
  };

  const handleEdit = () => {
    setIsEdit(true);
    setItem(originItem);
  };

  const handleChangeState = (e) => {
    setItem((item) => {
      return { ...item, [e.target.name]: e.target.value };
    });
  };

  const handleChange = (name, value) => {
    setItem((item) => ({
      ...item,
      [name]: value,
    }));
  };

  const strDate = new Date(parseInt(item.created_date)).toLocaleDateString();

  useEffect(() => {
    if (!item.img) return;
    const nextPreview = URL.createObjectURL(item.img);
    setPreview(nextPreview);
  }, [item.img]);

  if (isNew || isEdit) {
    return (
      <div className={styles.modal}>
        <FileInput name='img' value={item.img} onChange={handleChange} />

        <div className={styles.content_wrapper}>
          <input
            className={styles.title}
            type='text'
            name='title'
            placeholder='책 이름'
            value={item.title}
            onChange={handleChangeState}
          />
          <input
            className={styles.author}
            type='text'
            name='author'
            placeholder='저자'
            value={item.author}
            onChange={handleChangeState}
          />

          <textarea
            className={styles.content}
            name='content'
            placeholder='후기를 입력해주세요'
            value={item.content}
            onChange={handleChangeState}
          />
          <RatingInput
            name='rating'
            value={item.rating}
            onChange={handleChange}
          />

          <div className={styles.actions}>
            <Button onClick={handleNew} label='저장' />
            <div className={styles.space}></div>
            <Button onClick={handleCancel} label='취소' />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.modal}>
        <div className={styles.img_wrapper}>
          <img className={styles.img} src={preview || previewImg} />
        </div>

        <div className={styles.content_wrapper}>
          <div className={styles.title}>{item.title}</div>
          <div className={styles.author}>{item.author}</div>

          <div className={styles.content}>{item.content}</div>
          <div className={styles.rating}>
            <Rating value={item.rating} />
          </div>

          <footer className={styles.footer}>
            <div className={styles.date}>{strDate}</div>
            <div className={styles.actions}>
              <Button onClick={handleEdit} label='수정' />
              <div className={styles.space}></div>
              <Button onClick={handleDelete} label='삭제' />
            </div>
          </footer>
        </div>
      </div>
    );
  }
};
const Modal = ({ originItem, isNew, onClose, onNew, onEdit, onDelete }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={onClose} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          originItem={originItem}
          isNew={isNew}
          onClose={onClose}
          onNew={onNew}
          onEdit={onEdit}
          onDelete={onDelete}
        />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};
export default Modal;
