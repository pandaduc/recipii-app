import React, { useState, useRef } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useParams } from "react-router-dom";
import { Box, Heading, Input, Textarea, Image, Text, Flex, Stack, Divider, Button, IconButton, Select } from "@chakra-ui/core";
import { Cooking, Recipe, Servings, Cutting } from '../../assets/icons';
import { MdAdd } from 'react-icons/md';
import { FiStar, FiTrash2 } from 'react-icons/fi';
import { FETCH_RECIPE } from '../../graphql/recipes';

const UPDATE_RECIPE = gql`
  mutation UpdateRecipe (
    $id: ID!,
    $title: String,
    $description: String,
    $preparationTime: String,
    $cookingTime: String,
    $servings: String,
    $level: ENUM_RECIPE_LEVEL,
    $ingredients: [editComponentContentsIngredientInput],
    $contents: [editComponentContentsRichTextInput]
  ) {
    updateRecipe(input: {
      where: {
        id: $id
      },
      data: {
        title: $title
        description: $description,
        ingredients: $ingredients,
        contents: $contents,
        preparation_time: $preparationTime,
        cooking_time: $cookingTime,
        servings: $servings,
        level: $level
      }
    }) {
      recipe {
        title,
        description,
        ingredients {
          name
        }
      }
    }
  }
`;

const formattedIngredients = (ingredients) => {
  return ingredients.map((item) => item.name).join('\n');
};

const formatContents = (contents) => {
  return contents.map((item) => ({ id: item?.id, content: item.content }));
}

function RecipeEdit({ data, onCancel }) {
  console.log('data', data);
  const { id, title, description, contents, gallery, ingredients, cooking_time, preparation_time, level, servings } = data.recipe;

  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentDescription, setCurrentDescription] = useState(description);
  const [currentPreparationTime, setCurrentPreparationTime] = useState(preparation_time);
  const [currentCookingTime, setCurrentCookingTime] = useState(cooking_time);
  const [currentServings, setCurrentServings] = useState(servings);
  const [currentLevel, setCurrentLevel] = useState(level);
  const [currentIngredients, setCurrentIngredients] = useState(formattedIngredients(ingredients));
  const [currentContents, setCurrentContents] = useState(formatContents(contents));

  const [updateRecipe, { loading: mutateLoading,data: mutatedData }] = useMutation(UPDATE_RECIPE, { refetchQueries: [{ query: FETCH_RECIPE, variables: { id } }] });


  const addNewContent = () => {
    setCurrentContents([...currentContents, { content: '' }])
  };

  const changeContent = (index, value) => {
    const newContents = currentContents.map((item, itemIndex) => {
      if (itemIndex === index) {
        return { ...item, content: value }
      }

      return item;
    });
    
    setCurrentContents(newContents);
  };

  const removeContent = (index) => {
    const newContents = currentContents.filter((item, itemIndex) => (itemIndex !== index));
    
    setCurrentContents(newContents);
  };

  const onSave = () => {
    updateRecipe({
      variables: { 
        id, 
        title: currentTitle,
        description: currentDescription,
        preparationTime: currentPreparationTime,
        cookingTime: currentCookingTime,
        servings: currentServings,
        level: currentLevel,
        ingredients: currentIngredients.trim().split('\n').map((item, index) => ({ name: item, id: ingredients[index]?.id })),
        contents: currentContents
      } 
    });
  };

  return (
    <>
      <Flex pb="8">
        <Box pr="12">
          <Stack isInline>
            <Button type="button" onClick={onCancel}>Cancel</Button>
            <Button type="button" variantColor="green" variant="solid" onClick={onSave} isLoading={mutateLoading}>Save</Button>
          </Stack>
          <Box mt="2" mb="10">
            <Input value={currentTitle} fontSize='2.25rem' fontWeight="bold" onChange={(e) => setCurrentTitle(e.target.value)}  />
          </Box>
          <Box>
            <Textarea value={currentDescription} size="md" minHeight="120px" onChange={(e) => setCurrentDescription(e.target.value)} />
          </Box>

          <Stack isInline spacing={8} align="center" mt="8" mb="8">
            <Flex flexDirection="column">
              <Box textAlign="center"><Recipe size="32px" /></Box>
              <Text as="strong">Preparation time</Text>
              <Input value={currentPreparationTime} onChange={(e) => setCurrentPreparationTime(e.target.value)}  />
            </Flex>
            <Flex flexDirection="column">
              <Box textAlign="center"><Cooking size="32px" /></Box>
              <Text as="strong">Cooking time</Text>
              <Input value={currentCookingTime} onChange={(e) => setCurrentCookingTime(e.target.value)}  />
            </Flex>
            <Flex flexDirection="column">
              <Box textAlign="center"><Servings size="32px" /></Box>
              <Text as="strong">Servings</Text>
              <Input value={currentServings} onChange={(e) => setCurrentServings(e.target.value)}  />
            </Flex>
            <Flex flexDirection="column">
              <Box textAlign="center"><Box as={FiStar} size="32px" /></Box>
              <Text as="strong">Difficulty</Text>
              <Select value={currentLevel} placeholder="Select option" onChange={(e) => setCurrentLevel(e.target.value)}>
                <option value="basic">Basic</option>
                <option value="intermediate">Intermediate</option>
                <option value="hard">Hard</option>
              </Select>
            </Flex>
          </Stack>
          <Divider borderColor="black" />

          <Box mt="6" mb="6">
            <Heading as="h2" size="lg" mb="2">Ingredients</Heading>
            <Textarea value={currentIngredients} size="md" minHeight="120px" onChange={(e) => setCurrentIngredients(e.target.value)} />
          </Box>

          <Divider borderColor="black" />

          <Box mt="6">
            <Heading as="h2" size="lg" mb="4">Instructions</Heading>
            {
              currentContents.map(({ title, content }, index) => {
                return (
                  <>
                    <Flex justify="space-between" align="center">
                      <Heading as="h3" size="md" mb="2">Step {index + 1}</Heading>
                      <IconButton variant="ghost" aria-label="Send email" icon={FiTrash2} onClick={() => removeContent(index)} />
                    </Flex>
                    <Box mb="4">
                      <Textarea key={index} value={content} onChange={(e) => changeContent(index, e.target.value)} />
                    </Box>
                  </>
                )
              })
            }
          </Box>
          
          <Button leftIcon={MdAdd} onClick={addNewContent}>Add new step</Button>
        </Box>
      </Flex>
    </>
  )
}

export default RecipeEdit;
