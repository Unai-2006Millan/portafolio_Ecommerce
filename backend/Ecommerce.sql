--
-- PostgreSQL database dump
--

\restrict SGtM6NhN6Z5BtXPEcrzfSC7F77d2aRRnTBstdd1R50uiT5RRkThzuevtKy9mfa9

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

-- Started on 2026-02-24 12:04:01

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5065 (class 1262 OID 17286)
-- Name: E-commerce; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "E-commerce" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Spain.1252';


ALTER DATABASE "E-commerce" OWNER TO postgres;

\unrestrict SGtM6NhN6Z5BtXPEcrzfSC7F77d2aRRnTBstdd1R50uiT5RRkThzuevtKy9mfa9
\encoding SQL_ASCII
\connect -reuse-previous=on "dbname='E-commerce'"
\restrict SGtM6NhN6Z5BtXPEcrzfSC7F77d2aRRnTBstdd1R50uiT5RRkThzuevtKy9mfa9

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 222 (class 1259 OID 17319)
-- Name: carrito_productos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.carrito_productos (
    id_carrito integer NOT NULL,
    id_producto integer NOT NULL,
    cantidad integer NOT NULL,
    precio_total_producto money NOT NULL
);


ALTER TABLE public.carrito_productos OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 17305)
-- Name: carrito_usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.carrito_usuario (
    id_carrito integer NOT NULL,
    id_usuario integer,
    precio_total money DEFAULT 0 NOT NULL
);


ALTER TABLE public.carrito_usuario OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 17376)
-- Name: carrito_usuario_id_carrito_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.carrito_usuario ALTER COLUMN id_carrito ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.carrito_usuario_id_carrito_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 223 (class 1259 OID 17328)
-- Name: pedidos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pedidos (
    id_pedido integer NOT NULL,
    id_usuario integer,
    precio_total numeric NOT NULL
);


ALTER TABLE public.pedidos OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 17377)
-- Name: pedidos_id_pedido_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.pedidos ALTER COLUMN id_pedido ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.pedidos_id_pedido_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 224 (class 1259 OID 17345)
-- Name: pedidos_productos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pedidos_productos (
    id_pedido integer NOT NULL,
    id_producto integer NOT NULL,
    cantidad integer NOT NULL,
    precio_total_producto money NOT NULL
);


ALTER TABLE public.pedidos_productos OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 17297)
-- Name: productos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.productos (
    id integer NOT NULL,
    nombre character varying,
    descripcion character varying,
    precio money,
    stock integer NOT NULL,
    CONSTRAINT productos_stock_check CHECK ((stock >= 0))
);


ALTER TABLE public.productos OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 17375)
-- Name: productos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.productos ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.productos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 219 (class 1259 OID 17287)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nombre_completo character varying,
    email character varying,
    contrasenia character varying
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 17374)
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.usuarios ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.usuarios_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 5053 (class 0 OID 17319)
-- Dependencies: 222
-- Data for Name: carrito_productos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.carrito_productos (id_carrito, id_producto, cantidad, precio_total_producto) FROM stdin;
8	9	4	800,00 €
8	11	1	1.200,00 €
9	11	1	1.200,00 €
\.


--
-- TOC entry 5052 (class 0 OID 17305)
-- Dependencies: 221
-- Data for Name: carrito_usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.carrito_usuario (id_carrito, id_usuario, precio_total) FROM stdin;
8	4	2.000,00 €
9	5	1.200,00 €
\.


--
-- TOC entry 5054 (class 0 OID 17328)
-- Dependencies: 223
-- Data for Name: pedidos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pedidos (id_pedido, id_usuario, precio_total) FROM stdin;
7	4	2000.00
8	5	1200.00
\.


--
-- TOC entry 5055 (class 0 OID 17345)
-- Dependencies: 224
-- Data for Name: pedidos_productos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pedidos_productos (id_pedido, id_producto, cantidad, precio_total_producto) FROM stdin;
7	9	4	800,00 €
7	11	1	1.200,00 €
8	11	1	1.200,00 €
\.


--
-- TOC entry 5051 (class 0 OID 17297)
-- Dependencies: 220
-- Data for Name: productos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.productos (id, nombre, descripcion, precio, stock) FROM stdin;
11	portátil	para programar	1.200,00 €	8
9	mesa	mesa para comer	200,00 €	85
\.


--
-- TOC entry 5050 (class 0 OID 17287)
-- Dependencies: 219
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id, nombre_completo, email, contrasenia) FROM stdin;
4	unai rafales millan	unai@example.com	$2b$10$mu/8zOfSt5z9uZvuMeQ5i.JH6Uwm/GupvE/SxDcCN7ehRQhQgTcSy
5	illo juan	illo.juan@example.com	$2b$10$k85h.vR7NHU8BC0p9N5l9uggt1c9nVicVAQKVDBU0EnqK/9RsbnNS
\.


--
-- TOC entry 5066 (class 0 OID 0)
-- Dependencies: 227
-- Name: carrito_usuario_id_carrito_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.carrito_usuario_id_carrito_seq', 9, true);


--
-- TOC entry 5067 (class 0 OID 0)
-- Dependencies: 228
-- Name: pedidos_id_pedido_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pedidos_id_pedido_seq', 8, true);


--
-- TOC entry 5068 (class 0 OID 0)
-- Dependencies: 226
-- Name: productos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.productos_id_seq', 11, true);


--
-- TOC entry 5069 (class 0 OID 0)
-- Dependencies: 225
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 5, true);


--
-- TOC entry 4892 (class 2606 OID 17327)
-- Name: carrito_productos carrito_productos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carrito_productos
    ADD CONSTRAINT carrito_productos_pkey PRIMARY KEY (id_carrito, id_producto);


--
-- TOC entry 4888 (class 2606 OID 17313)
-- Name: carrito_usuario carrito_usuario_id_usuario_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carrito_usuario
    ADD CONSTRAINT carrito_usuario_id_usuario_key UNIQUE (id_usuario);


--
-- TOC entry 4890 (class 2606 OID 17311)
-- Name: carrito_usuario carrito_usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carrito_usuario
    ADD CONSTRAINT carrito_usuario_pkey PRIMARY KEY (id_carrito);


--
-- TOC entry 4894 (class 2606 OID 17337)
-- Name: pedidos pedidos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedidos
    ADD CONSTRAINT pedidos_pkey PRIMARY KEY (id_pedido);


--
-- TOC entry 4896 (class 2606 OID 17353)
-- Name: pedidos_productos pedidos_productos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedidos_productos
    ADD CONSTRAINT pedidos_productos_pkey PRIMARY KEY (id_pedido, id_producto);


--
-- TOC entry 4886 (class 2606 OID 17304)
-- Name: productos productos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos
    ADD CONSTRAINT productos_pkey PRIMARY KEY (id);


--
-- TOC entry 4882 (class 2606 OID 17296)
-- Name: usuarios usuarios_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);


--
-- TOC entry 4884 (class 2606 OID 17294)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- TOC entry 4898 (class 2606 OID 17359)
-- Name: carrito_productos carrito_productos_id_carrito_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carrito_productos
    ADD CONSTRAINT carrito_productos_id_carrito_fkey FOREIGN KEY (id_carrito) REFERENCES public.carrito_usuario(id_carrito);


--
-- TOC entry 4899 (class 2606 OID 17354)
-- Name: carrito_productos carrito_productos_id_producto_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carrito_productos
    ADD CONSTRAINT carrito_productos_id_producto_fkey FOREIGN KEY (id_producto) REFERENCES public.productos(id);


--
-- TOC entry 4897 (class 2606 OID 17314)
-- Name: carrito_usuario carrito_usuario_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carrito_usuario
    ADD CONSTRAINT carrito_usuario_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id);


--
-- TOC entry 4900 (class 2606 OID 17340)
-- Name: pedidos pedidos_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedidos
    ADD CONSTRAINT pedidos_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id);


--
-- TOC entry 4901 (class 2606 OID 17364)
-- Name: pedidos_productos pedidos_productos_id_pedido_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedidos_productos
    ADD CONSTRAINT pedidos_productos_id_pedido_fkey FOREIGN KEY (id_pedido) REFERENCES public.pedidos(id_pedido);


--
-- TOC entry 4902 (class 2606 OID 17369)
-- Name: pedidos_productos pedidos_productos_id_producto_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedidos_productos
    ADD CONSTRAINT pedidos_productos_id_producto_fkey FOREIGN KEY (id_producto) REFERENCES public.productos(id);


-- Completed on 2026-02-24 12:04:02

--
-- PostgreSQL database dump complete
--

\unrestrict SGtM6NhN6Z5BtXPEcrzfSC7F77d2aRRnTBstdd1R50uiT5RRkThzuevtKy9mfa9

