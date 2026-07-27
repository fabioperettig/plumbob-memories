CREATE TABLE IF NOT EXISTS TB_SKILLS (
    cooking INT,
    mechanical INT,
    charisma INT,
    logic INT,
    body INT,
    creativity INT,
    CONSTRAINT chk_max_level
    CHECK (
        cooking <= 10 AND
        mechanical  <= 10 AND
        charisma <= 10 AND
        logic <= 10 AND
        body <= 10 AND
        creativity <= 10 AND
        )
);