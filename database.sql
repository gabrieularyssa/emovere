CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE DATABASE test_jwt;

CREATE TABLE users (
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name TEXT NOT NULL,
    user_cpf varchar(50) NOT NULL UNIQUE,
    user_identificador varchar(50) NOT NULL UNIQUE,
    user_email TEXT NOT NULL UNIQUE,
    user_password TEXT NOT NULL,
    user_historic TEXT
);

CREATE TABLE products (
	prod_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	prod_name TEXT NOT NULL,
	prod_char TEXT NOT NULL,
	prod_price DECIMAL(6,2) NOT NULL,
	prod_image TEXT NOT NULL
);

SELECT * FROM users;

INSERT INTO users (user_name, user_email, user_password) VALUES ('Bob', 'bob@email.com', 'bob');
INSERT INTO users (user_name, user_email, user_password) VALUES ('fred', 'fred@email.com', 'fred');

INSERT INTO products (prod_name, prod_char, prod_price,prod_image) VALUES ('Alegria','A alegria é um sentimento de contentamento, de prazer de viver, júbilo, satisfação, exultação. Nas pessoas, costuma ser expressa através de sorrisos.', '1000', 'alegria');
INSERT INTO products (prod_name, prod_char, prod_price,prod_image) VALUES ('Animação','Ânimo é um estado emocional de duração relativamente longa. O estado de ânimo difere-se de simples emoções por serem menos específicos, menos intensos e menos prováveis de serem provocados por um estímulo ou evento em particular.', '1000', 'animacao');
INSERT INTO products (prod_name, prod_char, prod_price,prod_image) VALUES ('Paixão','Paixão é um sentimento humano intenso e profundo, marcado pelo grande interesse e atração da pessoa apaixonada por algo ou alguém.', '1000', 'apaixonado');
INSERT INTO products (prod_name, prod_char, prod_price,prod_image) VALUES ('Serenidade','Serenidade é o sentimento daquilo que está tranquilo, é manso e suave. Ter serenidade é expressar suavidade nas ações, mesmo diante de situações adversas e de conflitos.', '1000', 'serenidade');
INSERT INTO products (prod_name, prod_char, prod_price,prod_image) VALUES ('Companheirismo','Companheirismo é o comportamento que caracteriza o modo amistoso, cordial, bondoso e leal de convívio entre duas pessoas.', '1000', 'companheiro');
-- INSERT INTO products (prod_name, prod_char, prod_price,prod_image) VALUES ('Compreensão','Compreensão é a capacidade de compreender, entender ou assimilar algo. É considerado um processo cognitivo, onde é necessária a interpretação de determinada coisa para seja apreendida pelo indivíduo.', '1000', 'compreensao');
INSERT INTO products (prod_name, prod_char, prod_price,prod_image) VALUES ('Assertividade','Assertividade é uma competência emocional que determina que um indivíduo consegue tomar uma posição clara, ou seja, não fica "em cima do muro". Uma pessoa assertiva afirma o seu eu e a sua autoestima, demonstra segurança e sabe o que quer e qual alvo pretende alcançar.', '1000', 'assertividade');
INSERT INTO products (prod_name, prod_char, prod_price,prod_image) VALUES ('Concentração','A concentração é um processo psíquico que consiste em centrar voluntariamente toda a atenção da mente sobre um objetivo, objeto ou atividade que se está fazendo no momento, deixando de lado todos os fatos ou objetos que possam ser capazes de interferir na atenção.', '1000', 'concentracao');
INSERT INTO products (prod_name, prod_char, prod_price,prod_image) VALUES ('Pensamento Crítico','O pensamento crítico é a habilidade de pensar com clareza e racionalidade, de maneira reflexiva e independente, e compreender a conexão lógica entre ideias. Em essência, requer a nossa capacidade de raciocinar e de aprender ativamente, em contraste a ser apenas receptor passivo de informações.', '1000', 'pCritico');
-- INSERT INTO products (prod_name, prod_char, prod_price,prod_image) VALUES ('Persuasão','Persuasão é uma estratégia de comunicação que consiste em utilizar recursos emocionais ou simbólicos pra induzir alguém a aceitar uma ideia, uma atitude, ou realizar uma ação. É o emprego de argumentos, legítimos ou não, com o propósito de conseguir que outro indivíduo adote certa linha de conduta, teoria ou crença.', '1000', 'persuasao');
INSERT INTO products (prod_name, prod_char, prod_price,prod_image) VALUES ('Otimismo','Otimismo é a disposição para encarar as coisas pelo seu lado positivo e esperar sempre por um desfecho favorável, mesmo em situações muito difíceis.', '1000', 'otimismo');
INSERT INTO products (prod_name, prod_char, prod_price,prod_image) VALUES ('Romantismo','O Romantismo consiste em demonstrar seus sentimentos, admiração, preocupação e dedicar seu tempo à outra pessoa.', '1000', 'romantismo');
INSERT INTO products (prod_name, prod_char, prod_price,prod_image) VALUES ('Simpatia','Simpatia é um sentimento de afinidade que atrai e identifica as pessoas, é uma sensação espontânea que leva o indivíduo a estabelecer uma harmonia com o outro, permitindo a criação de laços de amizade.', '1000', 'simpatia');

--psql -U postgres
--\c test_jwt
--\dt
