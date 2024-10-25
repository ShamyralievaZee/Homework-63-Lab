import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosApi from '../../AxiosAPI';
import { Post } from '../../ types';
import { AxiosResponse } from 'axios';

const PostForm = () => {
    const [post, setPost] = useState<Post>({ title: '', content: '', createdAt: new Date().toISOString() });
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchPost = async (): Promise<void> => {
            try {
                const response:AxiosResponse<Post> = await axiosApi.get<Post>(`/posts/${id}.json`);
                setPost({ id, ...response.data });
            } catch (err) {
                setError('Failed to fetch post');
                console.error(err);
            }
        }
        if (id) {
            void fetchPost();
        }
    }, [id]);

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

    const handleDelete = async (): Promise<void> => {
        try {
            await axiosApi.delete(`/posts/${id}.json`);
            navigate('/');
        } catch (err) {
            setError('Failed to delete post');
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-box">
            {error && <p style={{color: 'red'}}>{error}</p>}
            <h3 className='nav-title'>{id ? 'Edit your post ' : 'Add your post'}</h3>
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
            <button type="submit">{id ? 'Edit Post' : 'Add Post'}</button>
            {id && (
                <button type="button" onClick={handleDelete}>
                    Delete Post
                </button>
            )}
        </form>
    );
};

export default PostForm;

