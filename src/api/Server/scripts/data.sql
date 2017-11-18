--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.1
-- Dumped by pg_dump version 9.6.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET search_path = trivia, pg_catalog;

--
-- Data for Name: categories; Type: TABLE DATA; Schema: trivia; Owner: trivia_admin
--

COPY categories (id, title, icon) FROM stdin;
geography	Geography	Globe
music	Music	MusicNote
sports	Sports	Sport
history	History	Bank
art	Art	Palette
movies	Movies	Movie
science	Science	Science
tech	Tech	Technology
pop	Pop	Star
\.


--
-- PostgreSQL database dump complete
--

