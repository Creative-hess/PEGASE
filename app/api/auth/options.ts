import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import DiscordProvider from 'next-auth/providers/discord'
import { Pool } from 'pg'

// Configure MySQL connection from separate env vars
const databaseHost = process.env.DATABASE_HOST || 'localhost'
const databasePort = process.env.DATABASE_PORT || '3306'
const databaseName = process.env.DATABASE_NAME || 'pegase_ia'
const databaseUser = process.env.DATABASE_USER || 'votre_utilisateur'
const databasePassword = process.env.DATABASE_PASSWORD || 'votre_mot_de_passe'

// Build connection string
const connectionString = `mysql://${databaseUser}:${databasePassword}@${databaseHost}:${databasePort}/${databaseName}?serverVersion=10.11.18-MariaDB&connectTimeout=60000`

const pool = new Pool({
  connectionString,
})

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'YOUR_GOOGLE_CLIENT_SECRET',
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID || 'YOUR_DISCORD_CLIENT_ID',
      clientSecret: process.env.DISCORD_CLIENT_SECRET || 'YOUR_DISCORD_CLIENT_SECRET',
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        // Check if user exists, if not create them
        const { rows } = await pool.query(
          'SELECT * FROM users WHERE email = $1',
          [user.email]
        )
        
        if (rows.length === 0) {
          // Create new user
          await pool.query(
            `INSERT INTO users (id, name, email, image) VALUES ($1, $2, $3, $4)`,
            [user.id, user.name, user.email, user.image]
          )
        }
        return true
      } catch (error) {
        console.error('Database error during signIn:', error)
        return false
      }
    },
    async session({ session, token }) {
      // Pass user info to the session
      if (session.user) {
        session.user.id = token.sub as string
      }
      return session
    },
  },
  pages: {
    signIn: '/', // Redirect to home
  },
}
export default authOptions