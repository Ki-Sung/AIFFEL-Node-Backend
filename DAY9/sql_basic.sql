# DB(스키마)선택 
USE gilberT_Db;

# SQL(Structured Query Language)은 RDBMS 서버의 각종 DB 객체(생성/관리)와 데이터를 제어하는 프로그래밍 언어 

# 회원정보 테이블의 모든 데이터와 컬럼을 조회 
SELECT * FROM member;

# 회원정보 테이블에 신규회원정보를 등록! 
# INSERT INTO 테이블명(컬럼 1, 컬럼2....)VALUES(값1, 값2,...);

# 첫 번째 데이터 넣기 
INSERT INTO member(email, member_name, telephone, entry_date)VALUES('test1@test.co.kr', 'gilbert', '010-1234-1234', now());

# 두 번째 데이터 넣기 
INSERT INTO member(email, member_name, entry_date)VALUES('test2@test.co.kr', 'billy', now());

# 세 번째 데이터 넣기 
INSERT INTO member(email, member_name, telephone, entry_date)VALUES('test3@test.co.kr', 'timmy', '010-4321-4321', now());

# 네 번째 데이터 넣기 
INSERT INTO member(email, member_name, telephone, entry_date)VALUES('test4@test.co.kr', 'mike', '010-3456-3456', now());

# 회원명 컬럼은 반드시 값이 들어와하는 not null 컬럼인데, 넣지 않으면 에러가 발생하여 모든 항목의 값이 등록이 안됨. -> Contraints(제약사항)
INSERT INTO member(email, telephone, entry_date)VALUES('test5@test.co.kr', '010-1234-1234', now());

/* 컬럼에 들어갈수 있는 실제 데이터 유형
- 실제 데이터 (눈에 보이는 값)
null: null 값은 데이터가 들어오지 않은 것, 데이터가 없음. 
'': 빈 문자열(눈에는 안 보이지만, 빈 공빅 문자가 하나에서 여러개 들어갈 수도 있음.) 
*/ 

# 데이터 확인 
SELECT * FROM member;

# 데이터 수정 - 회원 정보 테이블의 특정 컬럼(항목들)의 값을 수정하기 
# update 테이블명 set 컬럼명1=변경할 값, 컬럼명2=변경할 값, ... where 조건절;
# case1) 회원명을 모두 gilbert로 바꾸기 - 주의, 테이블의 조건을 걸지 않으면 모든 데이터가 바뀐다. 
UPDATE member SET member_name='gilbert';

# 조건식 추가 
UPDATE member SET member_name='gilbert' WHERE member_id = 1;
UPDATE member SET member_name='bily' WHERE member_ID = 2;
UPDATE member SET membEr_name='timmy' WHERE member_id = 3;
UPDATE membER SET member_nAme='mike' WHERE member_id = 4;

# 비어있는 컬럼에 데이터 수정 
UPDATE member SET TELEphone='010-9876-9876' WHERE member_id = 2;
# 2번째 데이터를 여러개 수정 
UPDATE member SET telephone='010-3344-3344', member_name='blitax' WHERE member_id = 2;

# 회원정보 삭제 - 삭제시 정말 정말로 주의하자!!
DELETE FROM member;
# 조건문 이용 
DELETE FROM member WHERE member_id >= 7;

# 데이터 확인 
SELECT * FROM member;

# 다양한 조건의 SQL 쿼리를 작성하기
SELECT * FROM member WHERE member_id = 3 OR telephone IS NULL;

SELECT * FROM member WHERE (member_name = "gilbert" AND telephone='010-1234-1234') OR member_id = 10;

# 이름이 gil로 시작하는 사람 모두 조회 -> Pattern Matching - LIKE 구문 
# e.g) '%gil%'-> ..가 포함된 모든 값, gil% -> ..로 시작하는 모든 값, '%ert' -> ..으로 끝나는 모든 값  
SELECT * FROM member WHERE member_name LIKE 'gil%';
SELECT * FROM member WHERE member_name LIKE '%il%';
SELECT * FROM member WHERE member_name LIKE '%ert';
SELECT * FROM member WHERE member_name LIKE 'gil%' AND telephone = '010-1234-1234';

# 데이터 조회 결과물을 정렬해서 가져오기 
# 오름차순 정렬 - ASC 
SELECT * FROM member ORDER BY member_id ASC;
# 내림차순 정렬 - DESC
SELECT * FROM member ORDER BY member_id DESC;

/*
CRUD = 데이터에 대한 등록(Create), 조회(Read), 수정(Update), 삭제(Delete)
C: SQL: INSERT INTO 테이블명()VALUE();
R: SQL: SELECT * FROM 테이블명;
U: SQL: UPDATE 테이블명 SET 컬럼명='';
D: SQL: DELETE FROM 테이블명 WHERE 조건..;
*/
