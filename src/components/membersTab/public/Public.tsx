import Form1 from "./Form1";
import Form2 from "./Form2";

function Public() {
  return (
    <>
      <div className="lg:flex w-full  h-full mt-8">
        <Form1 />
        <Form2 />

        <div className="lg:w-1/3 border border-[#54595F] card-shadow">
          <span className="bg-[#61ce70] font-roboto text-lg text-white p-[30px] m-5 font-semibold flex flex-col items-center">
            <p>Public</p>
            <p>{"<Total public links used>"}</p>
          </span>
        </div>
      </div>
    </>
  );
}

export default Public;
