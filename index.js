require('dotenv').config()
const fs= require('fs');
const {backup} = require('./backup');
const s3 = require('./s3');
const {DB_USER,DB_HOST,DB_PWD,DB_DATABASE,DB_USER_WP,DB_HOST_WP,DB_PWD_WP,DB_DATABASE_WP} = process.env
var cron = require('node-cron');



const dentalChatBackup = async()=>{
    const  {filename,path,now} = await backup({
        user: DB_USER,
        host: DB_HOST,
        password: DB_PWD,
        database: DB_DATABASE
    },DB_DATABASE);
    await s3.upload(filename, path, now);
    fs.unlink(path, () => {});
}
const wpBackup = async()=>{
    const  {filename,path,now} = await backup({
        user: DB_USER_WP,
        host: DB_HOST_WP,
        password: DB_PWD_WP,
        database: DB_DATABASE_WP
    },DB_DATABASE_WP);
    await s3.upload(filename, path, now);
    fs.unlink(path, () => {});
}

const job = async(time = 1000)=>{
    setTimeout( async()=>{
        try {
            await dentalChatBackup();
        } catch (error) {
            console.error("dentalChatBackup" , error)
        }
        try {
            await wpBackup();
        } catch (error) {
            console.error("wpBackup" , error)
        }
        
    },time);
}
cron.schedule('* * */23 * *', () => {
    job();
});


