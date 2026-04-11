import React from 'react';
import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

function getVersionPath(version: string) {
  return version.split('.').slice(0, 2).join('.');
}

const VersionsPage: React.FC = () => {
  const { siteConfig } = useDocusaurusContext();
  const latestVersion = siteConfig.customFields.latestVersion as string;
  const versions = siteConfig.customFields.versions as string[] | [];

  return (
    <Layout
      title={translate({
        id: 'versions.meta.title',
        message: '版本',
      })}
      description={translate({
        id: 'versions.meta.description',
        message: '查看 ESBoot 文档的所有版本。',
      })}
    >
      <main className="container margin-vert--lg">
        <Heading as="h1">
          <Translate id="versions.heading">ESBoot 文档版本</Translate>
        </Heading>
        <p>
          <Translate id="versions.latest.label">当前稳定版本：</Translate>{' '}
          <Link to={`/docs/${getVersionPath(latestVersion)}/docs/intro`}>
            v{latestVersion}
          </Link>
        </p>
        {versions.length > 0 && (
          <ul>
            {versions.map((version) => (
              <li key={version}>
                <Link to={`/docs/${getVersionPath(version)}/docs/intro`}>
                  v{version}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </Layout>
  );
};

export default VersionsPage;
