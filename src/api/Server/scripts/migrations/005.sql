CREATE TABLE trivia.user_categories
(
    user_id character varying NOT NULL,
    category_id character varying NOT NULL,
    rank integer NOT NULL DEFAULT 1500,
    CONSTRAINT user_category UNIQUE (user_id, category_id),
    CONSTRAINT "user" FOREIGN KEY (user_id)
        REFERENCES trivia.users (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT category FOREIGN KEY (category_id)
        REFERENCES trivia.categories (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT
)
WITH (
    OIDS = FALSE
);

ALTER TABLE trivia.user_categories
    OWNER to trivia_admin;

ALTER TABLE trivia.questions
    ALTER COLUMN category TYPE character varying ;
ALTER TABLE trivia.questions
    ALTER COLUMN category SET NOT NULL;

ALTER TABLE trivia.questions
    ADD COLUMN rank integer NOT NULL DEFAULT 1500;
