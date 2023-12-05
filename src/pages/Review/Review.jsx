import React, { useEffect, useReducer, useRef, useState } from "react";

import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import ControlMenu from "../../components/ControlMenu/ControlMenu";
import Modal from "../../components/Modal/Modal";
import styles from "./Review.module.css";
const sortOptionList = [
  {
    value: "latest",
    name: "최신순",
  },
  {
    value: "oldest",
    name: "오래된 순",
  },
  {
    value: "rating-desc",
    name: "별점 높은 순",
  },
  {
    value: "rating-asc",
    name: "별점 낮은 순",
  },
];

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      return action.data;
    case "New":
      return [{ ...action.data, created_date: new Date().getTime() }, ...state];
    case "UPDATE":
      return state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
    case "REMOVE":
      if (action.targetId) {
        return state.filter((data) => data.id !== action.targetId);
      }
      return state;
    default:
      return state;
  }
};

function Review() {
  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(0);
  const [item, setItem] = useState({});

  const [showModal, setShowModal] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [sortType, setSortType] = useState("latest");

  const getDate = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());
    const initData = res.slice(0, 20).map((it) => {
      return {
        img: "",
        title: it.name,
        author: it.email,
        content: it.body,
        rating: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++,
      };
    });
    dispatch({ type: "INIT", data: initData });
  };

  useEffect(() => {
    getDate();
  }, []);

  const onNew = (data) => {
    dispatch({ type: "New", data: { ...data, id: dataId.current++ } });
  };

  const onEdit = (data) => {
    dispatch({ type: "UPDATE", data });
  };

  const onDelete = (id) => {
    dispatch({ type: "REMOVE", targetId: id });
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleUnshownModal = () => {
    setShowModal(false);
    if (isNew) {
      setIsNew(false);
    }
  };

  const onShownNewModal = () => {
    handleShowModal();
    setIsNew(true);
    setItem({
      img: "",
      title: "",
      author: "",
      content: "",
      rating: 1,
    });
  };

  const onShownDetailModal = (item) => {
    handleShowModal();
    setItem(item);
  };

  const getProcessedItemList = () => {
    const compare = (a, b) => {
      switch (sortType) {
        case "latest":
          return parseInt(b.created_date) - parseInt(a.created_date);
        case "oldest":
          return parseInt(b.created_date) - parseInt(a.created_date);
        case "rating-desc":
          return parseInt(b.rating) - parseInt(a.rating);
        case "rating-asc":
          return parseInt(a.rating) - parseInt(b.rating);
        default:
          break;
      }
    };

    const copyList = [...data];
    const sortedList = copyList.sort(compare);

    return sortedList;
  };

  return (
    <>
      <h2 className={styles.title}>
        독서후기 <Button primary label='작성하기' onClick={onShownNewModal} />
      </h2>

      <ControlMenu
        value={sortType}
        onChange={setSortType}
        optionList={sortOptionList}
      />

      {showModal && (
        <Modal
          originItem={item}
          isNew={isNew}
          onNew={onNew}
          onEdit={onEdit}
          onDelete={onDelete}
          onClose={handleUnshownModal}
        />
      )}
      <div className={styles.reviewList}>
        {getProcessedItemList().map((it) => {
          return <Card key={it.id} item={it} onClick={onShownDetailModal} />;
        })}
      </div>
    </>
  );
}

export default Review;
