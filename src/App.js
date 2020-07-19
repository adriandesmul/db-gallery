import React, { useState, useEffect } from "react";
import { Layout, Menu, Card } from "antd";
import Axios from "axios";
import "antd/dist/antd.css";
import "./app.css";

const { Header, Content } = Layout;
const url = "https://digitalblasphemy.com";

function App() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    Axios.get("https://digitalblasphemy.com/galleries.json").then(({ data }) =>
      setCategories(data)
    );
  }, []);

  const getJSON = (url) => {
    Axios.get("https://digitalblasphemy.com" + url).then(
      ({ data }) => console.log(data)
      // setCategories(data)
    );
  };

  console.log(categories);
  const cards = categories.map((i) => (
    <Card
      hoverable
      key={i.name}
      style={{ flex: "1 0 500px", margin: "10px" }}
      cover={
        <img
          crossOrigin="anonymous"
          alt={i.name + " thumb"}
          src={url + i.thumb}
        />
      }
      onClick={() => getJSON(i.href)}
      title={i.name}
    ></Card>
  ));

  return (
    <Layout className="layout">
      <Header>
        <div className="name">DB Gallery</div>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="1">1</Menu.Item>
          <Menu.Item key="2">2</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ display: "flex", flexWrap: "wrap" }}>{cards}</Content>
    </Layout>
  );
}

export default App;
