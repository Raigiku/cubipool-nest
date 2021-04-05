module.exports = {
  type: "postgres",
  url: process.env.CUBIPOOL_POSTGRESQL_URL,
  synchronize: true,
  logging: true,
  timezone: "+0",
  entities: ["dist/**/*.typeorm.js"],
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};
