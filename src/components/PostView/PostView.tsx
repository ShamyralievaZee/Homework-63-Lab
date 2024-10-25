import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, NavigateFunction } from 'react-router-dom';
import axiosApi from '../../AxiosAPI';
import Spinner from '../../UI/Spinner/Spinner';
import { Post } from '../../ types';
import { AxiosResponse } from 'axios';

const PostView = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate:NavigateFunction = useNavigate();

  useEffect(() => {
    const fetchPost = async (): Promise<void> => {
      try {
        setLoading(true);
        const response:AxiosResponse<Post> = await axiosApi.get(`/posts/${id}.json`);
        setPost({ id, ...response.data });
      } finally {
        setLoading(false);
      }
    };

    void fetchPost();
  }, [id]);

  const handleDelete = async (): Promise<void> => {
    await axiosApi.delete(`/posts/${id}.json`);
    navigate('/');
  };

  if (loading) return <Spinner />;
  if (!post) return <p>Not found</p>;

  return (
    <div>
      <h3 className='nav-title'>{post.title}</h3>

      <p className='post-date'>{new Date(post.createdAt).toLocaleDateString()}</p>

      <div className='view-content'>{post.content}</div>

      <button className='view-button view-btn' onClick={handleDelete}>Delete</button>
      <Link to={`/posts/${post.id}/edit`}>
        <p className='view-edit view-btn'>Edit</p>
      </Link>
    </div>
  );
};

export default PostView;
