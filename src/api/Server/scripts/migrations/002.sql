CREATE TABLE trivia.achievements_progress
(
    "user_id" character varying NOT NULL,
    key character varying NOT NULL,
    status character varying NOT NULL DEFAULT 'in-progress',
    value integer,
    CONSTRAINT "user-achievement" UNIQUE ("user_id", key),
    CONSTRAINT "user_id" FOREIGN KEY ("user_id")
        REFERENCES trivia.users (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL
)
WITH (
    OIDS = FALSE
);

ALTER TABLE trivia.achievements_progress
    OWNER to trivia_admin;
