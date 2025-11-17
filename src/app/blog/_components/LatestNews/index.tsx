import { blogRepository } from '../../_lib/blogRepository';
import { LatestNewsCarousel } from './LatestNewsCarousel';

interface LatestNewsProps {
    slugs: string[];
}

export function LatestNews({ slugs = [] }: LatestNewsProps) {
    if (slugs.length === 0) {
        return null;
    }
    
    const allPosts = blogRepository.getAll();
    
    const filteredPosts = allPosts.filter(post => slugs.includes(post.slug));
    
    if (filteredPosts.length === 0) {
        return null;
    }
    
    return <LatestNewsCarousel posts={filteredPosts} />;
}
