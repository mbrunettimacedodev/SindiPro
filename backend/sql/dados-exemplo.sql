-- Dados de exemplo para testar o sistema (rode DEPOIS do schema.sql).

INSERT INTO predio (rua, bairro, cidade, cep, nome_condominio, numero_condominio)
VALUES ('Rua das Flores', 'Centro', 'Novo Hamburgo', '93510-000', 'Residencial Aurora', 120);

INSERT INTO unidade (bloco, andar, numero_apartamento, predio_id) VALUES
    ('A', 1, 101, 1),
    ('A', 1, 102, 1),
    ('A', 2, 201, 1);

INSERT INTO morador (nome, cpf, email, idade, unidade_id, tipo, valor_aluguel, tem_posse) VALUES
    ('Maria Souza',  '111.222.333-44', 'maria.souza@email.com',  41, 1, 'PROPRIETARIO', NULL,    TRUE),
    ('João Pereira', '555.666.777-88', 'joao.pereira@email.com', 29, 2, 'INQUILINO',    1800.00, NULL);

INSERT INTO vaga_garagem (numero, coberta, unidade_id) VALUES
    ('V01', TRUE,  1),
    ('V02', FALSE, 2),
    ('V03', FALSE, NULL);

INSERT INTO encomenda (descricao, remetente, data_recebimento, data_retirada, morador_id) VALUES
    ('Caixa média - Mercado Livre', 'Mercado Livre', NOW(), NULL, 2),
    ('Envelope - Correios',         'Correios',      NOW() - INTERVAL '2 days', NOW() - INTERVAL '1 day', 1);

INSERT INTO evento (titulo, descricao, local, data_hora, predio_id) VALUES
    ('Assembleia geral',    'Pauta: prestação de contas e obras da fachada', 'Salão de festas', NOW() + INTERVAL '7 days',  1),
    ('Limpeza da caixa d''água', 'Água cortada das 8h às 12h',               'Bloco A',         NOW() + INTERVAL '15 days', 1);
