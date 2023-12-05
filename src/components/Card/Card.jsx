import React, { useEffect, useState } from "react";
import previewImg from "../../assets/preview.png";
import Rating from "../Rating/Rating";
import styles from "./Card.module.css";
const Card = ({ item, onClick }) => {
  const [preview, setPreview] = useState();
  const handleDetail = () => {
    onClick(item);
  };
  const strDate = new Date(parseInt(item.created_date)).toLocaleDateString();

  useEffect(() => {
    if (!item.img) return;

    const nextPreview = URL.createObjectURL(item.img);
    setPreview(nextPreview);
  }, [item.img]);

  return (
    <div className={styles.card_wrapper}>
      <div className={styles.card} onClick={handleDetail}>
        <div className={styles.img_wrapper}>
          <img src={preview || previewImg} />
        </div>
        <div className={styles.card_content}>
          <div className={styles.card_title}>{item.title}</div>
          <div className={styles.card_date}>{strDate}</div>
        </div>
        <div className={styles.card_rating}>
          <Rating value={item.rating} />
        </div>
      </div>
    </div>
  );
};

export default Card;
