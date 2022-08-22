import { Menu } from "antd";
import React from "react";

// traverse list of favourite video/clip/steam
// wrap each element by Menu.Item
function FavoriteItem({ items }) {
  return items.map((item) => (
    <Menu.Item key={item.id}>
      <a href={item.url} target="_blank" rel="noopener noreferrer">
        {`${item.broadcaster_name} - ${item.title}`}
      </a>
    </Menu.Item>
  ));
}

export default FavoriteItem;
