import Form2 from "./Form2";
import Form1 from "./Form1";
import Form3 from "./Form3";

const Level3 = () => {
  return (
    <>
      <div className="lg:flex w-full  h-full mt-8">
        <Form1 />
        <div className="w-2/3 flex">
          <Form2 />
          <Form3 />
        </div>
      </div>
    </>
  );
};

export default Level3;
