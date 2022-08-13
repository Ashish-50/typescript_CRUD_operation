import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule); // this create method create a instance of the  nest application it is same as we do createServer  in nodejs with http
  const app = await NestFactory.create(AppModule, { cors: true }); // here we are enabling cors for accesssing thrid party api's data
  app
    .listen(process.env.PORT)
    .then(() => {
      console.log(`server started on port ${process.env.PORT}`);
    })
    .catch((err) => {
      console.log(err);
    });
}
bootstrap();
