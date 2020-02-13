-- Drop table

-- DROP TABLE public.wishlist;

CREATE TABLE wishlist (
	id_cliente int4 NOT NULL,
	id_produto varchar NOT NULL,
	CONSTRAINT wishlist_fk FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente)
);
