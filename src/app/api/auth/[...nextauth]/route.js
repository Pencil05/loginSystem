import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs'
import User from "../../../../../models/user";
import { connectMongoDB } from "../../../../../lib/mongodb";
// import { pages } from "next/dist/build/templates/app-page";

const authOptions = {
    providers: [
        CredentialsProvider({
          name: 'credentials',
          credentials: {},
          async authorize(credentials, req) {
            const {email , password} = credentials;
            try {
              await connectMongoDB();
              const user = await User.findOne({email});
              if(!user){
                return null;
              }
              const passwordMatch = await bcrypt.compare(password, user.password);
              if(!passwordMatch){
                return null;
              }
              return user;
            } catch (error) {
              console.log(error)
            }
          }
        })
      ],
      session:{
        strategy:'jwt'
      },
      secret: process.env.NEXTAUTH_SECRET,
      pages:{
        singIn: "/login"
      }
      
}
const handler = NextAuth(authOptions);
export {handler as GET , handler as POST };