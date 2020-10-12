import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from "react-router-dom";
import { Box, Heading, Image, Text, Flex, Stack, Divider, Button } from "@chakra-ui/core";
import { Cooking, Recipe, Servings, Cutting } from '../../assets/icons';
import { FiStar } from 'react-icons/fi';

import { RecipeEdit } from '../RecipeEdit';
import { FETCH_RECIPE } from '../../graphql/recipes';

// TODO: move somewhere
const imageDomain = 'http://localhost:1337';

function RecipeDetails() {
  const [isEdit, setIsEdit] = useState(true);

  let { id } = useParams();
  const { loading, error, data } = useQuery(FETCH_RECIPE, {
    variables: { id }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  if (isEdit) return <RecipeEdit data={data} onCancel={() => setIsEdit(false)} />

  const { title, description, contents, gallery, ingredients, cooking_time, preparation_time, level, servings } = data.recipe;
  return (
    <>
      <Flex pb="8">
        <Box pr="12">
          <Button type="button" onClick={() => setIsEdit(true)}>Edit</Button>

          <Heading mb="10">{title}</Heading>
          <Text mb="6">{description}</Text>
          <Divider borderColor="black" />
          <Stack isInline spacing={8} align="center" mt="8" mb="8">
            <Flex flexDirection="column">
              <Box textAlign="center"><Recipe size="32px" /></Box>
              <Text as="strong">Preparation time</Text>
              <Text>{preparation_time}</Text>
            </Flex>
            <Flex flexDirection="column">
              <Box textAlign="center"><Cooking size="32px" /></Box>
              <Text as="strong">Cooking time</Text>
              <Text>{cooking_time}</Text>
            </Flex>
            <Flex flexDirection="column">
              <Box textAlign="center"><Servings size="32px" /></Box>
              <Text as="strong">Servings</Text>
              <Text>{servings}</Text>
            </Flex>
            <Flex flexDirection="column">
              <Box textAlign="center"><Box as={FiStar} size="32px" /></Box>
              <Text as="strong">Difficulty</Text>
              <Text>{level}</Text>
            </Flex>
          </Stack>
          <Divider borderColor="black" />
          <Box mt="6" mb="6">
            <Heading as="h2" size="lg">Ingredients</Heading>
            {
              ingredients.map(({ name }, index) => {
              return <Text key={index}>{name}</Text>
              })
            }
          </Box>
          <Divider borderColor="black" />
          <Box mt="6">
            <Heading as="h2" size="lg" mb="4">Instructions</Heading>
            {
              contents.map(({ title, content }, index) => {
                return (
                  <>
                    <Heading as="h3" size="md">Step {index + 1}</Heading>
                    <Text key={index} mb="4">
                      {content}
                    </Text>
                  </>
                )
              })
            }
          </Box>
        </Box>
        <Box>
          <Image 
            src={`${imageDomain}${gallery[0].url}`}
            alt={title}
            userSelect="none"
            objectFit="cover" />
        </Box>
      </Flex>
    </>
  )
}

export default RecipeDetails;