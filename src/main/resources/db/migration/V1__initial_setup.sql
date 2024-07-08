CREATE TABLE IF NOT EXISTS filters (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS types (
    id SERIAL PRIMARY KEY,
    type VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS comparisons (
    id SERIAL PRIMARY KEY,
    type_id INT NOT NULL,
    comparison VARCHAR(255) NOT NULL,
    CONSTRAINT fk_comparison_type_id FOREIGN KEY (type_id) REFERENCES types (id)
);

CREATE TABLE IF NOT EXISTS criterias (
    id SERIAL PRIMARY KEY,
    filter_id INT NOT NULL,
    type_id INT NOT NULL,
    comparison_id INT NOT NULL,
    criteria_value VARCHAR(255) NOT NULL,
    CONSTRAINT fk_filter_id FOREIGN KEY (filter_id) REFERENCES filters (id),
    CONSTRAINT fk_type_id FOREIGN KEY (type_id) REFERENCES types (id),
    CONSTRAINT fk_comparison_id FOREIGN KEY (comparison_id) REFERENCES comparisons (id)
);

INSERT INTO filters (name) VALUES ('Filter One');
INSERT INTO filters (name) VALUES ('Filter Two');

INSERT INTO types (type) VALUES ('Amount');
INSERT INTO types (type) VALUES ('Title');
INSERT INTO types (type) VALUES ('Date');

INSERT INTO comparisons (type_id, comparison) VALUES (1, 'Equal');
INSERT INTO comparisons (type_id, comparison) VALUES (1, 'Not equal');
INSERT INTO comparisons (type_id, comparison) VALUES (1, 'Greater than');
INSERT INTO comparisons (type_id, comparison) VALUES (1, 'Less than');
INSERT INTO comparisons (type_id, comparison) VALUES (1, 'More than or equal');
INSERT INTO comparisons (type_id, comparison) VALUES (1, 'Less then or equal');
INSERT INTO comparisons (type_id, comparison) VALUES (2, 'Starts with');
INSERT INTO comparisons (type_id, comparison) VALUES (2, 'Ends with');
INSERT INTO comparisons (type_id, comparison) VALUES (2, 'Contains');
INSERT INTO comparisons (type_id, comparison) VALUES (3, 'From');
INSERT INTO comparisons (type_id, comparison) VALUES (3, 'To');
INSERT INTO comparisons (type_id, comparison) VALUES (3, 'On');

INSERT INTO criterias (filter_id, type_id, comparison_id, criteria_value) VALUES (1, 1, 1, 4);
INSERT INTO criterias (filter_id, type_id, comparison_id, criteria_value) VALUES (2, 2, 7, 'Meow');
INSERT INTO criterias (filter_id, type_id, comparison_id, criteria_value) VALUES (1, 2, 9, 'Something beautiful');
