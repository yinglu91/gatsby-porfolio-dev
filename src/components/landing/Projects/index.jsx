import React, { useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { ThemeContext } from 'providers/ThemeProvider';
import { Container, Card, TitleWrap } from 'components/common';
import { Wrapper, Grid, Item, Content, Stats, Languages } from './styles';

const getData = graphql`
  {
    github {
      viewer {
        repositories(first: 8, orderBy: {field: STARGAZERS, direction: DESC}) {
          nodes {
            id
            name
            url
            description
            languages(first: 3) {
              nodes {
                id
                name
              }
            }
          }
        }
      }
    }
  }
`

export const Projects = () => {
  const { theme } = useContext(ThemeContext);

  const data = useStaticQuery(getData)
  const { nodes } = data.github.viewer.repositories
  
  return (
    <Wrapper as={Container} id="projects">
      <h2>Projects</h2>
      <Grid>
        { nodes.map( repo => (
          <Item key={repo.id} as="a" href={repo.url} target="_blank" rel="noopener noreferrer" theme={theme}>
            <Card theme={theme}>
              <Content>
                <h4>{repo.name}</h4>
                <p>{repo.description}</p>
              </Content>
              <TitleWrap>
                <Stats theme={theme}>
                  <Languages>
                    {
                      repo.languages.nodes.map(({ id, name }) => (
                        <span key={id}>
                          {name}
                        </span>
                      ))
                    }
                  </Languages>
                </Stats>
              </TitleWrap>
            </Card>
          </Item>
        ))}
      </Grid>
    </Wrapper>
  );
};
