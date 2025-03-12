import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { SvgColor } from 'src/components/svg-color';
import { Iconify } from 'src/components/iconify';

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

export const navDataMobile = [
  {
    subheader: 'User Menu',
    items: [
      { title: 'Profile', path: paths.client.profile.root },
      { title: 'Transactions', path: paths.client.transactions },
      { title: 'Projects', path: paths.client.projects.root },
    ],
  },
  {
    subheader: 'Management',
    items: [
      {
        title: 'How it Works',
        path: paths.home,
        // icon: ICONS.user,
        children: [
          { title: 'About us', path: paths.home },
          { title: 'Contact us', path: paths.home },
          { title: 'FAQs', path: paths.home },
        ],
      },
      { title: 'Blog', path: paths.home },
      { title: 'Browse Projects', path: paths.client.projectsAvailable.root },
      { title: 'Become a designer', path: paths.home },
      { title: 'Contact Us', path: paths.home },
    ],
  },
];

export const navDataDekstop = [
  /**
   * Overview
   */
  {
    subheader: null,
    items: [
      {
        title: 'Home',
        path: paths.home,
      },
      {
        title: 'How it Works',
        path: paths.dashboard.root,
        children: [
          { title: 'For Client', path: paths.dashboard.root },
          { title: 'For Worker', path: paths.dashboard.root },
        ],
      },
      {
        title: 'Blog',
        path: paths.client.projects.root,
      },
      {
        title: 'Browse Projects',
        path: paths.browseProject.root,
      },
      {
        title: 'Become a Designer',
        path: paths.client.yourWorks.root,
      },
      {
        title: 'Contact Us',
        path: paths.client.transactions,
      },
    ],
  },
];
