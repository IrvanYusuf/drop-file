import { GuestGuard } from 'src/auth/guard';
import SignInPage from 'src/auth/view/SignIn/SignInPage';
import { AuthSplitLayout } from 'src/layouts/auth-split';

const page = () => {
  return (
    <GuestGuard>
      <AuthSplitLayout section={{ title: 'Hi, Welcome back' }}>
        <SignInPage formOAuthShow={false} />
      </AuthSplitLayout>
    </GuestGuard>
  );
};

export default page;
