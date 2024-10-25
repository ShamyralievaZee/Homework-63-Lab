import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosApi from '../../AxiosAPI';
import { Post } from '../../ types';

const PostForm = () => {
  const [post, setPost] = useState<Post>({ title: '', content: '', createdAt: new Date().toISOString() });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>):void => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent):Promise<void> => {
    e.preventDefault();
    try {
      if (id) {
        await axiosApi.put(`/posts/${id}.json`, post);
      } else {
        await axiosApi.post('/posts.json', post);
      }
      navigate('/');
    } catch (err) {
      setError('Failed to submit post');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-box">
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        name="title"
        value={post.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <textarea
        name="content"
        value={post.content}
        onChange={handleChange}
        placeholder="Write your post here..."
        required
      ></textarea>
      <button type="submit">Add Post</button>
    </form>
  );
};

export default PostForm;
