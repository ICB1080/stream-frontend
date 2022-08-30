import React, { useState, useEffect } from 'react';
import { LikeOutlined, FireOutlined } from '@ant-design/icons';
import { Layout, message, Menu } from 'antd';
import {
  logout,
  getFavoriteItem,
  getTopGames,
  searchGameById,
  getRecommendations
} from './utils';
import PageHeader from './components/PageHeader'
import Home from './components/Home'


const { Content, Sider } = Layout;

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [favoriteItems, setFavoriteItems] = useState({
    VIDEO: [], STREAM: [], CLIP: []
  });
  const [topGames, setTopGames] = useState([])
  // resources: data used in content of layout
  const [resources, setResources] = useState({
    VIDEO: [],
    STREAM: [],
    CLIP: [],
  });

  useEffect(() => {
    getRecommendations()
    .then((data) => {
      setResources(data)
    }).catch((err) =>
      message.error(err.message)
    )
  }, [])


  useEffect(() => {
    getTopGames()
      .then((data) => {
        // console.log(data)
        setTopGames(data)
      }).catch((err) => {
        message.error(err.message)
      })
  }, [])

  const favoriteOnChange = () => {
    // rerender My favorite data from backend
    getFavoriteItem()
      .then((data) => {
        setFavoriteItems(data);
      })
      .catch((err) => {
        message.error(err.message);
      });
  };


  const signinOnSuccess = () => {
    setLoggedIn(true);
    favoriteOnChange();
  }

  const signoutOnClick = () => {
    logout().then(() => {
      setLoggedIn(false)
      message.success('Successfully Signed out')
    }).catch((err) => {
      message.error(err.message)
    })
  }

  const customSearchOnSuccess = (data) => {
    setResources(data);
  }

  const onGameSelect = ({ key }) => {
    // menu has two choices: 
    // 1. recommendation
    if (key === "recommendation") {
      getRecommendations().then((data) => {
        setResources(data);
      });

      return;
    }
    // 2. popular games
    searchGameById(key).then((data) => {
      setResources(data);
    });
  };

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
      children: topGames.map(
        (game) => ({
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
        customSearchOnSuccess={customSearchOnSuccess}
        favOnChange={favoriteOnChange}
      />
      <Layout>
        <Sider width={300} className="sider-background" style={{ minHeight: '100vh' }}>
          <Menu
            mode="inline"
            onSelect={onGameSelect}
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
            <Home
              resources={resources}
              loggedIn={loggedIn}
              favoriteItems={favoriteItems}
              favOnChange={favoriteOnChange}
            />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default App;
