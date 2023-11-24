import type { Meta, StoryObj } from '@storybook/react';

import NavBar from '.';

const meta: Meta<typeof NavBar> = {
  title: 'UI/atom/NavBar',
  component: NavBar,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof NavBar>;

export const Default: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    backgrounds: {
      values: [
        { name: 'red', value: '#f00' },
        { name: 'green', value: '#0f0' },
        { name: 'blue', value: '#00f' },
      ],
    },
  },
  args: {},
};
