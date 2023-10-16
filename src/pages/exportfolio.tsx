import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../store/Store";
import axios from "axios";
import Loader from "./whiteloader";
import { getloaderstate } from "../store/slice/loaderstate";

const Exportfolio = () => {
  const show_loader = useSelector((state: RootState) => state.loaderslice);
  console.log(show_loader);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    dispatch(getloaderstate(false));
    // Capture URL parameters
    const queryParams = new URLSearchParams(window.location.search);
    const sessionId = queryParams.get("session_id");
    const org = queryParams.get("org");
    const product = queryParams.get("product");
    const portfolio = queryParams.get("portfolio");
    const username = queryParams.get("username");

    const data = {
      session_id: sessionId,
      org: org,
      product: product,
      portfolio: portfolio,
      username: username,
    };

    try {
      await axios
        .get(`https://100093.pythonanywhere.com/api/exportfolio`, {
          params: data, // Send the parameters as an object
        })
        .then((res) => {
          console.log(res.data);
          toast.success("success");
          window.location.href = res.data;
        });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(error);
      } else {
        console.error("An unknown error occurred:", error);
      }
    }
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  return <>{!show_loader && <Loader />}</>;
};

export default Exportfolio;
