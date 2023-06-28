import { useState, useEffect } from 'react';
import images from "../images";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import axios from 'axios';
import { getproducts } from '../../store/slice/products';
import productSlice from '../../store/slice/products';

const Products = () => {
  const productData = useSelector((state: RootState) => state.products);

  const [isHovering, setIsHovering] = useState(false);
  const [hovertitle, setHovertitle] = useState("");

  const handleMouseOver = (title: string) => {
    setIsHovering(true);
    setHovertitle(title);
  };

  const handleMouseOut = (title: string) => {
    setIsHovering(false);
    setHovertitle(title);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const username = "uxliveadmin";
      if (username) {
        const url = "https://100014.pythonanywhere.com/api/userinfo/";
        axios
          .post(url, { username: username })
          .then((response) => {
            try {
              console.log(response);

              dispatch(getproducts(response.data));
            } catch (e) {
              console.log("Failed to parse response");
              // handle the failure case, for instance, you can render the error message
            }
          })
          .catch((error) => {
            console.log("Request failed", error);
            // handle the failure case
          });
      }
    };
    fetchData();
  }, []);

  console.log(productData);
  

  const productsData = [
    {
      title: "Workflow AI",
      image: images.workflow_ai,
    },
    {
      title: "Wifi QR Code",
      image: images.wifiqr,
    },
    {
      title: "UX Live",
      image: images.ux,
    },
    {
      title: "Socialmedia Automation",
      image: images.socialMedia,
    },
    {
      title: "Dowell Scales",
      image: images.livingLabScales,
    },
    {
      title: "Logo Scan",
      image: images.logoScan,
    },
    {
      title: "Living Lab Chat",
      image: images.chat,
    },
    {
      title: "Legal Zard",
      image: images.legalzard,
    },
    {
      title: "Dowell Maps",
      image: images.maps,
    },
    {
      title: "Digital Queue",
      image: images.digitalQ,
    },
    {
      title: "Customer Experience",
      image: images.customerExperience,
    },
    {
      title: "Client Admin",
      image:
        "https://uxlivinglab.com/wp-content/uploads/2022/12/Living-Lab-Admin-1.png",
    },
    {
      title: "Permutation Calculator",
      image: images.permutationcalc,
    },

    {
      title: "Live Dashboard",
      image: images.liveStream,
    },
    {
      title: "Sales Agent",
      image:
        "https://uxlivinglab.com/wp-content/uploads/2023/01/Sales-agent-app.png",
    },
    {
      title: "Customer Support",
      image:
        "https://uxlivinglab.com/wp-content/uploads/2023/01/customer-support-centre.png",
    },
    {
      title: "Secure Repositories",
      image:
        "https://uxlivinglab.com/wp-content/uploads/2023/01/Living-Lab-Admin-2.png",
    },
    {
      title: "Secure Data",
      image:
        "https://uxlivinglab.com/wp-content/uploads/2023/01/secure-data.png",
    },
    {
      title: "Living Lab Monitor",
      image:
        "https://uxlivinglab.com/wp-content/uploads/2022/12/Living-Lab-Admin-2.png",
    },
  ];

  return (
    <>
      <div className="mt-8">
        <p className="font-roboto text-lg text-[#7a7a7a] font-semibold">
          Products of <span className="text-[#FF0000]"> [Organisation]</span>,
          Owner <span className="text-[#FF0000]">[Owner Name]</span>
        </p>
        <p className="font-roboto text-lg text-[#7a7a7a] font-semibold">
          Select product & Portfolio to connect
        </p>

        <section className="relative">
          <main className={`grid lg:grid-cols-3 grid-cols-1 w-full`}>
            {productsData.map((product) => {
              return (
                <div
                  key={product.title}
                  className="relative w-full h-full "
                  onMouseOver={() => handleMouseOver(product.title)}
                  onMouseOut={() => handleMouseOut(product.title)}
                >
                  <div className="">
                    <img src={product.image} alt="" className="w-full h-full" />
                  </div>
                  {isHovering && product.title === hovertitle && (
                    <div className="absolute top-0 w-full h-full">
                      <div className="relative w-full h-full">
                        <div className="bg-[#a2a2a2] opacity-50 w-full h-full p-50 rounded-sm"></div>
                        <div className="bg-transparent absolute w-full h-full top-0 text-center flex flex-col justify-between py-16 items-center">
                          <h2 className="text-white text-[1.78rem] font-semibold">
                            {product.title}
                          </h2>
                          <div>
                            <select className="outline-none h-8">
                              <option className="">
                                Portfolio 01, Role Name, Member Type
                              </option>
                              <option className="">
                                Portfolio 02, Role Name, Member Type
                              </option>
                              <option className="">
                                Portfolio 03, Role Name, Member Type
                              </option>
                            </select>
                          </div>
                          <button className="bg-black text-white h-12 px-6 py-4 rounded-md flex items-center hover:bg-[#666666]">
                            Connect
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </main>
        </section>

        <form className="border border-[#54595f] h-full mt-20 p-[50px]">
          <div className="mb-4">
            <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
              Select Product
            </label>
            <select
              className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
              placeholder="Select Product"
            >
              <option> Product 01 </option>
              <option> Product 02 </option>
              <option> Product 03 </option>
              <option> Product 04 </option>
              <option> Product 05 </option>
            </select>
          </div>
          <div className="mb-4">
            <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
              Select Portfolio
            </label>
            <select
              className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
              placeholder="Select Product"
            >
              <option> Portfolio name 01, Role Name, Member Type </option>
              <option> Portfolio name 02, Role Name, Member Type </option>
              <option>Portfolio name 03, Role Name, Member Type </option>
              <option>Portfolio name 04, Role Name, Member Type </option>
              <option>Portfolio name 05, Role Name, Member Type </option>
            </select>
          </div>
          <div className="mb-4 flex flex-col">
            <label className="text-[#7A7A7A] text-lg font-roboto font-bold">
              Details of selected Portflio
            </label>
            <textarea
              rows={4}
              className="outline-none border border-[#7a7a7a] resize-none p-4 rounded-sm text-[#7a7a7a]"
            />
          </div>
          <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
            Click here to connect selected Portfolio in selected Product
          </button>
        </form>
      </div>
    </>
  );
};

export default Products;
