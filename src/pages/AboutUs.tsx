import Layout from "../components/layout";
import images from "../components/images";
import GridCard from "../hooks/GridCar";
import { FaChevronCircleRight } from "react-icons/fa";

const AboutUs = () => {
  return (
    <Layout>
      <main className="container mx-auto mt-12 px-6">
        <section className="w-full lg:flex gap-20 lg:px-8">
          <div className="lg:w-1/2">
            <h2 className="lg:text-[40px] text-2xl py-4 text-white font-semibold bg-[#A2D95E] px-6">WHY CHOOSE US</h2>
            <h6 className="text-[##1F133A] text-[22px] font-semibold mt-8">DOWELL IS MAKING A BONE NOW!!</h6>
            <p className="text-[#7A7A7A] text-lg leading-6 mt-4">
              UX Living Lab belongs to DoWell Research; a global User Experience
              research team. We started our journey in 1995 as a startup and
              established management consulting and user experience research. We
              are a highly-rated UX research partner for Google, Spotify and
              many more global brands. Our field research team operates from 125
              locations globally. Standing on this research background, we are
              now translating our knowledge base to management products for
              tiny, small and medium sectors globally.
            </p>
          </div>

          <div>
            <img src={images.aboutHero} alt="" />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-semibold lg:text-[40px] text-center my-8">OUR PRODUCTS</h2>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
            <GridCard
              image={images.workflow_ai}
              text="Workflow AI is a type of Artificial Intelligence (AI) technology that is designed to automate and optimize business processes. It uses AI algorithms to analyze data and identify inefficiencies in a company’s workflow."
              link="https://uxlivinglab.com/en/workflow-ai/"
              size="text-sm"
            />
            <GridCard
              image={images.digitalQ}
              text="This technology allows customers to join a virtual queue from anywhere, either by phone, website, or mobile app, and then receive an estimated wait time."
              link="https://qrcode.reviews/digital-q-hammad111/"
              size="text-sm"
            />
            <GridCard
              image={images.wifiqr}
              text="WiFi Qrcode is a type of barcode that contains information about a wireless network. It can be scanned by a mobile device to quickly join a wireless network without having to enter a password."
              link="https://uxlivinglab.com/en/experience-wifiqrcode/"
              size="text-sm"
            />
            <GridCard
              image={images.ux}
              text="Use UXliving lab to create user personas and build empathy. By taking the time to understand more about the people who will use your product, you can anticipate their needs, preferences, and pain points."
              link="https://liveuxstoryboard.com/"
              size="text-sm"
            />
            <GridCard
              image={images.socialMedia}
              text="Social Media Automation by UXliving Lab is a service that helps businesses and individuals manage their social media campaigns and content more efficiently."
              link="https://uxlivinglab.com/en/#"
              size="text-sm"
            />
            <GridCard
              image={images.customerExperience}
              text="The customer experience at UXliving lab is excellent and customers can be sure to get the best UX learning experience."
              link="https://uxlivinglab.com/en/#"
              size="text-sm"
            />{" "}
            <GridCard
              image={images.livingLabScales}
              text="A tool for measuring the efficiency of a living lab, which is an environment for researching, developing, and testing products, services, and systems."
              link="https://uxlivinglab.com/en/#"
              size="text-sm"
            />{" "}
            <GridCard
              image={images.logoScan}
              text="Process in which a logo is scanned and converted into a digital image file. This is done by taking a photograph of the logo or scanning it with a computer scanner. "
              link="https://qrcode.reviews/5277-2/"
              size="text-sm"
            />
            <GridCard
              image={images.legalzard}
              text="An online legal document generator and database that offers users a way to create customized agreements, forms, and other legal documents with the click of a button."
              link="https://uxlivinglab.com/en/#"
              size="text-sm"
            />{" "}
            <GridCard
              image={images.maps}
              text="Livinglab maps are a range of home and office lighting fixtures designed to be energy efficient, stylish and sustainable."
              link="https://uxlivinglab.com/en/#9973"
              size="text-sm"
            />{" "}
            <GridCard
              image={images.permutationcalc}
              text="Permutation calculator is a tool used to calculate the number of possible permutations of a set of given items. "
              link="https://uxlivinglab.com/en/#"
              size="text-sm"
            />{" "}
            <GridCard
              image={images.liveStream}
              text="Live Stream dashboard provides users with a real-time overview of their stream and helps them to identify any potential issues, such as lag or low viewership. "
              link="https://uxlivinglab.com/en/#"
              size="text-sm"
            />{" "}
          </div>
        </section>

        <div className="about-us-bg relative h-40 w-full my-8">
          <div className="bg-[#A2D95E] opacity-30 w-full h-full p-[50px] border-radius flex items-center justify-center"></div>
          <span className="md:flex absolute top-[40%] left-0 justify-around w-full text-center">
            <p className="font-bold md:text-[28px] text-black ">
              DOWELL TRUE MOMENTS UX LIVING LAB
            </p>
            <button className="border-2 border-white bg-[#A2D95E] text-[#3B3B3B] h-12  px-6 font-semibold  rounded-md hover:border-black">
              Let Us talk
            </button>
          </span>

        </div>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mb-8">
            <span className="flex gap-8 border border-[#A2D95E] border-radius pl-6 py-2">
              <FaChevronCircleRight className="text-[#A2D95E] text-2xl" />
              <p className="text-lg">
                Digitalisation of education management workflows
              </p>
            </span>
            <span className="flex gap-8 border border-[#A2D95E] border-radius pl-6 py-2">
              <FaChevronCircleRight className="text-[#A2D95E] text-2xl" />
              <p className="text-lg">
                Digital queue management for restaurants & cafes
              </p>
            </span>
            <span className="flex gap-8 border border-[#A2D95E] border-radius pl-6 py-2">
              <FaChevronCircleRight className="text-[#A2D95E] text-2xl" />
              <p className="text-lg">User experience research & analysis</p>
            </span>
            <span className="flex gap-8 border border-[#A2D95E] border-radius pl-6 py-2">
              <FaChevronCircleRight className="text-[#A2D95E] text-2xl" />
              <p className="text-lg">Open source license Management</p>
            </span>
          </div>
      </main>

      <section className="bg-[#f4f9e5]">
        <div className="container mx-auto flex items-center justify-center">
          <div className="w-1/2">
            <h2 className="font-semibold lg:text-[40px] text-center my-8">Interested in joining our team?</h2>
            <p className="mb-8 text-[#99CC03] text-lg font-semibold">Grow With Dowell Ux living lab</p>

            <button className="bg-[#A2D95E] font-semibold rounded-md flex justify-center h-12 px-6 py-3 hover:border hover:border-black">Join Us</button>
          </div>

          <div className="w-2/5 px-6 my-8 grid grid-cols-1 gap-4">
            <div className="">
              <img src={images.about_us_1} alt="" className=" rounded-md" />
            </div>
            <div className="grid grid-cols-2 gap-4 ">
              <img src={images.about_us_2} alt="" className="rounded-md" />
              <img src={images.about_us_3} alt="" className="rounded-md" />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutUs;
