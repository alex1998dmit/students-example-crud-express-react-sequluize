require('dotenv').config()

// TODO обновить данные входа пользователя
const creds = {
    username: "unicorn_user",
    password: "magical_password",
    database: "eshop",
    host: "localhost",
    port: 5432,
    dialect: 'postgresql'
}

module.exports = creds;
