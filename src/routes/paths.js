// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  faqs: '/faqs',
  home: '/',
  job: '/jobs',
  postProject: '/post-project',
  // detail: '/detail-job',
  notAuthenticated: '/not-authenticated',
  // about:"/abouts",
  minimalStore: 'https://mui.com/store/items/minimal-dashboard/',
  // Profile Client (Dokter)
  client: {
    profile: '/client/profile',
    transactions: '/client/transactions',
    jobs: '/client/jobs',
  },
  // AUTH
  auth: {
    signIn: `${ROOTS.AUTH}/sign-in`,
    signUp: `${ROOTS.AUTH}/sign-up`,
    resetPassword: `${ROOTS.AUTH}/reset-password`,
    signInAdmin: `${ROOTS.AUTH}/admin/sign-in`,
    signUpAdmin: `${ROOTS.AUTH}/admin/sign-up`,
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    two: `${ROOTS.DASHBOARD}/two`,
    user: {
      root: `${ROOTS.DASHBOARD}/user`,
      new: `${ROOTS.DASHBOARD}/user/new`,
      detail: (id) => `${ROOTS.DASHBOARD}/user/${id}/detail`,
      edit: (id) => `${ROOTS.DASHBOARD}/user/${id}/edit`,
    },
    three: `${ROOTS.DASHBOARD}/three`,
    group: {
      root: `${ROOTS.DASHBOARD}/group`,
      five: `${ROOTS.DASHBOARD}/group/five`,
      six: `${ROOTS.DASHBOARD}/group/six`,
    },
  },
};
