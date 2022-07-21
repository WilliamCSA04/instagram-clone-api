import { BadRequestException, Injectable } from '@nestjs/common';
import { SUPABASE_BUCKETS } from 'src/supabase/constants';
import { SupabaseService } from 'src/supabase/supabase.service';
import { CreateFilePostDto } from './dto/create-file-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(
    private supabaseService: SupabaseService,
    private postsRepository: PostsRepository,
  ) {}

  async create(createPostDto: CreatePostDto) {
    return this.postsRepository.insertPost(createPostDto);
  }

  async createFile(createPostDto: CreateFilePostDto) {
    const { file } = createPostDto;
    const postFile = file[0];

    const { data, error } = await this.supabaseService.uploadBucket({
      bucket: SUPABASE_BUCKETS.POSTS,
      file: postFile.buffer,
      name: `${new Date().toISOString()}-${postFile.originalname}`,
    });
    if (error) {
      console.error('error', error);
      throw new BadRequestException();
    }
    return data;
  }

  findAll() {
    return this.postsRepository.getPosts();
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
