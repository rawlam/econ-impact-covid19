-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.

DROP TABLE IF EXISTS stock;
DROP TABLE IF EXISTS sector;
DROP TABLE IF EXISTS quotes;
DROP TABLE IF EXISTS covid_19_data;

CREATE TABLE stock (
    symbol_id varchar(255)   NOT NULL,
    name varchar(255)   NOT NULL,
    sector_id varchar(255)   NOT NULL,
    CONSTRAINT pk_stock PRIMARY KEY (
        symbol_id
     )
);

CREATE TABLE sector (
    sector_id varchar(255)   NOT NULL,
    name varchar(255)   NOT NULL,
    CONSTRAINT pk_sector PRIMARY KEY (
        sector_id
     )
);

CREATE TABLE quotes (
    date date   NOT NULL,
    symbol_id varchar(255)   NOT NULL,
    open float   NOT NULL
);

ALTER TABLE stock ADD CONSTRAINT fk_stock_sector_id FOREIGN KEY(sector_id)
REFERENCES sector (sector_id);

ALTER TABLE quotes ADD CONSTRAINT fk_quotes_symbol_id FOREIGN KEY(symbol_id)
REFERENCES stock (symbol_id);

CREATE TABLE covid_19_data (
    Date_reported date   NOT NULL,
    New_cases int   NOT NULL,
    Cumulative_cases int   NOT NULL,
    New_deaths int   NOT NULL,
    Cumulative_deaths int   NOT NULL
);

select * from sector
select * from stock
select * from quotes
select * from covid_19_data