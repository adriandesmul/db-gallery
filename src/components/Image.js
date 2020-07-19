import React, { useState, useEffect } from "react";
import { Comment, List } from "antd";

import Axios from "axios";
const url = "https://digitalblasphemy.com";

export default function Image({ href }) {
  const [title, setTitle] = useState();
  const [imgUrl, setImgUrl] = useState();
  const [story, setStory] = useState();
  const [comments, setComments] = useState([]);
  const [resolutions, setResolutions] = useState([]);

  useEffect(() => {
    Axios.get(url + href).then(({ data }) => {
      console.log(data);
      setTitle(data.title);
      setImgUrl(data.preview);
      setStory(data.story[0]);
      setComments(data.comments);
      setResolutions(data.resolutions);
    });
  }, [href]);

  const html = (content) => {
    return { __html: content };
  };

  return (
    <div style={{ width: "100%", margin: 10 }}>
      <div style={{ display: "flex", width: "100%", margin: 10 }}>
        <div>
          <img
            src={url + imgUrl}
            alt={title + " preview"}
            style={{ margin: 10 }}
          />
        </div>
        <div>
          <h1>{title}</h1>
          <p>{story}</p>
        </div>
      </div>
      <List
        bordered
        dataSource={comments}
        renderItem={(i) => (
          <List.Item style={{ borderColor: "#d9d9d9" }}>
            <Comment
              author={<div dangerouslySetInnerHTML={html(i.user)} />}
              datetime={i.date}
              content={
                <>
                  <strong>{i.title}</strong>
                  <br />
                  <div dangerouslySetInnerHTML={html(i.text)} />
                </>
              }
            />
          </List.Item>
        )}
      ></List>
    </div>
  );
}
