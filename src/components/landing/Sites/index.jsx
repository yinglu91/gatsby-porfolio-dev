import React, { useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { ThemeContext } from 'providers/ThemeProvider';
import { Container, Card, TitleWrap } from 'components/common';
import { Wrapper, Grid, Item, Content, Stats, HvrFloatShadow } from './styles';
import styles from './sponsor.module.css'

import Img from 'gatsby-image'

const getData = graphql`
  query SitesQuery {
    websites: allSitesYaml {
      nodes {
        id
        url
        title
        childScreenshot {
          screenshotFile {
            childImageSharp {
              fixed(width: 384, height: 288) {
                ...GatsbyImageSharpFixed_tracedSVG
              }
            }
          }
        }
      }
    }
  }
`
export const Sites = () => {
  console.log(HvrFloatShadow)
  const { theme } = useContext(ThemeContext);

  const { websites } = useStaticQuery(getData)

  return (
    <Wrapper as={Container} id="sites">
      <h2>Sites</h2>
<Grid>
        {websites.nodes.map(({id, title, url, childScreenshot}) => (
          <Item key={id} as="a" href={url} target="_blank" rel="noopener noreferrer" theme={theme}>
            <Card theme={theme}>
              <Content className={styles.hvrFloatShadow}>
                <Img
                  fixed={
                    childScreenshot.screenshotFile.childImageSharp.fixed
                  }
                  alt={title}
                  className={styles.img}
                />
              </Content>
              <TitleWrap>
                <Stats theme={theme}>
                  <span>{title}</span>
                </Stats>
              </TitleWrap>
            </Card>
          </Item>
        ))}
      </Grid>
    </Wrapper>
  );
};
