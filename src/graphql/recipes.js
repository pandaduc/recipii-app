import { gql } from '@apollo/client';

export const FETCH_RECIPE = gql`
  query fetchRecipe ($id: ID!) {
    recipe(id: $id) {
      id,
      title
      description
      cooking_time
      preparation_time
      level
      servings
      gallery {
        url
      }
      contents {
        id
        content
      }
      ingredients {
        id
        name
      }
    }
  }
`;