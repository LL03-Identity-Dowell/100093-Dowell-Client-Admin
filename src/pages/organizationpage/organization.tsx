import Layout from "../../components/layout";



import Header from "../admin/Header";
import Sidebar from "../admin/Sidebar";



const Organization = () => {
	// const [username, setUsername] = useState(null);

	// console.log(username, 'username');

	return (
		<>
			<Layout>
				<main className="container mx-auto mb-20 lg:px-0 px-4">
					<Header />

					<section className="mt-4 flex lg:flex-row flex-col-reverse gap-8">
						<Sidebar />

						<div className="lg:w-3/4">
							
						</div>
					</section>
				</main>
			</Layout>
		</>
	);
};

export default Organization;
