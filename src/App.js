import React, { useState, useEffect } from 'react';
import { LikeOutlined, FireOutlined } from '@ant-design/icons';
import { Layout, message, Menu } from 'antd';
import { logout, getFavoriteItem, getTopGames } from './utils';
import PageHeader from './components/PageHeader'


const { Content, Sider } = Layout;

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [topGames, setTopGames] = useState([])

  useEffect(() => {
    getTopGames()
      .then((data) => {
        // console.log(data)
        setTopGames(data)
      }).catch((err) => {
        message.error(err.message)
      })
  }, [])


  const signinOnSuccess = () => {
    setLoggedIn(true);
    getFavoriteItem().then((data) => {
      setFavoriteItems(data);
    });
  }

  const signoutOnClick = () => {
    logout().then(() => {
      setLoggedIn(false)
      message.success('Successfully Signed out')
    }).catch((err) => {
      message.error(err.message)
    })
  }

  const mapTopGamesToProps = (topGames) => [
    {
      label: "Recommend for you!",
      key: "recommendation",
      icon: <LikeOutlined />,
    },
    {
      label: "Popular Games",
      key: "popular_games",
      icon: <FireOutlined />,
      children: topGames.map((game) => ({
        label: game.name,
        key: game.id,
        icon:
          <img
            alt="placeholder"
            src={game.box_art_url.replace('{height}', '40').replace('{width}', '40')}
            style={{ borderRadius: '50%', marginRight: '20px' }}
          />
      }))
    }
  ]


  return (
    <Layout>
      <PageHeader
          loggedIn={loggedIn}
          signoutOnClick={signoutOnClick}
          signinOnSuccess={signinOnSuccess}
          favoriteItems={favoriteItems}
        />
      <Layout>
        <Sider width={300} className="sider-background" style={{minHeight: '100vh'}}>
        <Menu 
            mode="inline"
            onSelect={() => { }}
            items={mapTopGamesToProps(topGames)}
          />
        </Sider>
        <Layout>
          <Content
            className="content-background"
            style={{
              padding: 24,
              margin: 0,
              height: 800,
              overflow: 'auto'
            }}
          >
            {'Home'}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default App;
