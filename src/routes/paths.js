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
  browseProject: {
    root: '/browse-projects',
    detail: (id) => `/browse-projects/${id}/detail`,
  },
  // Profile Client (Dokter)
  client: {
    profile: {
      root: '/profile',
      edit: (id) => `/profile/${id}/edit`,
    },
    transactions: '/transactions',
    projects: {
      root: '/projects',
      detail: (id) => `/projects/${id}/detail`,
    },
    yourWorks: {
      root: '/your-works',
      detail: (id) => `/projects/${id}/detail`,
    },
    projectsAvailable: {
      root: '/projects-available',
      detail: (id) => `/projects/${id}/detail`,
    },
  },
  // AUTH
  auth: {
    signIn: `${ROOTS.AUTH}/sign-in`,
    signUp: `${ROOTS.AUTH}/sign-up`,
    resetPassword: `${ROOTS.AUTH}/reset-password`,
    signInAdmin: `${ROOTS.AUTH}/admin/sign-in`,
    signUpAdmin: `${ROOTS.AUTH}/admin/sign-up`,
    otpVerify: `${ROOTS.AUTH}/otp`,
    verifyEmail: `${ROOTS.AUTH}/verify-email`,
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
    bahan: {
      root: `${ROOTS.DASHBOARD}/bahan`,
      new: `${ROOTS.DASHBOARD}/bahan/new`,
      detail: (id) => `${ROOTS.DASHBOARD}/bahan/${id}/detail`,
      edit: (id) => `${ROOTS.DASHBOARD}/bahan/${id}/edit`,
    },
    product: {
      root: `${ROOTS.DASHBOARD}/product`,
      new: `${ROOTS.DASHBOARD}/product/new`,
      detail: (id) => `${ROOTS.DASHBOARD}/product/${id}/detail`,
      edit: (id) => `${ROOTS.DASHBOARD}/product/${id}/edit`,
    },
    rekening: {
      root: `${ROOTS.DASHBOARD}/rekening`,
      new: `${ROOTS.DASHBOARD}/rekening/new`,
      detail: (id) => `${ROOTS.DASHBOARD}/rekening/${id}/detail`,
      edit: (id) => `${ROOTS.DASHBOARD}/rekening/${id}/edit`,
    },
    projek: {
      root: `${ROOTS.DASHBOARD}/project`,
      new: `${ROOTS.DASHBOARD}/project/new`,
      detail: (id) => `${ROOTS.DASHBOARD}/project/${id}/detail`,
      edit: (id) => `${ROOTS.DASHBOARD}/project/${id}/edit`,
    },
    three: `${ROOTS.DASHBOARD}/three`,
  },
};
