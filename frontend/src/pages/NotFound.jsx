import { ReactComponent as PageNotFound } from "../assets/svg/undraw_page_not_found_re_e9o6.svg";
import Navbar from "../components/Navbar";
function NotFound() {
  return (
    <div>
      <Navbar />
      <PageNotFound
        style={{ display: "block", margin: "0 auto", padding: "20px" }}
      />
      <p style={{ textAlign: "center" }}>Page Not Found</p>
    </div>
  );
}

export default NotFound;
