import Layout from "../components/layout";
import images from "../components/images";
import ReactPlayer from "react-player/youtube";
import GridCard from "../components/GridCar";

const Home: React.FC = () => {
  return (
    <>
      <Layout>
        <section className="flex justify-center my-12">
          <ReactPlayer
            url="https://youtu.be/AQMcn4tTqII"
            width={1000}
            height={600}
            playing={true}
            controls={true}
            muted={true}
          />
        </section>
        <section className="container mx-auto mb-20 px-4">
          <p className="text-[#f60505] text-2xl font-semibold text-center mb-8">
            Experience UX Living Lab
          </p>
          <p className="text-[#909597] font-roboto font-semibold text-lg text-center mb-8">
            Innovating Business from People's Minds...
          </p>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
            <GridCard
              image={images.workflow_ai}
              text="DoWell WorkflowAI recommends process optimisation for your task and manages it based on location and time."
              link="https://uxlivinglab.com/en/workflow-ai/"
            />
            <GridCard
              image={images.digitalQ}
              text="DoWell Digital Queue automates your online queue management for order processing, payment and delivery."
              link="https://qrcode.reviews/digital-q-hammad111/"
            />
            <GridCard
              image={images.wifiqr}
              text="DoWell Wifi QR Code connects your wifi by scanning QR Code."
              link="https://uxlivinglab.com/en/experience-wifiqrcode/"
            />
            <GridCard
              image={images.ux}
              text="DoWell UX Live collects stories live and analyse them for you."
              link="https://liveuxstoryboard.com/"
            />
            <GridCard
              image={images.socialMedia}
              text="DoWell Social Media Automation, a complete AI assistant to write, design, schedule and post to your social media platforms."
              link="https://uxlivinglab.com/en/#"
            />
            <GridCard
              image={images.customerExperience}
              text="DoWell CX Live collects customer experiences live from any location specified on a map."
              link="https://uxlivinglab.com/en/#"
            />{" "}
            <GridCard
              image={images.livingLabScales}
              text="Living Lab Scales measure quantitative data statistically."
              link="https://uxlivinglab.com/en/#"
            />{" "}
            <GridCard
              image={images.logoScan}
              text="DoWell Logo Scan connects customers to you by scanning your logo."
              link="https://qrcode.reviews/5277-2/"
            />{" "}
            <GridCard
              image={images.legalzard}
              text="DoWell Legalzard measures the compatibility of open-source licences and recommends how to use it for programming."
              link="https://uxlivinglab.com/en/#"
            />{" "}
            <GridCard
              image={images.maps}
              text="DoWell Living Lab Maps. Customised Google maps for better interactions."
              link="https://uxlivinglab.com/en/#9973"
            />{" "}
            <GridCard
              image={images.permutationcalc}
              text="DoWell Permutation Calculator processes permutations and combinations up to 50!."
              link="https://uxlivinglab.com/en/#"
            />{" "}
            <GridCard
              image={images.liveStream}
              text="DoWell Live Stream Dashboard helps record meetings on youtube publicly or privately."
              link="https://uxlivinglab.com/en/#"
            />{" "}
            <GridCard
              image={images.chat}
              text="DoWell Living Lab Chat helps ease communication within your team in a workspace."
              link="https://uxlivinglab.com/en/#"
            />{" "}
            <GridCard
              image={images.teamManagement}
              text="DoWell Team Management helps HR in recruiting and managing the team."
              link="https://uxlivinglab.com/en/#9973"
            />
            <GridCard
              image={images.qrGen}
              text="DoWell QR Code Generator creates bulk QR codes, which activate as a group and manages based on your needs."
              link="https://uxlivinglab.com/en/#"
            />
            <GridCard
              image={images.voiceoC}
              text="DoWell Voice of Customers helps you collect Stories, Feedback and live Net Promotor Scores."
              link="https://uxlivinglab.com/en/#"
            />
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Home;
