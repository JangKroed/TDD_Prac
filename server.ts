import app from './src/app';
import env from './src/config.env';
import { connection } from './src/db/config/connection';

const port = env.PORT;

app.listen(port, () => {
    dbConnect();
    console.log('HTTP 서버가 실행되었습니다. 포트 :: ' + port);
});

function dbConnect() {
    if (env.NODE_ENV !== 'test') {
        connection
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
