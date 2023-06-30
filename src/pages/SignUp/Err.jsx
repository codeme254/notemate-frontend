import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Err = ({ errMessage }) => {
  // const notify = () => toast("Wow so easy!");

  return (
    <div>
      {/* <button onClick={notify}>Notify!</button> */}
      {toast(errMessage)}
      <ToastContainer />
    </div>
  );
};

export default Err;
