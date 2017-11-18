--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.1
-- Dumped by pg_dump version 9.6.1

-- Started on 2017-11-18 17:20:41 IST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 6 (class 2615 OID 44462)
-- Name: trivia; Type: SCHEMA; Schema: -; Owner: trivia_admin
--

CREATE SCHEMA trivia;


ALTER SCHEMA trivia OWNER TO trivia_admin;

SET search_path = trivia, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 186 (class 1259 OID 44463)
-- Name: categories; Type: TABLE; Schema: trivia; Owner: trivia_admin
--

CREATE TABLE categories (
    id character varying NOT NULL,
    title character varying NOT NULL,
    icon character varying
);


ALTER TABLE categories OWNER TO trivia_admin;

--
-- TOC entry 189 (class 1259 OID 44489)
-- Name: questions; Type: TABLE; Schema: trivia; Owner: trivia_admin
--

CREATE TABLE questions (
    id character varying NOT NULL,
    question character varying NOT NULL,
    options jsonb NOT NULL,
    answer character varying NOT NULL,
    category character varying
);


ALTER TABLE questions OWNER TO trivia_admin;

--
-- TOC entry 187 (class 1259 OID 44471)
-- Name: session; Type: TABLE; Schema: trivia; Owner: trivia_admin
--

CREATE TABLE session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);


ALTER TABLE session OWNER TO trivia_admin;

--
-- TOC entry 188 (class 1259 OID 44479)
-- Name: users; Type: TABLE; Schema: trivia; Owner: trivia_admin
--

CREATE TABLE users (
    id character varying NOT NULL,
    password character varying,
    role character varying NOT NULL,
    email character varying,
    name character varying NOT NULL
);


ALTER TABLE users OWNER TO trivia_admin;

--
-- TOC entry 2283 (class 2606 OID 44470)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: trivia; Owner: trivia_admin
--

ALTER TABLE ONLY categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- TOC entry 2291 (class 2606 OID 44496)
-- Name: questions questions_pkey; Type: CONSTRAINT; Schema: trivia; Owner: trivia_admin
--

ALTER TABLE ONLY questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (id);


--
-- TOC entry 2285 (class 2606 OID 44478)
-- Name: session session_pkey; Type: CONSTRAINT; Schema: trivia; Owner: trivia_admin
--

ALTER TABLE ONLY session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


--
-- TOC entry 2287 (class 2606 OID 44488)
-- Name: users unique-emails; Type: CONSTRAINT; Schema: trivia; Owner: trivia_admin
--

ALTER TABLE ONLY users
    ADD CONSTRAINT "unique-emails" UNIQUE (email);


--
-- TOC entry 2289 (class 2606 OID 44486)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: trivia; Owner: trivia_admin
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2292 (class 2606 OID 44497)
-- Name: questions category; Type: FK CONSTRAINT; Schema: trivia; Owner: trivia_admin
--

ALTER TABLE ONLY questions
    ADD CONSTRAINT category FOREIGN KEY (category) REFERENCES categories(id) ON UPDATE CASCADE ON DELETE SET NULL;


-- Completed on 2017-11-18 17:20:41 IST

--
-- PostgreSQL database dump complete
--

