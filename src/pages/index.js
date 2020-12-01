import React from 'react';
import { Layout, SEO } from 'components/common';
import { Intro, Skills, Contact, Projects, Sites } from 'components/landing';

export default () => (
  <Layout>
    <SEO />
    <Intro />
    <Sites />
    <Projects />
    <Skills />
    <Contact />
  </Layout>
);
