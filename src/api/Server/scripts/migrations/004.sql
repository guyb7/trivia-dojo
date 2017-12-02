CREATE TABLE trivia.user_statistics
(
    user_id character varying NOT NULL,
    key character varying NOT NULL,
    value character varying NOT NULL,
    CONSTRAINT "user-key" UNIQUE (user_id, key),
    CONSTRAINT user_id FOREIGN KEY (user_id)
        REFERENCES trivia.users (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL
)
WITH (
    OIDS = FALSE
);

ALTER TABLE trivia.user_statistics
    OWNER to trivia_admin;
