import { Injectable, OnModuleInit } from '@nestjs/common';
import { mapping } from 'cassandra-driver';
import { Posts } from './posts.model';
import { CassandraService } from '../cassandra/cassandra.service';

@Injectable()
export class PostsRepository implements OnModuleInit {
  constructor(private cassandraService: CassandraService) {}

  postsMapper: mapping.ModelMapper<Posts>;

  onModuleInit() {
    const mappingOptions: mapping.MappingOptions = {
      models: {
        Posts: {
          tables: ['posts'],
          mappings: new mapping.UnderscoreCqlToCamelCaseMappings(),
          keyspace: 'feed',
        },
      },
    };

    this.postsMapper = this.cassandraService
      .createMapper(mappingOptions)
      .forModel('Posts');
  }

  async getPosts() {
    return (await this.postsMapper.findAll()).toArray();
  }
}
