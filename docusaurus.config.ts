import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { themes } from 'prism-react-renderer';

const lightTheme = themes.github;
const darkTheme = themes.dracula;

const config: Config = {
  title: 'ESBoot',
  tagline: '工程化构建工具',
  favicon: 'img/favicon.ico',

  url: 'https://esboot.js.org',
  baseUrl: '/',

  organizationName: 'moonlitusun',
  projectName: 'esboot',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  customFields: {
    latestVersion: '3.0.0',
    versions: ['2.0.0'],
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  themes: [
    // ... Your other themes.
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        // ... Your options.
        // `hashed` is recommended as long-term-cache of index file is possible.
        hashed: true,

        // For Docs using Chinese, it is recomended to set:
        language: ['en', 'zh'],

        // If you're using `noIndex: true`, set `forceIgnoreNoIndex` to enable local index:
        // forceIgnoreNoIndex: true,
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.ts'),
          sidebarCollapsible: true,
          lastVersion: 'current',
          versions: {
            current: {
              label: '3.0 (Current)',
              path: '3.0',
            },
          },
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'ESBoot',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          type: 'docSidebar',
          position: 'left',
          sidebarId: 'apiSidebar',
          label: 'API',
        },
        { to: '/blog', label: 'Blog', position: 'left' },
        {
          type: 'docsVersionDropdown',
          position: 'right',
          dropdownItemsAfter: [{ to: '/versions', label: 'All versions' }],
          dropdownActiveClassDisabled: true,
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} ESBoot, DZ Frentend Team.`,
    },
    prism: {
      theme: lightTheme,
      darkTheme: darkTheme,
      additionalLanguages: ['bash', 'diff', 'json'],
    },
  } satisfies Preset.ThemeConfig,

  plugins: [
    // '@aldridged/docusaurus-plugin-lunr',
  ],
};

export default config;
