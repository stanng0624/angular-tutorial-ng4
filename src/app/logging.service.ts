// import { log4js } from 'log4js';
//
// log4js.configure({
//   "appenders": [
//     { "type": "console" },
//     { "type": "file", "filename": "logs/myapp.log", "category": "MyApp" }
//   ]
// });

export class LoggingService {

  logStatusChange(status: string): void {
    console.log('Status is changed: ' + status);

    // const logger = log4js.getLogger('ABC');
    // logger.info('Status is changed: ' + status);
  }
}
