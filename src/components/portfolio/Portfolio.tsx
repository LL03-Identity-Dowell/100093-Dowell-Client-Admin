
import Form1 from "./Form1";
import Form2 from "./Form2";

const Portfolio: React.FC = () => {
  return (
    <>
      <div className="mt-8 w-full lg:flex gap-8">
        <Form1 />
        <Form2 />
      </div>
    </>
  );
};

export default Portfolio;
