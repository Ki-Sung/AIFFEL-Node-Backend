module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
    
        // 기본 테이블 이름
        'member',
        {
        
            // 속성을 단일 객체로 지정 - member_id라는 컬럼 설정 
            member_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
                comment: '회원고유번호',
            
            },
            // 속성을 단일 객체로 지정 - email라는 컬럼 설정
            email: {
                type: DataTypes.STRING(100),
                primaryKey: false,
                allowNull: false,
                comment: '사용자메일주소',
            },
            name: {
                type: DataTypes.STRING(50),
                primaryKey: false,
                allowNull: false,
                comment: '사용자명',
            },
            password: {
                type: DataTypes.STRING(200),
                primaryKey: false,
                allowNull: false,
                comment: '단방향암호가 적용된 암호 문자열',
            },
            telephone: {
                type: DataTypes.STRING(50),
                primaryKey: false,
                allowNull: true,
                comment: '사용자전화번호',
            }
        },
        
        {
            // 등록일시 컬럼 자동으로 생성 및 물리적인 테이블을 삭제된 것 처럼 보이는 설정 지정
            timestamps: true,
            paranoid: true
            
        });
};