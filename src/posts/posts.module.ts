import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { UsersModule } from 'src/users/users.module';
import { SupabaseModule } from 'src/supabase/supabase.module';
import { CassandraModule } from 'src/cassandra/cassandra.module';
import { PostsRepository } from './posts.repository';

@Module({
  imports: [UsersModule, SupabaseModule, CassandraModule],
  controllers: [PostsController],
  providers: [PostsService, PostsRepository],
  exports: [PostsService, PostsRepository],
})
export class PostsModule {}
