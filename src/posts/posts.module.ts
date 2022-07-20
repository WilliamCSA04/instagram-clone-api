import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { UsersModule } from 'src/users/users.module';
import { SupabaseModule } from 'src/supabase/supabase.module';

@Module({
  imports: [UsersModule, SupabaseModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
