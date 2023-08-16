import Modal from "react-modal";
import { ChangeEvent, useState } from "react";
import images from "../../images";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/Store";
import { ToastContainer, toast } from "react-toastify";

const Form1 = () => {
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isPrivacyPolicy, setIsPrivacyPolicy] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [link, setLink] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [formInputs, setFormInputs] = useState({
    member_name: "",
    member_code: "",
    member_spec: "",
    member_u_code: "",
    member_det: "",
  });

  const openPrivacyModal = () => {
    setIsPrivacyModalOpen(true);
  };

  const closePrivacyModal = () => {
    setIsPrivacyModalOpen(false);
  };

  const userName = useSelector(
    (state: RootState) => state.adminData.data[0]?.Username
  );

  const handleCopyToClipBoard = () => {
    if (link === "") {
      toast.error("Unable to copy link");
    } else {
      navigator.clipboard
        .writeText(link)
        .then(() => {
          setIsCopied(true);
          toast.success("copied");
        })
        .catch((error) => console.error("Error copying link", error));
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormInputs({ ...formInputs, [e.target.id]: e.target.value });
  };

  const handleOnChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormInputs({ ...formInputs, member_det: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      username: userName,
      member_name: formInputs.member_name,
      member_code: formInputs.member_code,
      member_spec: formInputs.member_spec,
      member_u_code: formInputs.member_u_code,
      member_det: formInputs.member_det,
    };

    try {
      await axios
        .post("https://100093.pythonanywhere.com/api/create_team_member/", data)
        .then((res) => {
          console.log(res.data);
          setLink(res.data.link);
          setErrMsg("");
          toast.success("success");
        });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(error);
        setErrMsg(error.response?.data.error);
      } else {
        console.error("An unknown error occurred:", error);
        setErrMsg("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" />
      <div className="lg:w-1/3 border border-[#54595F] card-shadow">
        <span className="bg-[#61ce70] font-roboto text-lg text-white p-[30px] m-5 font-semibold flex flex-col items-center">
          <p>TEAM MEMBERS</p>
          <p>{"<Total active team members>"}</p>
        </span>
        <div className="p-[30px]  my-20">
          <p className="text-[#FF0000] text-lg font-roboto font-semibold">
            Invite TEAM MEMBER to my organisation
          </p>
        </div>
        <form className="px-[30px]" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-[#7A7A7A] text-lg font-roboto font-bold flex items-end gap-1">
              Team Member Name
              <span className="text-[#ff0000] text-base">*</span>
            </label>
            <input
              type="text"
              placeholder="Member name"
              required
              onChange={handleOnChange}
              id="member_name"
              className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
            />
          </div>
          <div className="mb-4">
            <label className="text-[#7A7A7A] text-lg font-roboto font-bold flex items-end gap-1">
              Team Member Code (Unique)
              <span className="text-[#ff0000] text-base">*</span>
            </label>
            <input
              type="text"
              placeholder="Member code"
              required
              onChange={handleOnChange}
              id="member_code"
              className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
            />
          </div>
          <div className="mb-4">
            <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
              Team Member Specifications
            </label>
            <input
              type="text"
              placeholder="Member specifications"
              onChange={handleOnChange}
              id="member_spec"
              className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
            />
          </div>
          <div className="mb-4">
            <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
              Team Member Universal Code
            </label>
            <input
              type="text"
              placeholder="Member universal code"
              onChange={handleOnChange}
              id="member_u_code"
              className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
            />
          </div>
          <div className="mb-4">
            <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
              Team Member Details
            </label>
            <textarea
              rows={4}
              placeholder="Member details"
              onChange={handleOnChangeTextArea}
              id="member_det"
              className="outline-none w-full px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto resize-none"
            />
          </div>
          <div className="flex items-center gap-x-2 py-8">
            <p className="text-[#548625]">
              Do you accept our{" "}
              <button
                className="text-black"
                type="button"
                onClick={openPrivacyModal}
              >
                policies?
              </button>{" "}
            </p>
            <input type="checkbox" required />
          </div>
          <button
            disabled={isLoading}
            className={`w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto ${
              isLoading ? "hover:bg-[#7a7a7a] opacity-50" : ""
            }`}
          >
            Create Team Member Invitation Link
          </button>
          <p className="text-xs text-[#FF0000] text-center pt-2">{errMsg}</p>
        </form>

        <div className="bg-[#cef9d2] font-roboto text-lg text-[#7a7a7a] p-6 my-8 font-semibold ">
          <p>Team Member Invitation Link</p>

          <p className="px-6 text-sm truncate">{link}</p>
        </div>

        <button
          className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto"
          onClick={handleCopyToClipBoard}
        >
          {isCopied ? "Copied" : "Copy invitation link"}
        </button>

        <form className="border-t border-[#FF0000] my-8">
          <div className="px-4 mt-8">
            <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
              Email
            </label>
            <input
              type="text"
              placeholder="Email of invitee"
              required
              className="outline-none w-full h-12 px-4 mb-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
            />
            <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
              Send invitation link in email
            </button>
          </div>
        </form>
      </div>

      <Modal
        style={{
          overlay: {
            position: "fixed",
            top: "0%",
            left: "0%",
            right: "0%",
            bottom: "0%",
            backgroundColor: "rgba(119, 119, 119, 0.589)",
            zIndex: 50,
          },
        }}
        className="absolute lg:mt-36 left-0 right-0 md:w-3/5 mx-auto md:h-auto h-screen lg:max-h-[80%] pb-4 overflow-y-auto overflow-auto bg-[#FFFDFD] z-50 lg:rounded-[10px] outline-none border-0 md:flex flex-col justify-between shadow-[5px_5px_30px_0px_#00000040]"
        isOpen={isPrivacyModalOpen}
        onRequestClose={closePrivacyModal}
        ariaHideApp={false}
      >
        <div className="flex justify-end px-6 pt-6">
          <button
            className="bg-black text-white text-sm px-2 py-1 rounded-sm"
            onClick={closePrivacyModal}
          >
            X
          </button>
        </div>
        <div className="px-16 mt-16 text-sm pb-24">
          <img src={images.dowell_logo} alt="" className="w-[180px]" />
          <h2 className="underline text-center text-xl my-8 font-bold">
            Privacy Consent Form
          </h2>
          <h2 className="text-xl mt-16 font-bold">
            FOR USE WHEN COLLECTING PERSONAL DATA IN/FROM EUROPEAN UNION
          </h2>
          <p>
            Required by European Union General Data Protection Regulation
            2016/679 (“EUGDPR”)
          </p>
          <br />
          <p>
            To Be Signed by Individuals Providing Personal Data to the Dowell
            Sample 2 who is the controller of your personal data.
          </p>
          <br />
          <p>You may contact via email at: app@app.com</p>
          <br />
          <p>
            Your personal data will be used for the following purposes (check
            all that apply):
          </p>
          <form className="flex flex-col pl-20 my-4">
            <span className="flex gap-x-2">
              <input type="checkbox" />
              <label>Marketing</label>
            </span>
            <span className="flex gap-x-2">
              <input type="checkbox" />
              <label>Advertisement</label>
            </span>
            <span className="flex gap-x-2">
              <input type="checkbox" />
              <label>Research</label>
            </span>
            <span className="flex gap-x-2">
              <input type="checkbox" />
              <label>Technical Support</label>
            </span>
            <span className="flex gap-x-2">
              <input type="checkbox" />
              <label>Other</label>
            </span>
          </form>
          <p>
            The categories of personal data you are being asked to consent to
            the collection and use are your name, address, email address,
            telephone number, and [include a description of any other personal
            data collected]. will keep your personal data with the software
            where Dowell will collect, store and process your personal data and
            who are contractually obligated to keep your personal data
            confidential subject to appropriate safeguards to prevent it from
            unauthorized disclosure. Also intends to share your personal data
            with [identify all company units and third parties that will receive
            personal data].
          </p>
          <br />
          <p>
            Your personal data will be stored in accordance with the record
            retention requirements applicable to Dowell Research Pte. Ltd. a
            private organization of Singapore, and any other applicable laws.
            Under the EUGDPR, you have the right to request access to, rectify,
            erase, and restrict the processing of your personal data. You also
            have the right to revoke this consent to use your personal data.
          </p>
          <br />
          <p>
            We use Your Personal data to provide and improve the Service. By
            using the Service, You agree to the collection and use of
            information in accordance with the Privacy Policy. You can read more
            about the
            <a
              href="https://100087.pythonanywhere.com/legalpolicies/FB1010000000001665306290565391/app-privacy-policy/policies/?session_id=m6wpj01dah7p8y55g5f1dsmbg4pcsa3e"
              className="text-[#0000ee]"
            >
              {" "}
              privacy policy.
            </a>{" "}
            You have the right to request access to, rectify, erase and restrict
            the processing of your personal data. You also have the right to
            revoke this consent to use your personal data.
          </p>{" "}
          <br />
          <p>
            If you feel has violated the EUGDPR, you have the right to file a
            complaint with the appropriate EU supervisory authority. These
            rights are more specifically described in the Privacy Notices posted
            on the website at{" "}
            <a href="https://appsample.com/" className="text-[#0000ee]">
              https://appsample.com/
            </a>{" "}
          </p>
          <br />
          <p>
            Please [sign/electronically sign/check the box below], date, and
            return by [email/submit] the below:
          </p>
          <br />
          <p>
            Privacy Consent Form I consent to use my personal data for the
            purposes described in this notice and understand that I can withdraw
            my consent at any time.
          </p>
          <br />
          <span className="flex gap-4 pl-20 mb-4">
            <input
              type="checkbox"
              onChange={() => setIsPrivacyPolicy((current) => !current)}
            />
            <label>gives consent</label>
          </span>
          {isPrivacyPolicy && (
            <form className="flex flex-col gap-4 my-8">
              <div className="flex items-center gap-x-3">
                <label>Name of Individual providing Consent*:</label>{" "}
                <input
                  type="text"
                  className="border border-black rounded-sm"
                  name="name_of_individual"
                />
              </div>
              <div className="flex items-center gap-x-3">
                <label>Address of Individual providing Consent*:</label>{" "}
                <input
                  type="text"
                  className="border border-black rounded-sm"
                  name="address_of_individual"
                />
              </div>
              <div className="flex items-center gap-x-3">
                <label>Signature*:</label>{" "}
                <input
                  type="file"
                  className="rounded-sm"
                  name="address_of_individual"
                />
              </div>
              <div className="flex mt-4 pl-20">
                <button className="bg-[#008000] text-white text-sm px-4 h-12 rounded-md">
                  Submit Consent
                </button>
              </div>
            </form>
          )}
          <footer>
            {
              "Disclaimer: We collect the information on this form solely for the purposes of licensing certain documents to you, per the terms prescribed on the website. All data is stored in accordance with our Privacy Policy. We do not sell or otherwise distribute personal information collected via this form to third parties, nor will you receive any marketing material, unless you have specifically opted in to receive such materials from us."
            }
          </footer>
          <br />
        </div>
      </Modal>
    </>
  );
};

export default Form1;
