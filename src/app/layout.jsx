import 'src/global.css';

// ----------------------------------------------------------------------

import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

import { CONFIG } from 'src/config-global';
import { primary } from 'src/theme/core/palette';
import { schemeConfig } from 'src/theme/scheme-config';
import { ThemeProvider } from 'src/theme/theme-provider';

import { ProgressBar } from 'src/components/progress-bar';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import { SettingsDrawer, defaultSettings, SettingsProvider } from 'src/components/settings';

import { AuthProvider } from 'src/auth/context/jwt';
import ReactQueryProvider from 'src/context/react-query-provider/ReactQueryProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Snackbar } from 'src/components/snackbar';
import { I18nProvider } from 'src/utils/i18n-provider';
import { LocalizationProvider } from 'src/utils/localization-provider';

// ----------------------------------------------------------------------

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: primary.main,
};

export const metadata = {
  icons: [
    {
      rel: 'icon',
      url: `${CONFIG.assetsDir}/favicon.ico`,
    },
  ],
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ReactQueryProvider>
        <SettingsProvider settings={defaultSettings}>
          <body>
            <InitColorSchemeScript
              defaultMode={schemeConfig.defaultMode}
              modeStorageKey={schemeConfig.modeStorageKey}
            />

            <AuthProvider>
              <ThemeProvider>
                <MotionLazy>
                  <Snackbar />
                  <ProgressBar />
                  <SettingsDrawer />
                  {children}
                </MotionLazy>
              </ThemeProvider>
            </AuthProvider>
            <ReactQueryDevtools />
          </body>
        </SettingsProvider>
      </ReactQueryProvider>
    </html>
  );
}
