import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './blog.entity';
import { CreateBlogDto } from './createBlog.dto';
import { UpdateBlogDto } from './updateBlog.dto';
import * as admin from 'firebase-admin';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly BlogsRepository: Repository<Blog>,
  ) {}

  async getBlogs(): Promise<Blog[]> {
    return this.BlogsRepository.find();
  }

  async showBlog(id: string) {
    try {
      const blog = await this.BlogsRepository.findOne(id);

      return { blog: blog };
    } catch (e) {
      return { error: e };
    }
  }

  async createBlog(createBlogDto: CreateBlogDto) {
    try {
      const newBlog = await admin
        .firestore()
        .collection('Blogs')
        .add({
          ...createBlogDto,
        });

      let blog = new Blog();
      blog.id = newBlog.id;
      blog.title = createBlogDto.title;
      blog.content = createBlogDto.content;
      blog.image = createBlogDto.image

      await this.BlogsRepository.save(blog);

      return { blog: blog };
    } catch (e) {
      return { error: e };
    }
  }

  async updateBlog(id: string, updateBlogDto: UpdateBlogDto) {
    try {
      await admin
        .firestore()
        .collection('Blogs')
        .doc(id)
        .set({ ...updateBlogDto });

      const blog = await this.BlogsRepository.findOne(id);
      blog.title = updateBlogDto.title;
      blog.content = updateBlogDto.content;
      blog.image = updateBlogDto.image;

      await this.BlogsRepository.save(blog);

      return { blog: blog };
    } catch (e) {
      return { error: e };
    }
  }

  async deleteBlog(id: string) {
    try {
      await admin
        .firestore()
        .collection('Blogs')
        .doc(id)
        .delete();

      const blog = await this.BlogsRepository.findOne(id);
      await this.BlogsRepository.remove(blog);

      return { blog: blog };
    } catch (e) {
      return { error: e };
    }
  }
}
