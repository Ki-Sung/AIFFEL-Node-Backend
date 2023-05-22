# db 선택 
USE gilbert_db;

# 데이터 조회 
select * from article;

# 테이블에 데이터 입력 
INSERT INTO article(board_type_code, title, article_type_code, contents, view_count, ip_address, is_display_code, reg_date, reg_member_id, edit_date, edit_member_id)
VALUES(2, '글제목 3', 0, '글내용 1', 0, '111.111.111.115', 1, now(), 1, now(), 1);

# 저장 프로시져 생성하기 
DROP procedure IF EXSP_CHAT_ARTICLE_BYIDISTS `SP_CHAT_ARTICLE_BYID`;
DELIMITER //
CREATE PROCEDURE SP_CHAT_ARTICLE_BYID(
  P_ARTICLE_ID 	  INT
)
BEGIN

SELECT * FROM article WHERE article_id = P_ARTICLE_ID;

END //
DELIMITER ;


# 프로시져 조회 
CALL SP_CHAT_ARTICLE_BYID(1)

 
