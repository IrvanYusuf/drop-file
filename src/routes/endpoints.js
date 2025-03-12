export const endpoints = {
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  user: {
    root: '/api/v1/users',
  },
  auth: {
    signInWithGoogle: '/api/v1/auth/sign-in-with-google',
    signUpWithEmailPassword: '/api/v1/auth/sign-up-with-email-password',
    signInWithEmailPassword: '/api/v1/auth/sign-in-with-email-password',
    signUp: '/api/v1/auth/sign-up',
    updateEmailVerify: `/api/v1/auth/update-email-verify`,
    sendEmailOtp: `/api/v1/auth/send-email-otp`,
    updatePassword: `/api/v1/auth/update-password`,
    requestVerifyEmail: `/api/v1/auth/request-verify-email`,
  },
  bahan: {
    root: '/api/v1/bahan',
    v2: '/api/v1/bahan/v2',
  },
  rekening: {
    root: '/api/v1/rekening',
  },
  project: {
    root: '/api/v1/projects',
  },
  role: {
    root: '/api/v1/roles',
  },
  product: {
    root: '/api/v1/products',
  },
};
