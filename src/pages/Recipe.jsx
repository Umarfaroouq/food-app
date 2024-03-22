import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

function Recipe() {
  const { name } = useParams();
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`https://api.spoonacular.com/recipes/${name}/information?apiKey=a0d71964b87a431b9f71ef29f2c01d50`);
        if (!response.ok) {
          throw new Error("Failed to fetch recipe details");
        }
        const detailData = await response.json();
        setDetails(detailData);
        console.log("Recipe details:", detailData); // Add this console.log statement
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [name]);

  return (
    <DetailWrapper>
      {loading ? (
        <LoadingSpinner>Loading...</LoadingSpinner>
      ) : (
        <>
          <ImageWrapper>
            <img src={details.image} alt={details.title} />
          </ImageWrapper>
          <Info>
            <ButtonGroup>
              <Button
                className={activeTab === "instructions" ? "active" : ""}
                onClick={() => setActiveTab("instructions")}
              >
                Instructions
              </Button>
              <Button
                className={activeTab === "ingredients" ? "active" : ""}
                onClick={() => setActiveTab("ingredients")}
              >
                Ingredients
              </Button>
            </ButtonGroup>
            <TabContent>
              {activeTab === "instructions" && (
                <div>
                  <h5 dangerouslySetInnerHTML={{ __html: details.summary }} />
                  <h5 dangerouslySetInnerHTML={{ __html: details.instructions }} />
                </div>
              )}
              {activeTab === "ingredients" && (
                <ul>
                  {details.extendedIngredients.map((ingredient) => (
                    <li key={ingredient.id}>{ingredient.original}</li>
                  ))}
                </ul>
              )}
            </TabContent>
          </Info>
        </>
      )}
    </DetailWrapper>
  );
}

const DetailWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;
  justify-content: center;
`;

const ImageWrapper = styled.div`
  flex: 1;
  margin-right: 2rem;
`;

const Info = styled.div`
  flex: 1;
`;

const ButtonGroup = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  font-weight: 600;
  transition: all 0.3s ease;
  margin-right: 1rem;

  &:hover {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }

  &.active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
`;

const TabContent = styled.div`
  text-align: center;

  h3 {
    margin-bottom: 1rem;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;

    li {
      margin-bottom: 0.5rem;
    }
  }
`;

const LoadingSpinner = styled.div`
  font-size: 1.5rem;
  color: #313131;
`;

export default Recipe;
