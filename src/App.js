import React, { useState, useEffect } from "react";
import { Breadcrumb, Layout, Menu, Card } from "antd";
import Axios from "axios";
import Topic from "./components/Topic";
import Image from "./components/Image";
import "./app.css";

const { Header, Content } = Layout;
const { SubMenu } = Menu;
const url = "https://digitalblasphemy.com";

function App() {
  const [categories, setCategories] = useState([]);
  const [newest, setNewest] = useState([]);
  const [themes, setThemes] = useState([]);
  const [free, setFree] = useState([]);
  const [years, setYears] = useState([]);

  const [topic, setTopic] = useState({
    name: "Abstract",
    href: "y=todos&t=1&w=&h=&r=1&f=",
  });
  const [selectedImg, setSelectedImg] = useState({
    bigthumbnail: "/graphics/640x480/flourish1640.jpg",
    free: 0,
    gallery: "Abstracts",
    href: "/cgi-bin/preview_json.cgi?i=flourish1",
    id: "flourish1",
    idx: 0,
    rating: 8.85,
    thumbnail: "/graphics/thumbs/flourish1_xthumb.jpg",
    title: "The Flourish",
    year: "todos",
  });

  useEffect(() => {
    Axios.get("https://digitalblasphemy.com/galleries.json").then(
      ({ data }) => {
        data = data.map((i) => {
          return { ...i, href: i.href.split("?")[1] };
        });
        const menuItem = (i) => (
          <Menu.Item
            key={i.name}
            onClick={() => setTopic({ name: i.name, href: i.href })}
          >
            {i.name}
          </Menu.Item>
        );

        setCategories(data);
        setNewest(data.filter((i) => i.name === "Newest").map(menuItem));
        setThemes(
          data
            .slice(
              1,
              data.findIndex((i) => i.name === "FREE Samples")
            )
            .map(menuItem)
        );
        setFree(data.filter((i) => i.name === "FREE Samples").map(menuItem));
        setYears(
          data
            .slice(data.findIndex((i) => i.name === "FREE Samples") + 1)
            .map(menuItem)
        );
      }
    );
  }, []);

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
      onClick={() => setTopic({ name: i.name, href: i.href })}
      title={i.name}
    ></Card>
  ));

  return (
    <Layout className="layout">
      <Header>
        <div className="name" onClick={() => setTopic()}>
          DB Gallery
        </div>
        <Menu theme="dark" mode="horizontal">
          {newest}
          <SubMenu title="Categories">{themes}</SubMenu>
          {free}
          <SubMenu title="Years">{years}</SubMenu>
        </Menu>
      </Header>
      <Content style={{ display: "flex", flexWrap: "wrap" }}>
        <Breadcrumb style={{ margin: "24px 0px 0px 10px" }}>
          <Breadcrumb.Item
            onClick={() => setTopic()}
            style={{ cursor: "pointer" }}
          >
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item onClick={() => setSelectedImg()}>
            {topic.name}
          </Breadcrumb.Item>
          {selectedImg && (
            <Breadcrumb.Item>{selectedImg.title}</Breadcrumb.Item>
          )}
        </Breadcrumb>
        {!topic && !selectedImg && cards}
        {topic && !selectedImg && (
          <Topic listAttr={topic.href} setSelectedImg={setSelectedImg}></Topic>
        )}
        {selectedImg && <Image href={selectedImg.href} />}
      </Content>
    </Layout>
  );
}

export default App;
