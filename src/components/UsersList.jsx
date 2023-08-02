import { useGetUsersQuery } from "../features/users/usersApiSlice";
import { Link } from "react-router-dom";

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();

  let content;

  if (isLoading) content = <p>"Загрузка..."</p>;

  if (isSuccess) {
    content = (
      <>
        <section className="users">
          <h1>Список пользователей</h1>
          <ul>
            {users.map((user, i) => {
              return <li key={i}>{user.email}</li>;
            })}
          </ul>
          <Link to="/user/me">Назад</Link>
        </section>
      </>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error || error.message)}</p>;
  }

  return content;
};

export default UsersList;
