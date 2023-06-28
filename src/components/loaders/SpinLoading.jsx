import ReactLoading from "react-loading";

const SpinLoading = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
        width: "100vw",
      }}
    >
      <ReactLoading type="spin" color="red" />
    </div>
  );
};

export default SpinLoading;
