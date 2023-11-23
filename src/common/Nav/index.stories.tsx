import type { Meta, StoryObj } from '@storybook/react';

import NavBar from '.';

// 내 스토리가 기본적으로 어디에 있는지 알려줌
const meta: Meta<typeof NavBar> = {
  title: 'NavBar',
  component: NavBar,
};

export default meta;

type Story = StoryObj<typeof NavBar>;

export const Navbar: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  // 여기에 필요한 Arg는 구성 요소에 따라 다릅니다
  args: {
    // primary: true,
    // label: 'Button',
  },
  // render: () => <NavBar />,
};
