import Layout from "../../components/layout";

import AdminTabs from "../../components/tabs";

import Sidebar from "./Sidebar";
import Header from "./Header";



const ClientAdmin = () => {
  // const [username, setUsername] = useState(null);
  

  // console.log(username, 'username');

  return (
    <>
      <Layout>
        <main className="container mx-auto mb-20 lg:px-0 px-4">
         <Header />

          <section className="mt-4 flex lg:flex-row flex-col-reverse gap-4">
            <Sidebar />

            <div className="lg:w-3/4">
              <AdminTabs />
            </div>
          </section>
        </main>
      </Layout>
    </>
  );
};

export default ClientAdmin;
