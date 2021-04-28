import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import TopBar from "./components/TopBar";
import BottomBar from "./components/BottomBar";
import ContentContainer from "./components/ContentContainer";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import MemePage from "./pages/MemePage";
import Authentication from "./pages/Authentication";
import Upload from "./pages/Upload";

const Router = () => {
  return (
    <BrowserRouter>
      <TopBar />

      <ContentContainer>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/auth/:isLogin" component={Authentication} />
          <Route path="/profile/:userId" component={Profile} />
          <Route path="/meme/:id" component={MemePage} />
          <Route path="/upload" component={Upload} />
        </Switch>
      </ContentContainer>

      <BottomBar />
    </BrowserRouter>
  );
};

export default Router;
