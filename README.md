# Setup Project

- Create .env file

```
DATABASE_URL="mysql://root:@localhost:3306/user_contact_management"
```

```shell

npm install

npx prisma migrate dev

npx prisma generate

npm run build

npm run start

```