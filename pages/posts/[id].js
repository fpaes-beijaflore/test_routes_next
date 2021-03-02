import { useRouter } from 'next/router';

function Post({ post }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h5>Title:</h5>
      <p>{post.title}</p>

      <h5>Body:</h5>
      <p>{post.body}</p>

      {JSON.stringify(parseInt(router.query.id) - 1) > 0 && (
        <button
          onClick={() => {
            router.push(`/posts/${JSON.stringify(parseInt(router.query.id) - 1)}`);
          }}
        >
          {JSON.stringify(parseInt(router.query.id) - 1)}
        </button>
      )}

      <button disabled>{JSON.stringify(parseInt(router.query.id))}</button>

      <button
        onClick={() => {
          router.push(`/posts/${JSON.stringify(parseInt(router.query.id) + 1)}`);
        }}
      >
        {JSON.stringify(parseInt(router.query.id) + 1)}
      </button>
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } },
      { params: { id: '3' } },
      { params: { id: '4' } },
    ],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
  const post = await res.json();

  return {
    props: { post },
    revalidate: 1,
  };
}

export default Post;
