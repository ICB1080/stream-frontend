import React from 'react';
import { Button, Card, List, Tabs, Tooltip, message } from 'antd';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import { addFavoriteItem, deleteFavoriteItem } from '../utils';
 
const { TabPane } = Tabs;
// like enums
const tabKeys = {
  Streams: 'stream',
  Videos: 'videos',
  Clips: 'clips',
}
 
// convert symbol in url to number
const processUrl = (url) => url
  .replace('%{height}', '252')
  .replace('%{width}', '480')
  .replace('{height}', '252')
  .replace('{width}', '480');
 
const renderCardTitle = (item, loggedIn, favs = [], favOnChange) => {
  const title = `${item.broadcaster_name} - ${item.title}`;
 
  const isFav = favs.find((fav) => fav.id === item.id);

  const favOnClick = () => {
    if (isFav) {
      deleteFavoriteItem(item).then(() => {
        favOnChange();
      }).catch(err => {
        message.error(err.message)
      })
      return;
    }
 
    addFavoriteItem(item).then(() => {
      favOnChange();
    }).catch(err => {
      message.error(err.message)
    })
}
  return (
    <>
      {
        // if loggedin, 
        // if fav -> popup tip: remove from favourite
        // if !fav -> popup tip: add to favourite
        loggedIn &&
        <Tooltip title={isFav ? "Remove from favorite list" : "Add to favorite list"}>
          <Button shape="circle" icon={isFav ? <StarFilled /> : <StarOutlined />} 
          onClick={favOnClick}
          />
        </Tooltip>
      }
      {/* show popup tip of title when mouse enter title */}
      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', width: 450 }}>
        <Tooltip title={title}>
          <span>{title}</span>
        </Tooltip>
      </div>
    </>
  )
}

 
const renderCardGrid = (data, loggedIn, favs, favOnChange) => {
  return (
    <List
      grid={{
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 3,
        xxl:3
      }}
      dataSource={data}
      renderItem={item => (
        <List.Item style={{ marginRight: '20px' }}>
          <Card
            title={renderCardTitle(item, loggedIn, favs, favOnChange)}
          >
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              <img
                alt="Placeholder" 
                src={processUrl(item.thumbnail_url)}
                width="100%"
              />
            </a>
          </Card>
        </List.Item>
      )}
    />
  )
}
 
const Home = ({ resources, loggedIn, favoriteItems, favOnChange }) => {
  const { VIDEO, STREAM, CLIP } = resources;
  const { VIDEO: favVideos, STREAM: favStreams, CLIP: favClips } = favoriteItems;
 
  return (
    <Tabs
      defaultActiveKey={tabKeys.Streams}
    >
      <TabPane tab="Streams" key={tabKeys.Streams} style={{ height: '100%', overflow: 'auto' }} forceRender={true}>
        {renderCardGrid(STREAM, loggedIn, favStreams, favOnChange)}
      </TabPane>
      <TabPane tab="Videos" key={tabKeys.Videos} style={{ height: '100%', overflow: 'auto' }} forceRender={true}>
        {renderCardGrid(VIDEO, loggedIn, favVideos, favOnChange)}
      </TabPane>
      <TabPane tab="Clips" key={tabKeys.Clips} style={{ height: '100%', overflow: 'auto' }} forceRender={true}>
        {renderCardGrid(CLIP, loggedIn, favClips, favOnChange)}
      </TabPane>
    </Tabs>
  );
}
 
export default Home;
 
