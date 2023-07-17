import { useState } from "react";
import images from "../images";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import { getAdminData } from "../../store/slice/adminData";

const TeamMember = () => {
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [uploadLinkModal, setUploadLinkModal] = useState(false);
  const [isPrivacyPolicy, setIsPrivacyPolicy] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<string>("");

  const [filteredNotes, setFilteredNotes] = useState([]);

  const team_member = useSelector(
    (state: RootState) => state.adminData.data[0]?.members.team_members
  );

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedItemName = event.target.value;
    setSelectedItem(selectedItemName);
  };
  const handleSelectOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedItemName = event.target.value;
    setSelectedItems(selectedItemName);
  };
  const selectedItemData = team_member.accept_members.find(
    (item) => item.name === selectedItem
  );
  const selectedItemsData = team_member.accept_members.find(
    (item) => item?.member_code === selectedItems
  );

  const dispatch = useDispatch();

  // console.log(team_member, selectedItemData, selectedItem, "team_member");

  const openPrivacyModal = () => {
    setIsPrivacyModalOpen(true);
  };

  const closePrivacyModal = () => {
    setIsPrivacyModalOpen(false);
  };

  const openUploadLinkModal = () => {
    setUploadLinkModal(true);
  };

  const closeUploadLinkModal = () => {
    setUploadLinkModal(false);
  };

  // const handleSearch = (e) => {
  //   const keyword = e.target.value;

  //   if (keyword !== "") {
  //     const results = filteredNotes?.filter((data) => {
  //       return (
  //         data?.first_name?.toLowerCase().includes(keyword.toLowerCase()) ||
  //         data?.last_name?.toLowerCase().includes(keyword.toLowerCase())
  //       );
  //     });
  //     dispatch(getAdminData(results));
  //   } else {
  //     dispatch(getAdminData(filteredNotes));
  //   }
  // };

  return (
    <>
      <div className="lg:flex w-full  h-full mt-8">
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
          <form className="px-[30px] mb-8">
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Team Member Name
              </label>
              <input
                type="text"
                placeholder="Member name"
                required
                className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
              />
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Team Member Code (Unique)
              </label>
              <input
                type="text"
                placeholder="Member code"
                required
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
              <input type="checkbox" />
            </div>
            <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
              Create Team Member Invitation Link
            </button>

            <span className="bg-[#cef9d2] font-roboto text-lg text-[#7a7a7a] p-6 my-8 font-semibold flex flex-col items-center">
              <p>Team Member Invitation Link</p>
            </span>

            <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
              Copy invitation link
            </button>
          </form>
          <form className="border-t border-[#FF0000] mb-8">
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
        <div className="lg:w-1/3 border border-[#54595F] card-shadow">
          <p className="text-[#FF0000] text-lg font-roboto font-semibold p-[30px] m-5 flex flex-col items-center">
            Search Team Members in my organisation
          </p>
          <form className="px-[30px] mb-8">
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Team Members not having Portfolio
              </label>
              <select onChange={handleSelectOnChange}
              id='no_portfolio'
                value={selectedItems}
                className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                placeholder="Select Product"
              >
                <option>...Select...</option>
                {team_member.pending_members.map((members, index) => (
                  <option key={index} value={members?.member_code}>
                    {" "}
                    {members?.name}{" "}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Team Members having assigned Portfolio
              </label>
              <select  onChange={handleSelectOnChange}
              id='have_portfolio'
                value={selectedItems}
                className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                placeholder="Select Product"
              >
                <option>...Select...</option>
                {team_member.accept_members.map((members, index) => (
                  <option key={index} value={members?.member_code}>
                    {" "}
                    {members?.first_name} {members?.last_name}{" "}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Search Team Members
              </label>
              <input
                type="text"
                placeholder="Name"
                // onChange={(event) => handleSearch(event)}
                className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
              />
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Details of selected Team member
              </label>
              <textarea
                rows={4}
                placeholder="Member details"
                readOnly
                value={JSON.stringify(selectedItemsData, null, 1)?.slice(1, -1)}
                className="outline-none w-full px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto resize-none"
              />
            </div>

            <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
              Remove Selected Team Member
            </button>
          </form>
        </div>
        <div className="lg:w-1/3 border border-[#54595F] card-shadow">
          <form className="px-4">
            <div className="mb-4 mt-8">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold">
                Invited Team Members
              </label>
              <select
                onChange={handleSelectChange}
                value={selectedItem}
                id="invited_team_members"
                className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                placeholder="Select Product"
              >
                <option>...Select...</option>
                {team_member.accept_members.map((members, index) => (
                  <option key={index} value={members.name}>
                    {members?.first_name} {members?.last_name}{" "}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Search Invited Team Members
              </label>
              <input
                type="text"
                placeholder="Name"
                className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
              />
            </div>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Details of Inivited Team member
              </label>
              <textarea
                rows={4}
                placeholder="Member details"
                readOnly
                value={JSON.stringify(selectedItemData, null, 1)?.slice(1, -1)}
                className="outline-none w-full px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto resize-none"
              />
            </div>
            <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
              Cancel Selected Team Member Invitation
            </button>
            <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto my-20">
              Duplicate selected member invitation to create new
            </button>
          </form>

          <hr className="border-2 border-[#FF0000] mb-8" />
          <p className="text-[#FF0000] text-lg font-roboto font-semibold mb-12 px-4 flex flex-col">
            Common Invitation to join as TEAM MEMBER to my organisation
            <span>
              If you don't have any link,{" "}
              <button
                type="button"
                onClick={openUploadLinkModal}
                className="text-black font-normal hover:opacity-70"
              >
                click here
              </button>{" "}
              to upload.
            </span>
          </p>

          <form className="px-4">
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Link to Data
              </label>
              <textarea
                rows={4}
                placeholder="Paste link to database to connect"
                className="outline-none w-full px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto resize-none"
              />
            </div>
            <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
              Import Team Members
            </button>
          </form>
          <form className="px-4 my-8">
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Common invitation link
              </label>
              <textarea
                rows={4}
                placeholder="Paste invitation link"
                className="outline-none w-full px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto resize-none"
              />
            </div>
            <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
              Save common invitation link & create QR code
            </button>
          </form>
          <form className=" px-4 flex flex-col items-center justify-center bg-[#f1f3f5] pb-4">
            <div className="mb-4">
              <img src={images.placeholder} alt="" />
              <p className="text-center">QR code for link</p>
            </div>
            <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
              Download common invitation link QR code
            </button>
          </form>
        </div>
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
            <a href="http://appsample.com/" className="text-[#0000ee]">
              http://appsample.com/
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
        className="absolute lg:mt-36 left-0 right-0 md:w-4/5 mx-auto md:h-auto h-screen lg:max-h-[80%] pb-4 overflow-y-auto overflow-auto bg-[#FFFDFD] z-50 lg:rounded-[10px] outline-none border-0 md:flex flex-col justify-between shadow-[5px_5px_30px_0px_#00000040]"
        isOpen={uploadLinkModal}
        onRequestClose={closeUploadLinkModal}
        ariaHideApp={false}
      >
        <div className="flex justify-end px-6 pt-6">
          <button
            className="bg-black text-white text-sm px-2 py-1 rounded-sm"
            onClick={closeUploadLinkModal}
          >
            X
          </button>
        </div>
        <form className="bg-[#f5f5f5] lg:w-[45%] mx-auto my-12 px-8 pb-24 rounded-md">
          <h2 className="text-2xl font-semibold text-center pt-4 text-black">
            Excel or CSV Details
          </h2>
          <a
            href="https://www.pythonanywhere.com/user/100093/files/home/100093/clientadmin/media/sample.csv"
            className="underline text-xl text-black font-roboto"
          >
            Download Sample file
          </a>
          <div className="flex items-center justify-between py-4">
            <label className="text-[#7a7a7a] font-bold text-lg lg:w-1/2">
              Excel / CSV File
            </label>
            <input
              type="file"
              accept=".csv"
              className="rounded-lg border border-[#7a7a7a] px-5 py-2 text-sm"
            />
          </div>
          <div className="flex items-center justify-between pb-4">
            <label className="text-[#7a7a7a] font-bold text-lg lg:w-1/2">
              Name of Sheet
            </label>
            <input
              type="text"
              className="rounded-lg border border-[#7a7a7a] px-5 py-2 text-sm"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-[#7a7a7a] font-bold text-lg lg:w-1/2">
              Field Name
            </label>
            <input
              type="text"
              className="rounded-lg border border-[#7a7a7a] px-5 py-2 text-sm"
            />
          </div>
          <p className="text-[#ff0000] font-roboto leading-normal">
            If you want to upload all fields of sheet give text "all" or give
            specific field name one by one
          </p>
          <div className="flex items-center gap-x-4 justify-end">
            <button className="text-white bg-[#7a7a7a] px-3 py-2 rounded-md hover:bg-[#61ce70]">
              Add
            </button>
            <button className="text-white bg-[#7a7a7a] px-3 py-2 rounded-md hover:bg-[#61ce70]">
              Remove
            </button>
          </div>

          <div className="lg:flex items-center justify-between py-8">
            <label className="text-[#7a7a7a] font-bold text-lg lg:w-1/2">
              Number of rows you want to Delete
            </label>
            <input
              type="number"
              className="rounded-lg border border-[#7a7a7a] px-5 py-2 text-sm"
            />
          </div>
          <div className="text-center">
            <button className="text-white bg-[#7a7a7a] px-3 py-2 rounded-md hover:bg-[#61ce70]">
              Save to Database
            </button>
          </div>
          <div>
            <button className="text-white bg-[#7a7a7a] px-3 py-2 rounded-md hover:bg-[#61ce70]">
              Copy
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default TeamMember;
