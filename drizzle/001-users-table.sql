-- Create users table for Pegase IA authentication
-- Execute this in PHPMyAdmin or PostgreSQL

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    image TEXT,
    provider VARCHAR(50) DEFAULT 'local',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create sessions table for next-auth
CREATE TABLE IF NOT EXISTS sessions (
    session_token VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    expires TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create verificationtokens table for next-auth
CREATE TABLE IF NOT EXISTS verificationtokens (
    identifier VARCHAR(255) NOT NULL,
    token VARCHAR(255) NOT NULL,
    expires TIMESTAMP NOT NULL,
    PRIMARY KEY (identifier, token)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);