
import Navbar from "../Home/Components/Navbar";
import Footer from "../Home/Components/Footer";
import ProfileMenu from "./Component/ProfileMenu";

function UserMenu() {
    return (
        <div className="max-w-[75%] mx-auto">
            <Navbar></Navbar>
            <div className="py-16"></div>
            <ProfileMenu className="text-white"></ProfileMenu>
            <br />
            <div className="my-20"></div>
            <Footer></Footer>
        </div>

    )
}

export default UserMenu;
