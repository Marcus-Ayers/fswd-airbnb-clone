// layout.js
import React from 'react';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

// FontAwesome icons
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faAirbnb, faTwitter, faInstagram, faLinkedin, faFacebook } from '@fortawesome/free-brands-svg-icons';

// stylesheet
import './home.scss';


class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: false,
      username: '',
      showHostingMenu: false,
    }
  }

  componentDidMount() {
    fetch('/api/authenticated')
    .then(handleErrors)
    .then(data => {
      this.setState({
        authenticated: data.authenticated,
        username: data.username,
      })
    })
  }

  showHostingMenuFunction = () => {
    this.setState({
      showHostingMenu: !this.state.showHostingMenu,
    })
  }

  logOut = e => {
    e.preventDefault();

    fetch('/api/sessions/', safeCredentials({
      method: 'DELETE',
    }))
    .then(handleErrors)
    .then(data => {
      if(data.success) {
        this.setState({
          authenticated: false,
        })
        const params = new URLSearchParams(window.location.search);
        const redirect_url = params.get('redirect_url') || '/';
        window.location = redirect_url;
      }
    })
    .catch(error => {
      this.setState({
        error: "I'm sorry you cannot sign out. Please try again.",
      })
    })
  }

  render() {

    const {authenticated, username, showHostingMenu} = this.state;

    return (
      <>
      {(authenticated) ? 
        
        <nav className='navbar navbar-expand d-flex justify-content-between' id="navbar">
          <a className="navbar-brand text-danger" href="/">
            {/* <FontAwesomeIcon icon={faAirbnb} size='lg'/> */}
            <b className='pl-2'>airbnb</b>
          </a>
          <div>
            
          </div>
          <button type='submit' className='btn btn-hosting-menu p-2 mx-2' onClick={this.showHostingMenuFunction}>
              Airbnb Your Home
            

              {(showHostingMenu) ?
              
              (<div className='hosting-menu'>
                <ul className='list-unstyled'>
                <h3 className='user'>{username}</h3>
                <li>

                <a className='btn btn-my-bookings your-bookings' role='button' href={`/${username}/bookings`}>Your Bookings</a>
                </li>

                  <li><a href={`/${username}/add-property`}>Add a new listing</a></li>
                  <li><a href={`/${username}/listings`}>Listings</a></li>
                  <li><a href={`/${username}/reservations`}>Reservations</a></li>
                  <button type='submit' className='btn btn-danger user-logout ' onClick={this.logOut}>Sign Out</button>

                </ul>
              </div>) 
              
              : <div></div>
              }
            </button>
        </nav>

        :
        <nav className='navbar navbar-expand d-flex justify-content-between' id='navbar'>
          <a className="navbar-brand text-danger" href="/">
            {/* <FontAwesomeIcon icon={faAirbnb} size="lg"/> */}
            <b className="pl-2">airbnb</b>
          </a>
          <a className='btn btn-outline-danger btn-login' href='/login'>Log in</a>
        </nav>
   
      }

      <div className="content">
          {this.props.children}
        </div>

        <footer>
          <div className="container">
            <div className="row no-gutters mt-5 pt-5 pt-xl-5">
              <div className="col-12 col-xl-3 footerColumn_wrap">
                <h5 className="footerColumn_title my-0"><b>Support</b></h5>
                <ul className="footerColumn list-unstyled d-md-flex flex-wrap d-xl-block">
                  <li className="mt-3"><a href="#" className="text-dark my-0">Help Center</a></li>
                  <li className="mt-3"><a href="#" className="text-dark">AirCover</a></li>
                  <li className="mt-3"><a href="#" className="text-dark">Supporting people with disabilitiess</a></li>
                  <li className="mt-3"><a href="#" className="text-dark">Cancellation options</a></li>
                  <li className="mt-3"><a href="#" className="text-dark">Our COVID-19 Response</a></li>
                  <li className="mt-3"><a href="#" className="text-dark">Report a neighborhood concern</a></li>

                </ul>
              </div>
              <div className="col-12 col-xl-3 footerColumn_wrap">
                <h5 className="footerColumn_title my-0"><b>Community</b></h5>
                <ul className="footerColumn list-unstyled d-md-flex flex-wrap d-xl-block">
                  <li className="mt-3"><a href="#" className="text-dark">Airbnb.org: disaster relief housing</a></li>
                  <li className="mt-3"><a href="#" className="text-dark">Combating discrimination</a></li>
                </ul>
              </div>
              <div className="col-12 col-xl-3 footerColumn_wrap">
                <h5 className="footerColumn_title my-0"><b>Hosting</b></h5>
                <ul className="footerColumn list-unstyled d-md-flex flex-wrap d-xl-block">
                  <li className="mt-3"><a href="#" className="text-dark">Airbnb your home</a></li>
                  <li className="mt-3"><a href="#" className="text-dark">AirCover for Hosts</a></li>
                  <li className="mt-3"><a href="#" className="text-dark">Explore hosting resources</a></li>
                  <li className="mt-3"><a href="#" className="text-dark">Visit our community forum</a></li>
                  <li className="mt-3"><a href="#" className="text-dark">How to host responsibly</a></li>
                </ul>
              </div>
              <div className="col-12 col-xl-3 footerColumn_wrap">
                <h5 className="footerColumn_title my-0"><b>About</b></h5>
                <ul className="footerColumn list-unstyled d-md-flex flex-wrap d-xl-block">
                  <li className="mt-3"><a href="#" className="text-dark">Newsroom</a></li>
                  <li className="mt-3"><a href="#" className="text-dark">Learn about new features</a></li>
                  <li className="mt-3"><a href="#" className="text-dark">Letter from our founders</a></li>
                  <li className="mt-3"><a href="#" className="text-dark">Careers</a></li>
                  <li className="mt-3"><a href="#" className="text-dark">Investors</a></li>
                </ul>
              </div>
            </div>
            <div className="row no-gutters justify-content-between py-4 footerBar">
              <div className="col-12 col-xl-auto order-2 order-xl-1">
                  <div className="d-xl-flex text-left text-md-center">
                  <span className="d-block">© 2022 Airbnb</span>
                    <ul className="list-unstyled d-inline-flex align-items-center p-0 m-0">
                      <li><span className="d-none d-xl-inline px-2"> · </span><a href="#" className="text-dark">Privacy</a></li>
                      <li><span className="px-2"> · </span><a href="#" className="text-dark">Terms</a></li>
                      <li><span className="px-2"> · </span><a href="#" className="text-dark">Sitemap</a></li>
                      <li><span className="px-2"> · </span><a href="#" className="text-dark">Privacy</a></li>
                      <li><span className="px-2"> · </span><a href="#" className="text-dark">Your Privacy Choices</a></li>
                      <li><span className="px-2"> · </span><a href="#" className="text-dark">Destinations</a></li>



                    </ul>
                  </div>
              </div>
              
            </div>
          </div>
        </footer>
      </>
    );
  }
  
}

export default Layout;