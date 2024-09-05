import NextAuth from 'next-auth';
import Github from 'next-auth/providers/github';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Github],
  callbacks: {
    authorized({ request, auth }) {
      // 编辑页面需要登录权限
      const { pathname } = request.nextUrl;
      if (pathname.startsWith('/note/edit')) return !!auth;
      return true;
    }
  }
});
