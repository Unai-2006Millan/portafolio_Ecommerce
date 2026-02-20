CREATE TABLE "usuarios" (
  "id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "nombre_completo" varchar,
  "email" varchar UNIQUE,
  "contrasenia" varchar
);

CREATE TABLE "productos" (
  "id" integer  GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "nombre" varchar,
  "descripcion" varchar,
  "precio" money,
  "stock" integer
);

CREATE TABLE "carrito_usuario" (
  "id_carrito" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "id_usuario" integer REFERENCES "usuarios" ("id") UNIQUE,
  "precio_total" money
);

CREATE TABLE "carrito_productos" (
  "id_carrito" integer,
  "id_producto" integer,
  "cantidad" integer NOT NULL,
  "precio_total_producto" money NOT NULL,
  PRIMARY KEY ("id_carrito", "id_producto")
);

CREATE TABLE "pedidos" (
  "id_pedido" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "id_usuario" integer REFERENCES "usuarios" ("id") UNIQUE,
  "precio_total" money NOT NULL,
  "estado" varchar NOT NULL
);

CREATE TABLE "pedidos_productos" (
  "id_pedido" integer,
  "id_producto" integer,
  "cantidad" integer NOT NULL,
  "precio_total_producto" money NOT NULL,
  PRIMARY KEY ("id_pedido", "id_producto")
);

ALTER TABLE "carrito_productos" ADD FOREIGN KEY ("id_producto") REFERENCES "productos" ("id");

ALTER TABLE "carrito_productos" ADD FOREIGN KEY ("id_carrito") REFERENCES "carrito_usuario" ("id_carrito");

ALTER TABLE "pedidos_productos" ADD FOREIGN KEY ("id_pedido") REFERENCES "pedidos" ("id_pedido");

ALTER TABLE "pedidos_productos" ADD FOREIGN KEY ("id_producto") REFERENCES "productos" ("id");
