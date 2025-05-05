alter session set "_ORACLE_SCRIPT" = true;
create user db_nancy identified by db_nancy;
grant connect,resource,dba to db_nancy;