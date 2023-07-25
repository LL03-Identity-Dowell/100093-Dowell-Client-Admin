import Form1 from "./Form1";
import Form2 from "./Form2";
import Form3 from "./Form3";

function User() {
  return (
    <>
      <div className="lg:flex w-full  h-full mt-8">
        <Form1 />
        <Form2 />
        <Form3 />
      </div>
    </>
  );
}

export default User;
