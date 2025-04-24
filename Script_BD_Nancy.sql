DROP TABLE perfil CASCADE CONSTRAINTS;
DROP TABLE usuario CASCADE CONSTRAINTS;
DROP TABLE sucursal CASCADE CONSTRAINTS;
DROP TABLE estado_pedido CASCADE CONSTRAINTS;
DROP TABLE tipo_entrega CASCADE CONSTRAINTS;
DROP TABLE pedido_producto CASCADE CONSTRAINTS;
DROP TABLE categoria CASCADE CONSTRAINTS;
DROP TABLE entrega CASCADE CONSTRAINTS;
DROP TABLE estado_entrega CASCADE CONSTRAINTS;
DROP TABLE forma_pago CASCADE CONSTRAINTS;
DROP TABLE pedido CASCADE CONSTRAINTS;
DROP TABLE producto CASCADE CONSTRAINTS;


CREATE TABLE perfil (
    id_perfil   VARCHAR2(50 CHAR) NOT NULL,
    descripcion VARCHAR2(400 CHAR) NOT NULL
);

ALTER TABLE perfil ADD CONSTRAINT perfil_pk PRIMARY KEY ( id_perfil );

CREATE TABLE usuario (
    id_usuario       VARCHAR2(50 CHAR) NOT NULL,
    nombre_usuario   VARCHAR2(100 CHAR) NOT NULL,
    contrasenia      VARCHAR2(100 CHAR) NOT NULL,
    run_usuario      VARCHAR2(20 CHAR) NOT NULL,
    p_nombre         VARCHAR2(100 CHAR) NOT NULL,
    s_nombre         VARCHAR2(100 CHAR),
    p_apellido       VARCHAR2(100 CHAR) NOT NULL,
    s_apellido       VARCHAR2(100 CHAR) NOT NULL,
    telefono         INTEGER NOT NULL,
    correo           VARCHAR2(200 CHAR) NOT NULL,
    direccion        VARCHAR2(200 CHAR),
    perfil_id_perfil VARCHAR2(50 CHAR) NOT NULL
);

ALTER TABLE usuario ADD CONSTRAINT usuario_pk PRIMARY KEY ( id_usuario );

CREATE TABLE sucursal (
    id_sucursal     VARCHAR2(50 CHAR) NOT NULL,
    nombre_sucursal VARCHAR2(200 CHAR) NOT NULL,
    direccion       VARCHAR2(400 CHAR) NOT NULL,
    telefono        INTEGER NOT NULL
);

ALTER TABLE sucursal ADD CONSTRAINT sucursal_pk PRIMARY KEY ( id_sucursal );

CREATE TABLE pedido (
    id_pedido                      VARCHAR2(50 CHAR) NOT NULL,
    fecha                          DATE NOT NULL,
    total                          INTEGER NOT NULL,
    estado_pedido_id_estado_pedido VARCHAR2(50 CHAR) NOT NULL,
    usuario_id_usuario             VARCHAR2(50 CHAR) NOT NULL,
    comprobante_pago               VARCHAR2(500),
    forma_pago_id_forma_pago       VARCHAR2(50 CHAR) NOT NULL,
    entrega_id_entrega             VARCHAR2(50 CHAR) NOT NULL
);

ALTER TABLE pedido ADD CONSTRAINT pedido_pk PRIMARY KEY ( id_pedido );

CREATE TABLE estado_pedido (
    id_estado_pedido VARCHAR2(50 CHAR) NOT NULL,
    descripcion_est_bol VARCHAR2(400 CHAR) NOT NULL
);

ALTER TABLE estado_pedido ADD CONSTRAINT estado_pedido_pk PRIMARY KEY (id_estado_pedido);

CREATE TABLE tipo_entrega (
    id_tipo_entrega VARCHAR2(50 CHAR) NOT NULL,
    descripcion     VARCHAR2(400 CHAR) NOT NULL
);

ALTER TABLE tipo_entrega ADD CONSTRAINT tipo_entrega_pk PRIMARY KEY ( id_tipo_entrega );

CREATE TABLE pedido_producto (
    cantidad             INTEGER NOT NULL,
    pedido_id_boleta     VARCHAR2(50 CHAR) NOT NULL,
    producto_id_producto VARCHAR2(50 CHAR) NOT NULL
);

COMMENT ON COLUMN pedido_producto.cantidad IS
    '	';

CREATE TABLE categoria (
    id_categoria VARCHAR2(50 CHAR) NOT NULL,
    descripcion  VARCHAR2(400 CHAR) NOT NULL
);

ALTER TABLE categoria ADD CONSTRAINT categoria_pk PRIMARY KEY ( id_categoria );

CREATE TABLE entrega (
    id_entrega                       VARCHAR2(50 CHAR) NOT NULL,
    fecha_entrega                    DATE NOT NULL,
    direccion_entrega                VARCHAR2(200 CHAR),
    sucursal_id_sucursal             VARCHAR2(50 CHAR) NOT NULL, 
    estado_entrega_id                VARCHAR2(50 CHAR) NOT NULL,
    tipo_entrega_id_tipo_entrega     VARCHAR2(50 CHAR) NOT NULL
);

ALTER TABLE entrega ADD CONSTRAINT entrega_pk PRIMARY KEY ( id_entrega );

CREATE TABLE estado_entrega (
    id_estado_entrega VARCHAR2(50 CHAR) NOT NULL,
    descripcion       VARCHAR2(400 CHAR) NOT NULL
);

ALTER TABLE estado_entrega ADD CONSTRAINT estado_entrega_pk PRIMARY KEY ( id_estado_entrega );

CREATE TABLE forma_pago (
    id_forma_pago VARCHAR2(50 CHAR) NOT NULL,
    descripciones VARCHAR2(400 CHAR) NOT NULL
);

ALTER TABLE forma_pago ADD CONSTRAINT forma_pago_pk PRIMARY KEY ( id_forma_pago );

CREATE TABLE producto (
    id_producto            VARCHAR2(50 CHAR) NOT NULL,
    nombre                 VARCHAR2(200 CHAR) NOT NULL,
    descripcion            VARCHAR2(500 CHAR) NOT NULL,
    link_foto              VARCHAR2(500 CHAR) NOT NULL,
    precio                 INTEGER NOT NULL,
    stock                  INTEGER NOT NULL,
    categoria_id_categoria VARCHAR2(50 CHAR) NOT NULL
);

ALTER TABLE producto ADD CONSTRAINT producto_pk PRIMARY KEY ( id_producto );

ALTER TABLE pedido_producto
    ADD CONSTRAINT pedido_producto_pedido_fk FOREIGN KEY ( pedido_id_boleta )
        REFERENCES pedido ( id_pedido );

ALTER TABLE pedido_producto
    ADD CONSTRAINT pedido_producto_producto_fk FOREIGN KEY ( producto_id_producto )
        REFERENCES producto ( id_producto );

ALTER TABLE entrega
    ADD CONSTRAINT entrega_estado_entrega_fk FOREIGN KEY (estado_entrega_id)
        REFERENCES estado_entrega (id_estado_entrega);

ALTER TABLE entrega
    ADD CONSTRAINT entrega_sucursal_fk FOREIGN KEY ( sucursal_id_sucursal )
        REFERENCES sucursal ( id_sucursal );

ALTER TABLE entrega
    ADD CONSTRAINT entrega_tipo_entrega_fk FOREIGN KEY ( tipo_entrega_id_tipo_entrega )
        REFERENCES tipo_entrega ( id_tipo_entrega );

ALTER TABLE pedido
    ADD CONSTRAINT pedido_entrega_fk FOREIGN KEY ( entrega_id_entrega )
        REFERENCES entrega ( id_entrega );

ALTER TABLE pedido
    ADD CONSTRAINT pedido_estado_pedido_fk FOREIGN KEY ( estado_pedido_id_estado_pedido )
        REFERENCES estado_pedido ( id_estado_pedido );

ALTER TABLE pedido
    ADD CONSTRAINT pedido_forma_pago_fk FOREIGN KEY ( forma_pago_id_forma_pago )
        REFERENCES forma_pago ( id_forma_pago );

ALTER TABLE pedido
    ADD CONSTRAINT pedido_usuario_fk FOREIGN KEY ( usuario_id_usuario )
        REFERENCES usuario ( id_usuario );

ALTER TABLE producto
    ADD CONSTRAINT producto_categoria_fk FOREIGN KEY ( categoria_id_categoria )
        REFERENCES categoria ( id_categoria );

ALTER TABLE usuario
    ADD CONSTRAINT usuario_perfil_fk FOREIGN KEY ( perfil_id_perfil )
        REFERENCES perfil ( id_perfil );

//Inserción de datos admin
INSERT INTO perfil VALUES (1,'Administrador');

INSERT INTO usuario VALUES (1, 'NancyDiaz', 'NDia.1822', '18225225-0', 'Nancy', 'Andrea', 'Díaz', 'Vega', 912341234, 'nancy.diaz@btnancy.cl', 'Las Parras 0350', 1);