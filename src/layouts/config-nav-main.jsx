import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />;

const ICONS = {
  job: icon('ic-job'),
  blog: icon('ic-blog'),
  chat: icon('ic-chat'),
  mail: icon('ic-mail'),
  user: icon('ic-user'),
  file: icon('ic-file'),
  lock: icon('ic-lock'),
  tour: icon('ic-tour'),
  order: icon('ic-order'),
  label: icon('ic-label'),
  blank: icon('ic-blank'),
  kanban: icon('ic-kanban'),
  folder: icon('ic-folder'),
  course: icon('ic-course'),
  banking: icon('ic-banking'),
  booking: icon('ic-booking'),
  invoice: icon('ic-invoice'),
  product: icon('ic-product'),
  calendar: icon('ic-calendar'),
  disabled: icon('ic-disabled'),
  external: icon('ic-external'),
  menuItem: icon('ic-menu-item'),
  ecommerce: icon('ic-ecommerce'),
  analytics: icon('ic-analytics'),
  dashboard: icon('ic-dashboard'),
  parameter: icon('ic-parameter'),
};

// ----------------------------------------------------------------------

export const navData = [
  {
    subheader: 'User Menu',
    items: [
      { title: 'Profile', path: paths.client.profile },
      { title: 'Transactions', path: paths.client.transactions },
      { title: 'Projects', path: paths.client.projects },
    ],
  },
  {
    subheader: 'Management',
    items: [
      {
        title: 'How it Works',
        path: paths.dashboard.group.root,
        // icon: ICONS.user,
        children: [
          { title: 'About us', path: paths.home },
          { title: 'Contact us', path: paths.home },
          { title: 'FAQs', path: paths.home },
        ],
      },
      { title: 'Blog', path: paths.home },
      { title: 'Become a designer', path: paths.home },
      { title: 'Contact Us', path: paths.home },
    ],
  },
];
