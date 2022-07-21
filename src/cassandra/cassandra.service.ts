import { Injectable } from '@nestjs/common';
import { Client, mapping, auth } from 'cassandra-driver';

@Injectable()
export class CassandraService {
  client: Client;
  mapper: mapping.Mapper;
  private createClient() {
    this.client = new Client({
      contactPoints: ['0.0.0.0'],
      localDataCenter: 'datacenter1',
    });
    this.client.connect();
  }

  createMapper(mappingOptions: mapping.MappingOptions) {
    if (this.client == undefined) {
      this.createClient();
    }
    // WARNING: If docker is remade, those two line must be used
    // this.client.execute(
    //   "CREATE KEYSPACE IF NOT EXISTS feed WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '3' }",
    // );
    // this.client.execute(
    //   'CREATE TABLE IF NOT EXISTS feed.posts(id int PRIMARY KEY, description text, photo text )',
    // );
    return new mapping.Mapper(this.client, mappingOptions);
  }
}
