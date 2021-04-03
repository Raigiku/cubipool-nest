module.exports = {
  type: "postgres",
  url: process.env.POSTGRESQL_URL,
  synchronize: true,
  logging: true,
  timezone: "+0",
  entities: ["dist/**/*.typeorm.js"],
};
