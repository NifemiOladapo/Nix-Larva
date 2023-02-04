import Poster from "./Poster";
import Post from "./Post";
import { useState, useEffect } from "react";
import Pusher from 'pusher-js';

const MainPage = () => {
  const [posts, setposts] = useState([]);

  async function fetchPosts() {
    await fetch("http://localhost:5000/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setposts(data);
      });
  }

  useEffect(()=>{
    fetchPosts()
  },[])

  useEffect(() => {
    const pusher = new Pusher('fbf133c273ecc8d4f7e3', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('posts');
    channel.bind('inserted',(data)=> {
      JSON.parse(posts.unshift(data))
      setposts([...posts])
    });

    return ()=>{
      channel.unbind_all()
      channel.unsubscribe()
    }
  }, [posts]);

  return (
    <div
      style={{
      }}
    >
      <Poster />
      {posts.map((post) => {
        console.log(posts)
      return <Post key={post._id} post={post} />;
      })}
    </div>
  );
};

export default MainPage;
