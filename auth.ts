import NextAuth from 'next-auth';
import Github from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials'
import { getUser, addUser } from '@/lib/prisma'

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: '密码登录',
      credentials: {
        username: { label: '用户名', type: 'text', placeholder: '输入您的账号' },
        password: { label: '密码', type: 'password', placeholder: '输入您的密码' }
      },
      async authorize(credentials) {
        let user = await getUser(credentials.username as string, credentials.password as string)

        // 密码错误
        if (user === 1) return null

        if (user === 0) {
          user = await addUser(credentials.username as string, credentials.password as string)
        }

        if (!user) {
          throw new Error("User was not found and could not be created.")
        }

        return user as any
      }
    }),
    Github
  ],
  callbacks: {
    authorized({ request, auth }) {
      // 编辑页面需要登录权限
      const { pathname } = request.nextUrl;
      if (pathname.startsWith('/note')) return !!auth;
      return true;
    },
    async jwt({ token, user, account }) {
      if (account && account.type === 'credentials' && user) {
        token.userId = user.id
      }
      return token
    },
    async session({ session, token }: any) {
      session.user.id = token.userId;
      return session
    }
  }
});
