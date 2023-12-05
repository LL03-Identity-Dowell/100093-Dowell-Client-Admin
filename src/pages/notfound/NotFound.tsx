import { FaFacebookF, FaPinterestP, FaGooglePlusG } from "react-icons/fa";


export default function NotFound() {
	return (
		<>
			<div className="error-404-container">
				<div className="error-404-inner">
					<div className="layer-1"></div>
					<div className="layer-2"></div>
					<div className="layer-3"></div>

					<div className="error-content">
						<h1>OOPS!</h1>
						<h3>Error 404 : Not Found</h3>
						<div className="back-btn">
							<a href="/">Go Back</a>
						</div>
						<div className="error-404-social-link-wrapper">
							<a href="">
								{" "}
								<FaFacebookF />
							</a>

							<a href="">
								<FaPinterestP />
							</a>
							<a href="">
								<FaGooglePlusG />
							</a>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
