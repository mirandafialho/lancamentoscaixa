--
-- ATIVIDADE SOBRE TRIGGERS
-- 

CREATE DATABASE dinossauros;

CREATE TABLE grupo
(
	id serial primary key,
	nome varchar(255),
	tipo_alimentacao varchar(255)
);

INSERT INTO grupo (nome, tipo_alimentacao)
VALUES ('Anquilossauros', 'Herbívoro'),
('Ceratopsídeos', 'Herbívoro'),
('Estegossauros', 'Herbívoro'),
('Terápodes', 'Carnívoro');

CREATE TABLE era
(
	id serial primary key,
	nome varchar(255),
	ano_inicio integer,
	ano_fim integer
);

INSERT INTO era (nome, ano_inicio, ano_fim)
VALUES ('Triássico', 251, 200),
('Jurássico', 200, 145),
('Cretáceo', 145, 65);

CREATE TABLE dinossauro
(
	id serial primary key,
	nome varchar(255),
	grupo_id integer,
	toneladas integer,
	ano_descoberta integer,
	descobridor varchar(255),
	era_id integer,
	ano_inicio integer,
	ano_fim integer,
	pais varchar(255),
	foreign key (era_id)
    	references era (id),
    foreign key (grupo_id)
    	references grupo (id)
);

CREATE OR REPLACE FUNCTION public.validar_dinossauro()
RETURNS TRIGGER AS $$
DECLARE 
	era_ano_inicio INT;
	era_ano_fim INT;
    era_nome VARCHAR;
BEGIN
	SELECT e.ano_inicio, e.ano_fim, e.nome
		INTO era_ano_inicio, era_ano_fim, era_nome
	FROM era AS e
	WHERE e.id = NEW.era_id;
	
    IF (NEW.ano_inicio < era_ano_inicio AND NEW.ano_fim < era_ano_fim) THEN
       RAISE EXCEPTION '% está com os anos incorretos. Não condiz de acordo com a era %. Favor corrigir.', NEW.nome, era_nome;
    END IF;
   
   	IF (NEW.ano_inicio > era_ano_inicio AND NEW.ano_fim > era_ano_fim) THEN
       RAISE EXCEPTION '% está com os anos incorretos. Não condiz de acordo com a era %. Favor corrigir.', NEW.nome, era_nome;
    END IF;
   
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS valida_ano_dinossauro ON dinossauro;
CREATE TRIGGER valida_ano_dinossauro 
BEFORE UPDATE OR INSERT ON dinossauro 
	FOR EACH ROW EXECUTE PROCEDURE validar_dinossauro();

INSERT INTO dinossauro(nome, grupo_id, toneladas, ano_descoberta, descobridor, era_id, ano_inicio, ano_fim, pais)
VALUES ('Saichania', 1, 4, 1997, 'Maryanska', 3, 145, 66, 'Mongólia'),
('Tricerátops', 2, 4, 1997, 'Maryanska', 3, 70, 66, 'Canadá'),
('Kentrossauro', 3, 4, 1997, 'Maryanska', 2, 200, 145, 'Tanzânia'),
('Alossauro', 4, 4, 1997, 'Maryanska', 2, 155, 150, 'América do Norte');

INSERT INTO dinossauro(nome, grupo_id, toneladas, ano_descoberta, descobridor, era_id, ano_inicio, ano_fim, pais)
values ('Pinacossauro', 1, 4, 1997, 'Maryanska', 1, 85, 75, 'China'),
('Anquilossauro', 1, 4, 1997, 'Maryanska', 1, 66, 63, 'América do Norte');