import React, { useState } from 'react'
import FavoriteItem from './FavoriteItem'
import { Menu, Button, Drawer } from 'antd';
import { EyeOutlined, YoutubeOutlined, VideoCameraOutlined, HeartFilled } from '@ant-design/icons';
 
const { SubMenu } = Menu
 
function Favorites({ favoriteItems }) {
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
            <FavoriteItem items={STREAM} />
          </SubMenu>
          <SubMenu key={'videos'} icon={<YoutubeOutlined />} title="Videos">
            <FavoriteItem items={VIDEO} />
          </SubMenu>
          <SubMenu key={'clips'} icon={<VideoCameraOutlined />} title="Clips">
            <FavoriteItem items={CLIP} />
          </SubMenu>
        </Menu>
      </Drawer>
    </>
  )
}
 
export default Favorites
