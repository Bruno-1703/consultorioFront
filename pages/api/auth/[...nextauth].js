import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { saltAndHashPassword } from "./utils/saltAndHashPassword"
import { signInSchema } from "./lib/zod"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import client from "./lib/db"
import connectToDatabase from "./lib/mongodb"
import bcrypt from 'bcryptjs' // Necesario para comparar contraseñas hasheadas

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(client),

  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { email, password } = await signInSchema.parseAsync(credentials)
        
        const db = await connectToDatabase();
        const user = await db.collection('Usuario').findOne({ email });

        if (user) {
          // Verifica si las contraseñas coinciden comparando el hash
          const isPasswordValid = bcrypt.compareSync(password, user.password);
          if (isPasswordValid) {
            // Retorna el usuario si la contraseña es válida
            return { id: user._id, name: user.email };
          }
        }
        
        // Si el usuario no existe o la contraseña es incorrecta
        return null;
      },
    }),
  ],
})
