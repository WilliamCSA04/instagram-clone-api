import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { SUPABASE_BUCKETS } from 'src/supabase/constants';
import { SupabaseService } from 'src/supabase/supabase.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private supabaseService: SupabaseService) {}

  async create(createPostDto: CreatePostDto) {
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
    return `This action returns all posts`;
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
