import Layout from "../../components/layout";

import AdminTabs from "../../components/tabs";

import Sidebar from "./Sidebar";
import Header from "./Header";
import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import Otherorgtab from "../../components/otherorgtab";

const ClientAdmin = () => {
  const selectedOrg = useSelector((state: RootState) => state.selectedorg);
  return (
    <>
      <Layout>
        <main className="container mx-auto mb-20 lg:px-0 px-4">
          <Header />

          <section className="mt-4 flex lg:flex-row flex-col-reverse gap-8">
            <Sidebar />

            <div className="lg:w-3/4">
              {
                selectedOrg.type=='owner'? <AdminTabs />:<Otherorgtab />
              }
             
            </div>
          </section>
        </main>
      </Layout>
    </>
  );
};

export default ClientAdmin;
