function Posts({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li>
          <h5>Title:</h5>
          <p>{post.title}</p>

          <h5>Body:</h5>
          <p>{post.body}</p>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const res = await fetch('https://603e90e8d952850017603625.mockapi.io/api/v1/posts/Posts');
  const posts = await res.json();

  return {
    props: {
      posts,
    },
    revalidate: 10,
  };
}

export default Posts;
