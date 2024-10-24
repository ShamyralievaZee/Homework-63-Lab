import PostForm from '../../components/PostForm/PostForm.tsx';
import '../../App.css';

const Add = () => {
  return (
    <div className="main-container">
      <h3 className="nav-title">Add new post</h3>
      <PostForm/>
    </div>
  );
};

export default Add;