// 게시판에 대한 model 
module.exports = function (sequelize, DataTypes) { 
    return sequelize.define(
    'admin_member', 
    {
        admin_member_id: {
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true,
        allowNull: false,
        comment: '관리자계정 고유번호',
        }, 
        admin_id: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: '관리자 계정 ID',
        }, 
        admin_password: {
            type: DataTypes.STRING(300), 
            allowNull: false,
            comment: '관리자 계정 비밀번호(단방향 암호화 문자열)',
        }, 
        admin_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: '관리자 이름',
        }, 
        reg_date: {
            type: DataTypes.DATE, 
            allowNull: false, 
            comment: '등록일시',
        },
        reg_member_id: {
            type: DataTypes.INTEGER, 
            allowNull: false,
            comment: '등록자고유번호',
        }, 
        edit_date: {
            type: DataTypes.DATE, 
            allowNull: true, 
            comment: '수정일시',
        }, 
        edit_member_id: {
            type: DataTypes.INTEGER, 
            allowNull: true,
            comment: '수정자고유번호',
        } 
    },
    {
        sequelize,
        tableName: 'admin_member', 
        timestamps: false, 
        comment: '관리자 계정 정보', 
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'admin_member_id' }],
            }, 
        ],
    });
};