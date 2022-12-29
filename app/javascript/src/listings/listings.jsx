import React from 'react';
import Layout from '@src/layout';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './listings.scss';

class Listings extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            propertiesOfTheUser: [],
        }
    }
    

    componentDidMount() {
        this.getUserProperties();
    }

    getUserProperties() {
        const username = this.props.data.username;
        console.log(username);

        fetch(`/api/users/${username}/properties`)
        .then(handleErrors)
        .then(data => {
            console.log('data', data);
            this.setState({
                propertiesOfTheUser: data.properties,
            })
        })
    }

    removeProperty = e => {
        e.preventDefault();
        let propertyElement = e.target.closest('.listings-wrap')
        let propertyIdentification = propertyElement.getAttribute('id')

        fetch(`/api/properties/${propertyIdentification}`, safeCredentials({
            method: 'DELETE',
        }))
        .then(handleErrors)
        .then(data => {
            if(data.success) {
                this.getUserProperties();
            }
        })
        .catch(error => {
            this.setState({
                error: 'Sorry you cannot delete the property, please try again.'
            })
        })
    }

 render() {
        const { propertiesOfTheUser } = this.state;

 return(
    <Layout>
        <div className="container py-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h4 className="mb-0">My listings</h4>
                        {/* <a className="btn btn-my-bookings p-2 mx-2" role="button" href={`/${this.props.data.username}/add-property`}><FontAwesomeIcon icon={ faPlus } className="mr-2" /> Add property</a> */}
                    </div>
                    {(propertiesOfTheUser.length != 0)
          
                    ?
            <div>
                {propertiesOfTheUser.map(property => {
                    return (
             <div key={property.id} id={property.id} className="listings-wrap p-4 mb-3">
                 <div className="row d-flex">
                        <div className="col-4">
                            <div className="property-image rounded" style={{ backgroundImage: `url(${property.image})` }} />
                        </div>
                        <div className="col-8">
                            <div className="row d-flex flex-column px-3">
                                <h5 className="mb-2">{property.title}</h5>
                            <div className="d-flex">
                                <div className='col-8'>
                                <p className="mb-0 pr-1 text-secondary font-italic">{property.property_type} in <span className="mb-0 pr-1 text-secondary"> {property.city}</span></p>
                                
                                <p className="mb-0 pr-1 text-secondary">{property.country}</p>
                                </div>
                            </div>
                        <div className="d-flex mb-2">
                            <p className="mb-0 text-secondary">{property.max_guests} guests</p>
                            <p className="mb-0 text-secondary"><span className="px-2">·</span>{property.bedrooms} bedroom</p>
                            <p className="mb-0 text-secondary"><span className="px-2">·</span>{property.beds} bed</p>
                            <p className="mb-0 text-secondary"><span className="px-2">·</span>{property.baths} bathroom</p>
                        </div>
                            <p className="description-short mb-2 text-secondary">{property.description}</p>
                            <div className="d-flex mb-2">
                                <p className="mb-0 text-secondary">$ {property.price_per_night} per night</p>
                            </div>
                            
                            <div className="d-flex">
                                <div><a className="btn btn-danger btn-sm btn-edit mr-2 mt-2" role="button" href={`/property/${property.id}/edit-property`}>Edit property</a></div>
                                <div className='delete-button-div'><button type="submit" className="btn btn-danger btn-sm btn-delete ml-auto mr-2 mt-2" onClick={this.removeProperty}>Delete property</button></div>
                                
                            </div>
                        </div>
                     </div>
                 </div>
              </div>
                )
                })}
            </div>

          :
          <div className="border border-secondary rounded text-center">
            <p className="py-4 mb-0">You still don't have any properties.</p>
          </div>
          }
      </div>
    </Layout>
        )
    }
}

export default Listings;




