import { useState } from "react";
import images from "../../images";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/Store";
import { getAdminData } from "../../../store/slice/adminData";
import Form1 from "./Form1";
import Form2 from "./Form2";
import Form3 from "./Form3";

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
  const handleSelectOnChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
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
        <Form1 />
        <Form2 />
        <Form3 />
      </div>
    </>
  );
};

export default TeamMember;
