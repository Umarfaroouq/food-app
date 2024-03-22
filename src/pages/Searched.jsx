import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';

function Searched() {
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { search } = useParams();

  useEffect(() => {
    const fetchSearchedRecipes = async () => {
      try {
        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=a0d71964b87a431b9f71ef29f2c01d50&query=${search}`);
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
        const data = await response.json();
        setSearchedRecipes(data.results);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchedRecipes();
  }, [search]);

  return (
    <Wrapper>
      {loading ? (
        <LoadingMessage>Loading...</LoadingMessage>
      ) : (
        <Grid>
          {searchedRecipes.map((recipe) => (
            <Card key={recipe.id}>
              <Link to={`/recipe/${recipe.id}`}>
                <img src={recipe.image} alt={recipe.title} />
                <h4>{recipe.title}</h4>
              </Link>
            </Card>
          ))}
        </Grid>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 4rem 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
`;

const Card = styled.div`
  img {
    border-radius: 2rem;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  a {
    text-decoration: none;
    color: inherit; /* Ensure link color matches parent color */
  }

  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

const LoadingMessage = styled.div`
  font-size: 1.5rem;
  color: #313131;
  text-align: center;
`;

export default Searched;
