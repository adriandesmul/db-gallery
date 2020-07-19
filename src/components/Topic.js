import React, { useState, useEffect } from "react";
import { List, Card, Radio } from "antd";
import { StarFilled } from "@ant-design/icons";

import Axios from "axios";
const url = "https://digitalblasphemy.com";

export default function Topic({ listAttr, setSelectedImg }) {
  const [images, setImages] = useState([]);
  const [order, setOrder] = useState("release");

  useEffect(() => {
    Axios.get(
      "https://digitalblasphemy.com/cgi-bin/seeall_json.cgi?" + listAttr
    ).then(({ data }) => {
      setImages(
        data.map((i, idx) => {
          return { ...i, idx, rating: parseFloat(i.rating) };
        })
      );
      console.log(data);
    });
  }, [listAttr]);

  const cards = images.sort((a, b) => {
    // console.log(order, a, b);
    if (order === "release") return a.idx - b.idx;
    return b.rating - a.rating;
  });

  const renderCard = (i) => (
    <List.Item>
      <Card
        hoverable
        style={{ flex: "1 0 400px", margin: "10px" }}
        key={i.idx}
        cover={
          <img alt="thumb" src={url + i.thumbnail} crossOrigin="anonymous" />
        }
        onClick={() => {
          console.log(i);
          setSelectedImg(i);
        }}
      >
        <Card.Meta
          title={i.title}
          description={
            <>
              {i.rating} <StarFilled />
            </>
          }
        ></Card.Meta>
      </Card>
    </List.Item>
  );

  return (
    <>
      <div style={{ position: "relative" }}>
        <div
          style={{
            display: "block",
            position: "absolute",
            top: 24,
            left: 10,
            zIndex: 10,
          }}
        >
          Sort by:{" "}
          <Radio.Group value={order} onChange={(i) => setOrder(i.target.value)}>
            <Radio.Button value="release">Release Date</Radio.Button>
            <Radio.Button value="rating">Rating</Radio.Button>
          </Radio.Group>
        </div>
        <List
          pagination={{ pageSize: 12, position: "top" }}
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 4,
            xxl: 4,
          }}
          dataSource={cards}
          renderItem={renderCard}
        ></List>
      </div>
    </>
  );
}
