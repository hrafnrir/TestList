import s from "./styles/Loading.module.scss";

const Loading = () => {
  return (
    <div className={s.root}>
      <div className={s.loading}></div>
    </div>
  );
};

export default Loading;
