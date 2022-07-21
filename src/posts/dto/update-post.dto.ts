import { PartialType } from '@nestjs/mapped-types';
import { CreateFilePostDto } from './create-file-post.dto';

export class UpdatePostDto extends PartialType(CreateFilePostDto) {}
