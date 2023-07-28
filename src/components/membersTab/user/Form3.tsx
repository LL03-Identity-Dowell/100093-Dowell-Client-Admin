import { useState } from "react";
import images from "../../images";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/Store";

const Form3 = () => {
  const [uploadLinkModal, setUploadLinkModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string>("");

  const openUploadLinkModal = () => {
    setUploadLinkModal(true);
  };

  const closeUploadLinkModal = () => {
    setUploadLinkModal(false);
  };

  const guest_member = useSelector(
    (state: RootState) => state.adminData.data[0]?.members.guest_members
  );

 const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedItemName = event.target.value;
    setSelectedItem(selectedItemName);
  };

  const selectedItemData = guest_member?.accept_members.find(
    (item) => item.name === selectedItem
  );

  return (
    <>
      <div className="lg:w-1/3 border border-[#54595F] card-shadow">
        <form className="px-4">
          <div className="mb-4 mt-8">
            <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
              Invited Users
            </label>
            <select  onChange={handleSelectChange}
              value={selectedItem}
              id="invited_team_members"
              className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
              placeholder="Select Product"
            >
               <option>...Select...</option>
              {guest_member?.accept_members.map((members, index) => (
                <option key={index} value={members.name}>
                  {members?.first_name} {members?.last_name}{" "}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
              Search Invited Users
            </label>
            <input
              type="text"
              placeholder="Name"
              className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
            />
          </div>
          <div className="mb-4">
            <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
              Details of Invited User
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
            Cancel Selected User Invitation
          </button>
          <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto my-20">
            Duplicate selected User invitation to create new
          </button>
        </form>
        <hr className="border-2 border-[#FF0000] mb-8" />

        <p className="text-[#FF0000] text-lg font-roboto font-semibold mb-12 px-4 flex flex-col">
          Common Invitation to join as USER to my organisation
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
            Import Users
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

export default Form3;
