CREATE DATABASE trivia_db WITH OWNER = postgres ENCODING = 'UTF8' CONNECTION LIMIT = -1;

/* Connect to trivia_db */

REVOKE ALL ON DATABASE trivia_db FROM public;
CREATE ROLE trivia_admin LOGIN PASSWORD 'secure_password';
GRANT CONNECT ON DATABASE trivia_db TO trivia_admin;
SET search_path = trivia;
CREATE SCHEMA trivia AUTHORIZATION trivia_admin;
ALTER ROLE trivia_admin IN DATABASE trivia_db SET search_path = trivia;
GRANT USAGE, CREATE ON SCHEMA trivia TO trivia_admin;
