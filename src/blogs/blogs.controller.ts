import { Controller } from '@nestjs/common';
import { BlogService } from './blog.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateBlogDto } from './createBlog.dto';

@Controller()
export class BlogsController {
  constructor(private readonly blogService: BlogService) {}

  @MessagePattern({ cmd: 'getBlogs' })
  getBlogs() {
    return this.blogService.getBlogs();
  }

  @MessagePattern({ cmd: 'showBlog' })
  showBlog(id: string) {
    return this.blogService.showBlog(id);
  }

  @MessagePattern({ cmd: 'createBlog' })
  createBlog(createBlogDto: CreateBlogDto) {
    return this.blogService.createBlog(createBlogDto);
  }

  @MessagePattern({ cmd: 'updateBlog' })
  updateBlog(payload: any) {
    return this.blogService.updateBlog(payload['id'], payload['updateBlogDto']);
  }

  @MessagePattern({ cmd: 'deleteBlog' })
  deleteBlog(id: string) {
    return this.blogService.deleteBlog(id);
  }
}
