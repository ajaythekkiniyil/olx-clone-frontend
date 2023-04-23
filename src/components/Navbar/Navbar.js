import './NavBar.css'
import { AiOutlineSearch } from "react-icons/ai";

function Navbar() {
    return (
        <section className="nav-bar">
            <div className="container-fluid">
                <div className="row">
                    {/* olx svg logo */}
                    <div className="col-2 col-md-2 col-lg-1 p-0">
                        <a href="/">
                            <span className="olx-logo">
                                <svg width="48px" height="48px" viewBox="0 0 1024 1024" data-aut-id="icon" class="" fill-rule="evenodd">
                                    <path class="rui-4K4Y7" d="M661.333 256v512h-128v-512h128zM277.333 298.667c117.824 0 213.333 95.531 213.333 213.333s-95.509 213.333-213.333 213.333c-117.824 0-213.333-95.531-213.333-213.333s95.509-213.333 213.333-213.333zM794.496 384l37.504 37.504 37.504-37.504h90.496v90.496l-37.504 37.504 37.504 37.504v90.496h-90.496l-37.504-37.504-37.504 37.504h-90.496v-90.496l37.504-37.504-37.504-37.504v-90.496h90.496zM277.333 426.667c-47.061 0-85.333 38.293-85.333 85.333s38.272 85.333 85.333 85.333c47.061 0 85.333-38.293 85.333-85.333s-38.272-85.333-85.333-85.333z"></path>
                                </svg>
                            </span>
                        </a>
                    </div>
                    <div className="col-8 col-md-4 col-lg-2 location-search">
                        <AiOutlineSearch />
                        <input className="input" type="text" placeholder="Search city" />
                    </div>
                    <div className="col-12 col-md-6 col-lg-6 find-car">
                        <input className="input" type="text" placeholder="Find cars" />
                        <div className="search-box">
                        <AiOutlineSearch />
                        </div>
                    </div>
                    <div className="col-12 col-md-12 col-lg-3 p-0 login-sell-box">
                        <a href="#" className='login-btn'>Login</a>
                        <button className='sell-btn'>SELL</button>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Navbar