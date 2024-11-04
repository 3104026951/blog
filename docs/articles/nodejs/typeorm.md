## typeorm简介
TypeORM 是一个ORM框架，用于在Node.js应用程序中与数据库进行交互。它支持多种数据库，包括MySQL、PostgreSQL、SQLite和MariaDB等。TypeORM 提供了丰富的功能，包括实体管理、查询构建、事务处理等。它还支持使用TypeScript编写代码，从而提供更好的类型检查和自动补全功能。


## 使用typeorm创建实体

```typescript
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```

## typeorm生成DataSource配置
```typescript
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'test',
  entities: [__dirname + '/entity/*.ts'],
  synchronize: true,
});
```

## 使用typeorm创建数据表

```typescript
import { createConnection } from 'typeorm';
import { User } from './entity/User';

createConnection()
  .then(async connection => {
    await connection.synchronize();
    console.log('Table created');
  })
  .catch(error => console.log(error));
```

## 使用typeorm创建数据
```typescript
import { createConnection } from 'typeorm';
import { User } from './entity/User';

createConnection()
  .then(async connection => {
    const userRepository = connection.getRepository(User);
    const user = new User();
    user.name = 'John';
    user.age = 25;
    await userRepository.save(user);
    console.log('User has been saved. User id is', user.id);
  })
  .catch(error => console.log(error));
```

## 使用typeorm查询数据

```typescript
import { createConnection } from 'typeorm';
import { User } from './entity/User';

createConnection()
  .then(async connection => {
    const userRepository = connection.getRepository(User);
    const users = await userRepository.find();
    console.log(users);
  })
  .catch(error => console.log(error));
```

## 创建一对一关系并保存数据
#### 创建一对一实体
```typescript
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;
}

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bio: string;

  @Column()
  image: string;

  @OneToOne(() => User, user => user.profile, {
    cascade: true // 如果设置为true，则当保存User时，会自动保存Profile
  })
  user: User;
}
``` 
#### 保存一对一关系的数据
```typescript
import { createConnection } from 'typeorm';
import { User } from './entity/User';
import { Profile } from './entity/Profile';

createConnection()
  .then(async connection => {
    const userRepository = connection.getRepository(User);
    const profileRepository = connection.getRepository(Profile);

    const user = new User();
    user.name = 'John';
    user.age = 25;
    user.profile = new Profile();
    user.profile.bio = 'I am John';
    user.profile.image = 'http://example.com/john.png';

    
    await userRepository.save(user);
    console.log('User has been saved. User id is', user.id);
  })
  .catch(error => console.log(error));
```

#### 查询一对一关系的数据
```typescript
import { createConnection } from 'typeorm';
import { User } from './entity/User';

createConnection()
  .then(async connection => {
    const userRepository = connection.getRepository(User);
    const users = await userRepository.find({ relations: ['profile'] });
    console.log(users);
  })
  .catch(error => console.log(error));
```








