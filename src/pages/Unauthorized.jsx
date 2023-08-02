import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <section>
      <h1>Не авторизованны</h1>
      <br />
      <p>У вас нет доступа к запрошенной странице.</p>
      <div>
        <button onClick={goBack}>Назад</button>
      </div>
    </section>
  );
};

export default Unauthorized;
