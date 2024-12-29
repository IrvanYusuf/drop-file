export const endpoints = {
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  user: {
    create: '/api/v1/users',
  },
  auth: {
    signInWithGoogle: '/api/v1/auth/sign-in-with-google',
    signUpWithEmailPassword: '/api/v1/auth/sign-up-with-email-password',
    signInWithEmailPassword: '/api/v1/auth/sign-in-with-email-password',
    signUp: '/api/auth/sign-up',
  },
  mail: {
    list: '/api/mail/list',
    details: '/api/mail/details',
    labels: '/api/mail/labels',
  },
  post: {
    list: '/api/post/list',
    details: '/api/post/details',
    latest: '/api/post/latest',
    search: '/api/post/search',
  },
  product: {
    list: '/api/product/list',
    details: '/api/product/details',
    search: '/api/product/search',
  },
};
