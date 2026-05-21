export default function Account() {
  const { data: account, loading, error } = useQuery("/users/me");

  if (loading || !account) return <p>Loading...</p>;
  if (error) return <p>Whoops! {error}</p>;

  return (
    <article>
      <h1>Welcome, {account.firstname}</h1>
      <p>Your email on file is {account.email}</p>
    </article>
  );
}
