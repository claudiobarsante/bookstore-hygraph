import type { NextApiRequest, NextApiResponse } from 'next';
// -- NexthAuth
import NextAuth, { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
// -- Graphql --
import { USER_QUERY } from 'graphql/queries/user';
import { UserQuery, UserQueryVariables } from 'graphql/generated/graphql';
// -- Utils --
import { comparePassword } from 'utils/password';
import { initializeApollo } from 'graphql/client/apolloClient';

type CustomUser = User & {
  username: string;
};

const apolloClient = initializeApollo();

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/sign-in'
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  providers: [
    CredentialsProvider({
      name: 'Sign-in',

      credentials: {
        email: {},
        password: {}
      },

      async authorize(credentials) {
        // -- get user by e-mail --
        const {
          data: { apiUser }
        } = await apolloClient.query<UserQuery, UserQueryVariables>({
          query: USER_QUERY,
          variables: {
            email: credentials?.email
          },
          fetchPolicy: 'no-cache'
        });

        // -- Return null if user data could not be retrieved --
        if (!apiUser) return null;

        // -- check password --
        // -- compare informed password with hashed password from DB--
        const isValid = await comparePassword(
          credentials?.password!,
          apiUser.password!
        );

        if (!isValid) return null;

        // Any object returned will be saved in `user` property of the JWT
        const user: CustomUser = {
          id: apiUser.id,
          username: apiUser.username!,
          email: apiUser.email
        };

        return user;
      }
    })
  ],
  session: {
    // Note: `strategy` should be set to 'jwt' if no database is used.
    strategy: 'jwt',
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60 // 24 hours
  },
  jwt: {
    // The secret should be set to a reasonably long random string.
    // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
    // a separate secret is defined explicitly for encrypting the JWT.
    secret: process.env.SECRET
  },
  callbacks: {
    //
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      // See session.user object for details to add custom properties
      return {
        ...session,
        user: {
          id: token.id as string, //custom
          name: token.name as string,
          email: token.email as string
        }
      };
    },
    async jwt({ token, user }) {
      if (user) {
        //add any info to the token, so you can retrieve in the session calbakc and pass to the session
        const customUser: CustomUser = user as CustomUser;

        return {
          ...token,
          id: customUser.id,
          email: customUser.email,
          name: customUser.username as string
        };
      }

      return token;
    }
  }
};

const Auth = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, authOptions);

export default Auth;
