import React from 'react';
import { Link } from "react-router-dom";
import { gql, useQuery } from '@apollo/client';
import { Box, Heading, Image, Grid } from "@chakra-ui/core";
import { Searchbar } from '../Searchbar';

// TODO: to move to somewhere centralised
const imageDomain = 'http://localhost:1337';

const recipesQuery = gql`
  query fetchRecipes {
    recipes {
      id
      title
      description
      gallery {
        url
        previewUrl
      }
      ingredients {
        name
      }
    }
  }
`;

function RecipeList() {
  const { loading, error, data } = useQuery(recipesQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <Box mb="16">
        <Searchbar />
      </Box>
      <Grid templateColumns="repeat(3, 1fr)" gap={10}>
        {data.recipes.map(recipe => {
            return (
              <Link to={`/recipe/${recipe.id}`} key={recipe.id}>
                <Box key={recipe.id} w="100%" h="100%" position="relative" overflow="hidden">
                  <Heading
                    mb="0"
                    size="md"
                    position="absolute"
                    color="white"
                    p="4"
                    bottom="0"
                    left="0"
                    w="100%"
                    textAlign="left"
                    zIndex="1">{recipe.title}</Heading>
                  <Image 
                    src={`${imageDomain}${recipe.gallery[0].url}`}
                    alt={recipe.title}
                    userSelect="none"
                    objectFit="cover" />
                </Box>
              </Link>
            );
          })}
      </Grid>
    </>
  )
}

export default RecipeList;
