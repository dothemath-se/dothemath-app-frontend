module.exports = {
  stories: ['../src/**/*.stories.js', '../src/**/*.stories.tsx'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-actions',
    '@storybook/addon-links',
  ],
  webpackFinal: async (config, { configType }) => {
    // disable webpack warnings about bundle size
    // https://github.com/storybookjs/storybook/pull/6390#issuecomment-588149281
    // https://storybook.js.org/docs/configurations/custom-webpack-config/
    config.performance.hints = false;

    return config;
  },
};
