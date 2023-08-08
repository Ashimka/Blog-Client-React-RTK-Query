import Post from "../components/post/Post";
import Sidebar from "../components/sidebar/Sidebar";

const Home = () => {
  return (
    <>
      <div className="main__inner">
        <Post />
        <Sidebar />
      </div>
    </>
  );
};

export default Home;
