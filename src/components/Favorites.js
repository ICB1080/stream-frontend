import React, { useState } from 'react'
import FavoriteItem from './FavoriteItem'
import { Menu, Button, Drawer } from 'antd';
import { EyeOutlined, YoutubeOutlined, VideoCameraOutlined, HeartFilled } from '@ant-design/icons';

const { SubMenu } = Menu

function Favorites({ favoriteItems, favOnChange }) {
  const [displayDrawer, setDisplayDrawer] = useState(false)
  const { VIDEO, STREAM, CLIP } = favoriteItems;

  const onDrawerClose = () => {
    setDisplayDrawer(false)
  }

  const onFavoriteClick = () => {
    setDisplayDrawer(true)
  }

  return (
    <>
      <Button type="primary" onClick={onFavoriteClick} icon={<HeartFilled />}>
        My Favorites
      </Button>
      <Drawer
        title="My Favorites"
        placement="right"
        width={720}
        visible={displayDrawer}
        onClose={onDrawerClose}
      >
        <Menu
          mode="inline"
          defaultOpenKeys={['streams']}
          style={{ height: '100%', borderRight: 0 }}
          selectable={false}
        >
          <SubMenu key={'streams'} icon={<EyeOutlined />} title="Streams">
            <FavoriteItem items={STREAM} favOnChange={favOnChange} />
          </SubMenu>
          <SubMenu key={'videos'} icon={<YoutubeOutlined />} title="Videos">
            <FavoriteItem items={VIDEO} favOnChange={favOnChange} />
          </SubMenu>
          <SubMenu key={'clips'} icon={<VideoCameraOutlined />} title="Clips">
            <FavoriteItem items={CLIP} favOnChange={favOnChange} />
          </SubMenu>
        </Menu>
      </Drawer>
    </>
  )
}

export default Favorites
