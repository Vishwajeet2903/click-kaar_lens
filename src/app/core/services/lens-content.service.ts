import { Injectable } from '@angular/core';
import { BlogPost, IdeaItem, LensCategory, LensGroup, LensStat, Testimonial } from '../models/lens.models';
import { blogPosts, ideas, lensCategories, portfolioItems, stats, testimonials } from '../../features/lens/data/lens-content.data';

@Injectable({ providedIn: 'root' })
export class LensContentService {
  readonly categories = lensCategories;
  readonly portfolio = portfolioItems;
  readonly stats: LensStat[] = stats;
  readonly testimonials: Testimonial[] = testimonials;
  readonly ideas: IdeaItem[] = ideas;
  readonly blogPosts: BlogPost[] = blogPosts;

  getCategory(slug: string | null): LensCategory | undefined {
    return this.categories.find((category) => category.slug === slug);
  }

  getCategories(group?: LensGroup): LensCategory[] {
    return group ? this.categories.filter((category) => category.group === group) : this.categories;
  }

  getBlogPost(slug: string | null): BlogPost | undefined {
    return this.blogPosts.find((post) => post.slug === slug);
  }
}
