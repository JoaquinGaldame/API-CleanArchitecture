export const connection_db = {
  company1: {
    host: "localhost",
    user: "company1_user",
    password: "company1123",
    database: "company1",
  },
  company2: {
    host: "localhost",
    user: "company2_user",
    password: "company2123",
    database: "company2",
  },
  company3: {
    host: "localhost",
    user: "company3_user",
    password: "company3123",
    database: "company3",
  },
};

export type DbConnectionKey = keyof typeof connection_db;