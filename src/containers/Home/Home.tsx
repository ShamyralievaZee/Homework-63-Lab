import PostList from "../../components/PostList/PostList.tsx";

const Home = () => {
  return (
      <div className="main-container">
          <h3 className='nav-title'>Posts</h3>
          <PostList/>
      </div>
  );
};

export default Home;
