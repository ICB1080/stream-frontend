import { Layout, Row, Col, Button} from 'antd'
import Register from './Register'
import Login from './Login'
import React from 'react'
import Favorites from './Favorites'
import CustomSearch from './CustomSearch'

const { Header } = Layout

// destructuring directly lets us get these arguments
function PageHeader({ loggedIn, signoutOnClick, signinOnSuccess, favoriteItems, customSearchOnSuccess, favOnChange }) {
  return (

    <Header className='header-background' height="64px">
      <Row justify="space-between" >
        <Col >
          <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
            <svg t="1661329608906" style={{ display: "block" }}  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3148" height="36px" width="36px"  ><path d="M734.378667 890.197333H534.357333L400.896 1024H267.093333v-133.802667H22.357333V178.176L89.258667 0h912.384v623.274667l-267.264 266.922666z m178.176-311.296V89.088H178.005333v645.461333h200.362667v133.461334l133.461333-133.461334h244.736l155.989334-155.648z" fill="#65459B" p-id="3149"></path><path d="M667.818667 267.264v267.264h89.088V267.264h-89.088z m-244.736 266.922667h89.088V267.264h-89.088v266.922667z" fill="#65459B" p-id="3150"></path></svg>
          </div>
        </Col>

        <Col>
        {loggedIn && <Favorites favoriteItems={favoriteItems} favOnChange={favOnChange} />}
        </Col>
        
        <Col>
          <CustomSearch  onSuccess={customSearchOnSuccess}/>
        </Col>
        <Col>
          {/* if loggedIn, show logout button */}
          {loggedIn && <Button onClick={signoutOnClick}>Logout</Button>}
          {/* if not loggedIn, show login component and register component */}
          {!loggedIn && (
            <>
              <Login onSuccess={signinOnSuccess} />
              <Register />
            </>
          )}
        </Col>
      </Row>
    </Header>
  )
}

export default PageHeader


