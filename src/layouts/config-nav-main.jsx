import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export const navData = [
  {
    title: 'How it Works',
    icon: <Iconify width={22} icon="solar:notebook-bold-duotone" />,
    path: paths.docs,
    children: [
      { title: 'About us', path: paths.about },
      { title: 'Contact us', path: paths.contact },
      { title: 'FAQs', path: paths.faqs },
    ],
  },
  { title: 'Blog', path: '/', icon: <Iconify width={22} icon="solar:home-2-bold-duotone" /> },
  {
    title: 'Become a Designer',
    path: paths.components,
    icon: <Iconify width={22} icon="solar:atom-bold-duotone" />,
  },
  { title: 'Contact Us', path: '/', icon: <Iconify width={22} icon="solar:home-2-bold-duotone" /> },
];
