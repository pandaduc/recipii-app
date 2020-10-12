import React from 'react';
import { Box, Flex } from "@chakra-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { Sidebar } from '../Sidebar';
import { RecipeList } from '../RecipeList';
import { RecipeDetails } from '../RecipeDetails';

function Main() {
  return (
    <>
      <Router>
        <Flex height="100vh" pl="10%">
          <Sidebar />

          <Box
            bg="white"
            width={[
              "100%", // base
              "90%" // 480px upwards
            ]}
            p="8"
            pl="20"
            pr="20"
          >
            {/*
              A <Switch> looks through all its children <Route>
              elements and renders the first one whose path
              matches the current URL. Use a <Switch> any time
              you have multiple routes, but you want only one
              of them to render at a time
            */}
            <Switch>
              <Route exact path="/" children={<RecipeList />} />
              <Route path="/recipe/:id" children={<RecipeDetails />} />
            </Switch>
          </Box>
        </Flex>
      </Router>
    </>
  )
}

export default Main;