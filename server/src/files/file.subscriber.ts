import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { File } from './file.entity';

@EventSubscriber()
export class FileSubscriber implements EntitySubscriberInterface<File> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return File;
  }

  afterInsert(event: InsertEvent<File>) {
    console.log(
      `This is where a new file inserted and we should email the admin: `,
      event.entity,
    );
    // TODO call the admin here
  }
}
