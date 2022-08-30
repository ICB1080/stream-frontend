import { Menu, Button, Row, Col, message } from "antd";
import React from "react";
import { DeleteOutlined } from '@ant-design/icons';
import { deleteFavoriteItem } from "../utils";

// traverse list of favourite video/clip/steam
// wrap each element by Menu.Item
function FavoriteItem({ items, favOnChange }) {

  const onFavoriteDelete = (item, favOnChange) => {
    deleteFavoriteItem(item).then(
      () => favOnChange()
    ).catch(err => message.error(err.message))
  }
  return items.map((item) => (
    <Menu.Item key={item.id}>
      <Row justify="space-between">
        <Col>
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            {`${item.broadcaster_name} - ${item.title}`}
          </a >
        </Col>
        <Col>
          <Button icon={<DeleteOutlined />} onClick={() => { onFavoriteDelete(item, favOnChange) }} ></Button>
        </Col>
      </Row>
    </Menu.Item>
  ));
}

export default FavoriteItem;
