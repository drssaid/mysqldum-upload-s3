const mysqldump = require('mysqldump');


async function backup(dbConnection,DB_DATABASE) {
  const now = new Date();
  const dateString = now.toJSON().substring(0, 16).replace(":", "");
  const filename = `db-${DB_DATABASE}-${dateString}.sql.gz`;
  const path = "/tmp/" + filename;
  await mysqldump({
    connection: dbConnection,
    dumpToFile: path,
    compressFile: true,
  });
  return {filename,path,now};
}
module.exports.backup = backup