const Movie = ({ result }) => {
  return (
    <div>
      <h1>{result.title}</h1>
    </div>
  );
};

export default Movie;

export async function getServerSideProps(context) {
  const { id } = context.query;
  const request = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_KEY}&language=en-US&append_to_response=videos`
  ).then((response) => response.json());

  return {
    props: {
      result: request,
    },
  };
}
