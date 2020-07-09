--
-- PostgreSQL database dump
--

-- Dumped from database version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
ALTER TABLE ONLY public.carts DROP CONSTRAINT carts_pkey;
ALTER TABLE ONLY public."cartItems" DROP CONSTRAINT "cartItems_pkey";
ALTER TABLE public.products ALTER COLUMN "productId" DROP DEFAULT;
ALTER TABLE public.orders ALTER COLUMN "orderId" DROP DEFAULT;
ALTER TABLE public.carts ALTER COLUMN "cartId" DROP DEFAULT;
ALTER TABLE public."cartItems" ALTER COLUMN "cartItemId" DROP DEFAULT;
DROP SEQUENCE public."products_productId_seq";
DROP TABLE public.products;
DROP SEQUENCE public."orders_orderId_seq";
DROP TABLE public.orders;
DROP SEQUENCE public."carts_cartId_seq";
DROP TABLE public.carts;
DROP SEQUENCE public."cartItems_cartItemId_seq";
DROP TABLE public."cartItems";
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: cartItems; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."cartItems" (
    "cartItemId" integer NOT NULL,
    "cartId" integer NOT NULL,
    "productId" integer NOT NULL,
    price integer NOT NULL
);


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."cartItems_cartItemId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."cartItems_cartItemId_seq" OWNED BY public."cartItems"."cartItemId";


--
-- Name: carts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.carts (
    "cartId" integer NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: carts_cartId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."carts_cartId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: carts_cartId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."carts_cartId_seq" OWNED BY public.carts."cartId";


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    "orderId" integer NOT NULL,
    "cartId" integer NOT NULL,
    name text NOT NULL,
    "creditCard" text NOT NULL,
    "shippingAddress" text NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: orders_orderId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."orders_orderId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders_orderId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."orders_orderId_seq" OWNED BY public.orders."orderId";


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    "productId" integer NOT NULL,
    name text NOT NULL,
    price integer NOT NULL,
    image text NOT NULL,
    "shortDescription" text NOT NULL,
    "longDescription" text NOT NULL
);


--
-- Name: products_productId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."products_productId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_productId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."products_productId_seq" OWNED BY public.products."productId";


--
-- Name: cartItems cartItemId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems" ALTER COLUMN "cartItemId" SET DEFAULT nextval('public."cartItems_cartItemId_seq"'::regclass);


--
-- Name: carts cartId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts ALTER COLUMN "cartId" SET DEFAULT nextval('public."carts_cartId_seq"'::regclass);


--
-- Name: orders orderId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN "orderId" SET DEFAULT nextval('public."orders_orderId_seq"'::regclass);


--
-- Name: products productId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products ALTER COLUMN "productId" SET DEFAULT nextval('public."products_productId_seq"'::regclass);


--
-- Data for Name: cartItems; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."cartItems" ("cartItemId", "cartId", "productId", price) FROM stdin;
\.


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.carts ("cartId", "createdAt") FROM stdin;
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.orders ("orderId", "cartId", name, "creditCard", "shippingAddress", "createdAt") FROM stdin;
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products ("productId", name, price, image, "shortDescription", "longDescription") FROM stdin;
2	John Wick Action Figure	29900	/images/johnwick.jpg	When you have to kill the boogeyman, you buy a John Wick action figure!	John Wick was once named Jardani Jovonovich, born in Padhorje, Byelorussian SSR, Soviet Union, to parents who were of Romani, Russian, Ukrainian and Koryo saram descent. He was orphaned at a young age for unknown reasons before being taken in by his father''s old friend, who would eventually become his mentor.  He was adopted by the Ruska Roma organization from Belarus and raised by their leader, the Director, in their New York headquarters. Under the supervision of the Director Jardani was trained as an assassin; he learned multiple skills including martial arts, firearms, edged weapons, improvised weapons, tactical driving, infiltration, escapology and more. At some point Jardani took the name "John Wick" and left the Ruska Roma. He became a feared and ruthless hitman his targets would call "Baba Yaga". Wick was noted for his great focus and determination; his fighting prowess was such that he once single-handedly killed three men with a pencil. Eventually John met a woman named Helen and fell in love. Hoping to leave his past as a contract killer behind him and pursue a normal life, John met with crime boss Viggo Tarasov, who agreed to grant him his wish if he could carry out a certain task for him. The exact nature of this task is unknown but it has been consistantly described as "impossible" by various characters throughout the series.
5	1965 Shelby Mustang GT350	35000000	/images/mustang.jpg	The 1965–1966 cars were the smallest and lightest of the GT 350 models.	One of the first “pony cars” – fast and sporty (and with lots of horsepower under the hood) – was of course the iconic Ford Mustang. Introduced in mid-1964, it quickly became a best-seller. Only problem, it was considered a bit small, and lacking the full-throated power that buyers wanted. Ford’s Lee Iacocca felt that he could increase sales with more powerful engines and better handling, and in searching for a solution, he approached Carroll Shelby. Iacocca wanted Shelby to prepare and campaign the Mustang as a B Production SCCA racer (Sports Car Club of America).
6	Helicopter Tour	15000	/images/helicopter.jpg	A one hour scenic tour of the coastline.	The fastest speed recorded by a helicopter is around 400 kph (248 mph). The longest distance traveled in a helicopter without landing is 3562 km (2213 miles). Helicopters can be used to fight fires by carrying tanks or helibuckets filled with water. Hovering can be the most difficult skill when flying a helicopter. We try to break these records on each outing.
3	Spider-Man Costume	4900	/images/spiderman.jpg	You are ready to swing from building to building in our Spider-Man costume.	Spider-Man uses web-shooters which are twin devices worn on his wrists which can shoot thin strands of a special “web fluid” at high pressure. The web fluid is a shear-thinning liquid (virtually solid until a shearing force is applied to it, rendering it fluid) whose exact formula is as yet unknown, but is related to nylon. On contact with air, the long-chain polymer knits and forms an extremely tough, flexible fiber with extraordinary adhesive properties. The web fluid’s adhesive quality diminishes rapidly with exposure to air. (Where it does not make contact with air, such as the attachment disk of the web-shooter, it remains very adhesive.) After about 2 hour, certain imbibed ether cause the solid form of the web fluid to dissolve into a powder. Because the fluid almost instantly sublimates from solid to liquid when under shear pressure, and is not adhesive in its anaerobic liquid/solid phase transition point, there is no clogging of the web-shooter’s parts.
1	Poké Ball Set	15100	/images/pokeball.jpg	A type of item that is critical to a Trainer''s quest, used for catching and storing Pokémon.	Though the technology behind a Poké Ball remains unknown and has evolved through the centuries to accommodate the diverse requirements of their creators, the basic mechanics are simple enough to understand and tend to remain constant: in a Pokémon battle, once an opposing wild Pokémon has been weakened, the Pokémon Trainer can throw a Poké Ball at it. When a Poké Ball hits the Pokémon, as long as it is not deflected, the Poké Ball will open, convert the Pokémon to a form of energy, pull it into its center, and close. A Pokémon in this state is given a chance to struggle to attempt to break free from the ball and escape, being instantly re-converted from energy into matter. Should a Pokémon escape a Poké Ball, the device will either be destroy or will return to the Trainer, who can attempt once again to catch the Pokémon. A Pokémon who does not escape the Ball will be caught.
4	The Very Hungry Caterpillar	599	/images/hungrycaterp.jpg	The Very Hungry Caterpillar is a children''s picture book designed, illustrated, and written by Eric Carle	We have all seen caterpillars, and we know they turn into beautiful butterflies. But, how do they do it? Here is a charming book written by Eric Carle about a very hungry caterpillar that keeps eating a lot. This board book is well-illustrated to show kids what exactly the hungry caterpillar ate. The caterpillar is hungry through the story until it makes a cocoon and goes to sleep. This book is a classic among picture books, and makes for a great gift for children.
8	Tie Set	1999	/images/ties.jpg	A nice set of ties.	A necktie, or simply a tie, is a long piece of cloth, worn, usually by men, for decorative purposes around the neck, resting under the shirt collar and knotted at the throat. Variants include the ascot, bow, bolo, zipper, cravat, and knit. The modern necktie, ascot, and bow tie are descended from the cravat. Neckties are generally unsized, but may be available in a longer size. In some cultures men and boys wear neckties as part of regular office attire or formal wear. Some women wear them as well but usually not as often as men. Neckties can also be worn as part of a uniform (e.g. military, school, waitstaff), whereas some choose to wear them as everyday clothing attire. Neckties are traditionally worn with the top shirt button fastened, and the tie knot resting between the collar points.
7	Now 7	799	/images/now7.jpg	Now That''s What I Call Music! 7 was released on July 31, 2001. The album is the seventh edition of the (U.S.) Now! series.	Now That''s What I Call Music! 7 was released on July 31, 2001. The album is the seventh edition of the (U.S.) Now! series. It debuted at number one on the Billboard 200 albums chart, selling 621,000 copies in its first week, the highest opening week of sales for any U.S. Now! album to date. It is the third number-one album in the series and has been certified 3× Platinum by the RIAA. Now! 7 is the first in the series to also crossover onto the Billboard Top R&B/Hip-Hop Albums chart, peaking at number three. The album features one track, "All for You", that reached number one on the Billboard Hot 100.
9	Tie Fighter	8500000	/images/tiefighter.jpg	Classic Imperial ship. Human for scale.	The TIE fighter was the unforgettable symbol of the Imperial fleet. Carried aboard Star Destroyers and battle stations, TIE fighters were single-pilot vehicles designed for fast-paced dogfights with Rebel X-wings and other starfighters. The iconic TIE fighter led to other models in the TIE family including the dagger-shaped TIE Interceptor and the explosive-laden TIE bomber. The terrifying roar of a TIE's engines would strike fear into the hearts of all enemies of the Empire.
\.


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."cartItems_cartItemId_seq"', 1, false);


--
-- Name: carts_cartId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."carts_cartId_seq"', 1, false);


--
-- Name: orders_orderId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."orders_orderId_seq"', 1, false);


--
-- Name: products_productId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."products_productId_seq"', 9, true);


--
-- Name: cartItems cartItems_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems"
    ADD CONSTRAINT "cartItems_pkey" PRIMARY KEY ("cartItemId");


--
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY ("cartId");


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY ("orderId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--
