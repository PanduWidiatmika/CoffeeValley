import mysql from 'serverless-mysql'

// const db = mysql({
//   config: {
//     host: 'localhost',
//     port: '3306',
//     database: 'test',
//     user: 'root',
//     password: 'p@55w0rd'
//   }
// });

const db = mysql({
  config: {
    host: '127.0.0.1',
    port: '3306',
    database: 'next',
    user: 'root',
    password: ''
  }
});

export default async function executeQuery({ query, values }) {
  try {
    const results = await db.query(query, values);
    await db.end();
    return results;
  } catch (error) {
    return { error };
  }
}

// export default async function executeQuery({ query, values }) {
//   try {
//     const connection = await db.connect();
//     const results = await connection.query(query, values);
//     await connection.end();
//     return results;
//   } catch (error) {
//     return { error };
//   }
// }