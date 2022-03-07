\echo 'Delete and recreate aq db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE aq;
CREATE DATABASE aq;
\connect aq

\i aq-schema.sql
\i aq-seed.sql

\echo 'Delete and recreate aq_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE aq_test;
CREATE DATABASE aq_test;
\connect aq_test

\i aq-schema.sql

