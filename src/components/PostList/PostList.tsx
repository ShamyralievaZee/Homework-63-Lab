import { useEffect, useState } from 'react';
import {Post} from "../../ types";
import { Link } from 'react-router-dom';
import axiosApi from '../../AxiosAPI';
import '../../App.css';
import { AxiosResponse } from 'axios';
import Spinner from '../../UI/Spinner/Spinner.tsx';


const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPosts = async (): Promise<void> => {
      try {
        setLoading(true);
        const response: AxiosResponse<Record<string, Post>> = await axiosApi.get('/posts.json');
        const data = response.data;

        const loadedPosts: Post[] = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        setPosts(loadedPosts.reverse());
      } catch (error) {
        console.log('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

void fetchPosts();
  }, []);

  if (loading) return <Spinner />;

  return (
      <div>
        <h3 className='nav-title'>Posts</h3>
        {posts.map((post) => (
            <div className="post-box" key={post.id}>
              <p className="post-date">{new Date(post.createdAt).toLocaleString()}</p>
              <Link to={`/posts/${post.id}`}>
                <h2 className="post-title">{post.title}</h2>
              </Link>
              <p className="post-content">{post.content.substring(0, 150)}...</p>
              <Link to={`/posts/${post.id}`}>
                <p className="post-read-more">Read More...</p>
              </Link>
              <Link to={`/posts/${post.id}/edit`}>
                <p className="post-edit">Edit</p>
              </Link>
            </div>
        ))}
      </div>
  );
};

export default PostList;
