import app from './src/app';
import env from './src/config.env';
import { typeORMConfig } from './src/db/config/connection';

app.listen(env.PORT, () => {
    dbConnect();
    console.log('HTTP 서버가 실행되었습니다. 포트 :: ' + env.PORT);
});

function dbConnect() {
    if (env.NODE_ENV !== 'test') {
        typeORMConfig
            .initialize()
            .then(() => {
                console.log('Data Source has been initialized successfully.');
            })
            .catch((error) => {
                console.error(error);
                console.log(
                    'Error during Data Source initialization: ',
                    error.message
                );

                process.exit(0);
            });
    }
}
