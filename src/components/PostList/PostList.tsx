import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosApi from '../../AxiosAPI';
import '../../App.css';
import {Post} from "../../ types";
import {AxiosResponse} from "axios";
import Spinner from "../../UI/Spinner/Spinner.tsx";

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPosts = async (): Promise<void> => {
      try{
        setLoading(true);
        const response:AxiosResponse<Record<string,Post>> = await axiosApi.get<Record<string, Post>>('/posts.json');
        const data:Record<string, Post> = response.data;

        const loadedPosts: Post[] = Object.keys(data).map((key:string) => ({
          id: key,
          ...data[key],
        }));

        setPosts(loadedPosts);
      } catch(error){
        console.log('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    void fetchPosts();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <div>
        {posts.map((post) => (
          <div className="post-box" key={post.id}>
            <div>
              <p className="post-date">{new Date(post.createdAt).toLocaleString()}</p>
              <Link to={`/posts/${post.id}`}>
                <div className="post-title">{post.title}</div>
              </Link>

              <Link to={`/posts/${post.id}`}>
                <p className='post-read-more'>Read More..</p>
              </Link>

              <Link to={`/posts/${post.id}/edit`}>
                <p className='post-edit'>Edit</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
