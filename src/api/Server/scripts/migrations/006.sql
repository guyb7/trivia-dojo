CREATE TABLE trivia.user_quizes
(
    id character varying NOT NULL,
    user_id character varying NOT NULL,
    quiz_key character varying NOT NULL,
    data jsonb NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT "user-quiz" UNIQUE (user_id, quiz_key)
)
WITH (
    OIDS = FALSE
);

ALTER TABLE trivia.user_quizes
    OWNER to trivia_admin;
