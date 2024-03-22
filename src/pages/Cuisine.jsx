import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";

function Cuisine() {
  const [cuisine, setCuisine] = useState([]);
  const params = useParams();

  const getCuisine = async (name) => {
    const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=a0d71964b87a431b9f71ef29f2c01d50&cuisine=${name}`);
    const data = await response.json();
    setCuisine(data.results || []); // If data.results is undefined, set an empty array
  };

  useEffect(() => {
    getCuisine(params.type);
  }, [params.type]);

  return (
    <Grid>
      {cuisine && cuisine.map((item) => (
        <MotionCard key={item.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to={`/recipe/${item.id}`}>
            <img src={item.image} alt={item.title} />
            <h4>{item.title}</h4>
          </Link>
        </MotionCard>
      ))}
    </Grid>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
`;

const MotionCard = styled(motion.div)`
  img {
    border-radius: 2rem;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  a {
    text-decoration: none;
  }

  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

export default Cuisine;
