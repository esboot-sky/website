import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

const VersionsPage: React.FC = () => {
  const { siteConfig } = useDocusaurusContext();
  const latestVersion = siteConfig.customFields.latestVersion as string;
  const versions = siteConfig.customFields.versions as string[] | [];

  return (
    <Layout title="Versions" description="ESBoot Documentation Versions page">
      <main className="container margin-vert--lg">
        <Heading as="h1">ESBoot Documentation Versions</Heading>
      </main>
    </Layout>
  );
};

export default VersionsPage;
