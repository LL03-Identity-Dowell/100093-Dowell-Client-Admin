import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../store/Store";
import axios from "axios";

const sessionId = localStorage.getItem("sessionId");

const Exportfolio = () => {
  const userName = useSelector(
    (state: RootState) => state.adminData.data[0]?.Username
  );

  const ownerorg = useSelector(
    (state: RootState) => state?.adminData?.data[0]
  );

  console.log(ownerorg, 'ownerorg');
  

  const handleSubmit = async () => {
    const data = {
      session_id: sessionId,
      org: "",
      product: "",
      portfolio: "",
      username: userName,
    };

    try {
      await axios
        .get(
          `https://100093.pythonanywhere.com/api/exportfolio?session_id=${sessionId}&org=${data.org}&product=${data.product}&portfolio=${data.portfolio}&username=${data.username}`
        )
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

  return <></>;
};

export default Exportfolio;
