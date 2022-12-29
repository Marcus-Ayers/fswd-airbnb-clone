import React from "react";
import Layout from '@src/layout';
import { handleErrors, safeCredentialsFormData } from '@utils/fetchHelper';
import './edit_property.scss';

class EditProperty extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
         
            username: '',
            
        }
    }

    
    componentDidMount() {
        this.getUserListings();
    }

    getUserListings() {
        fetch(`/api/properties/${this.props.data.property_id}`)
        .then(handleErrors)
        .then(data => {
            console.log('data: ', data);
            this.copyPropertyAttributes(data.property);
          
        })
    }

    copyPropertyAttributes = property => {
        for(let attributes in property) {
            this.setState({
                [attributes]: property[attributes],
            })
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    updatePropertyAttributes = e => {
        e.preventDefault();

        let formData = new FormData();

        formData.append('property[title]', this.state.title)
        formData.append('property[description]', this.state.description)
        formData.append('property[city]', this.state.city)
        formData.append('property[country]', this.state.country)
        formData.append('property[property_type]', this.state.property_type)
        formData.append('property[max_guests]', this.state.max_guests)
        formData.append('property[bedrooms]', this.state.bedrooms)
        formData.append('property[beds]', this.state.beds)
        formData.append('property[baths]', this.state.baths)
        formData.append('property[price_per_night]', this.state.price_per_night)

        // if (this.state.selectedFile !== null) {
        //     formData.append('property[image]', this.state.selectedFile, this.state.selectedFile.name);
        //     }

        fetch(`/api/properties/${this.props.data.property_id}`, safeCredentialsFormData ({
            method: 'PATCH',
            body: formData,
        }))
        .then(handleErrors)
        .then(data => {
            console.log('data: ', data)
            this.setState({
                username: data.property.user.username,
            })

            const params = new URLSearchParams(window.location.search)
            const redirect_url = params.get('redirect_url') || `/${this.state.username}/listings`
            window.location = redirect_url
        })
        .catch(error => {
            this.setState({
                error: 'Could not edit the property. Please try again Thank you.',
            })
        })
    }

    render() {
        const { title, description, city, country, property_type, max_guests, bedrooms, beds, baths, price_per_night, error } = this.state;

        return(
            <Layout>
                <div className="container py-4">
          <h4 className="mb-1">Edit property</h4>
          <br></br>
          <p className="mb-4 text-secondary">Please edit your property attributes</p>
          <form className="py-3 form-property" onSubmit={this.updatePropertyAttributes}>
            <div className="row g-3 align-items-center py-2">
              <div className="col-4">
                <h6>What is the name of your place?</h6>
              </div>
              <div className="col-3">
                <label htmlFor="propertyTitle" className="col-form-label">Create your title</label>
              </div>
              <div className="col-auto">
                <textarea id="propertyTitle" cols="30" rows="2" className="form-control" name="title" value={title || ''} onChange={this.handleChange} ></textarea>
              </div>
            </div>
            <div className="row g-3 align-items-center py-2">
              <div className="col-4">
              <h6>Please describe your place</h6>
              </div>
              <div className="col-3">
                <label htmlFor="propertyDescription" className="col-form-label">Create your description</label>
              </div>
              <div className="col-auto">
                <textarea id="propertyDescription" cols="30" rows="3" className="form-control"  name="description" value={description || ''} onChange={this.handleChange} ></textarea>
              </div>
            </div>
            <div className="divider my-3"></div>
            <div className="row g-3 align-items-center py-2">
              <div className="col-4">
                <h6>Where is your place located?</h6>
              </div>
              <div className="col-3">
                <label htmlFor="propertyCity" className="col-form-label">City</label>
              </div>
              <div className="col-auto">
                <input type="text" id="propertyCity" className="form-control"  name="city" value={city || ''} onChange={this.handleChange} />
              </div>
            </div>
            <div className="row g-3 align-items-center py-2">
              <div className="col-4">
              </div>
              <div className="col-3">
                <label htmlFor="propertyCountry" className="col-form-label">Country</label>
              </div>
              <div className="col-auto">
                <input type="text" id="propertyCountry" className="form-control"  name="country" value={country || ''} onChange={this.handleChange} />
              </div>
            </div>
            <div className="divider my-3"></div>
            <div className="row g-3 align-items-center py-2">
              <div className="col-4">
                <h6>What kind of space the guests will have?</h6>
              </div>
              <div className="col-3">
                <label htmlFor="propertyType" className="col-form-label">Property type</label>
              </div>
              <div className="col-auto">
                <input type="text" id="propertyType" className="form-control" name="property_type" value={property_type || ''} onChange={this.handleChange} />
              </div>
            </div>
            <div className="divider my-3"></div>
            <div className="row g-3 align-items-center py-2">
              <div className="col-4">
                <h6>How many guests would you like to welcome?</h6>
              </div>
              <div className="col-3">
                <label htmlFor="propertyMaxGuest" className="col-form-label">Max guests</label>
              </div>
              <div className="col-auto">
                <input type="number" id="propertyMaxGuests" className="form-control" name="max_guests" value={max_guests || ''} onChange={this.handleChange} />
              </div>
            </div>
            <div className="row g-3 align-items-center py-2">
            <div className="col-4">
              </div>
              <div className="col-3">
                <label htmlFor="propertyBedrooms" className="col-form-label">Bedrooms</label>
              </div>
              <div className="col-auto">
                <input type="number" id="propertyBedrooms" className="form-control" name="bedrooms" value={bedrooms || ''} onChange={this.handleChange} />
              </div>
            </div>
            <div className="row g-3 align-items-center py-2">
            <div className="col-4">
              </div>
              <div className="col-3">
                <label htmlFor="propertyBeds" className="col-form-label">Beds</label>
              </div>
              <div className="col-auto">
                <input type="number" id="propertyBeds" className="form-control" name="beds" value={beds || ''} onChange={this.handleChange} />
              </div>
            </div>
            <div className="row g-3 align-items-center py-2">
            <div className="col-4">
              </div>
              <div className="col-3">
                <label htmlFor="propertyBathrooms" className="col-form-label">Bathrooms</label>
              </div>
              <div className="col-auto">
                <input type="number" id="propertyBaths" className="form-control" name="baths" value={baths || ''} onChange={this.handleChange} />
              </div>
            </div>
            <div className="divider my-3"></div>
            <div className="row g-3 align-items-center py-2">
              <div className="col-4">
                <h6>Now how much is the price?</h6>
              </div>
              <div className="col-3">
                <label htmlFor="propertyPricePerNight" className="col-form-label">Price per night (USD)</label>
              </div>
              <div className="col-auto">
                <input type="number" id="propertyPricePerNight" className="form-control" name="price_per_night" value={price_per_night || ''} onChange={this.handleChange} />
              </div>
            </div>
            <div className="d-flex justify-content-center mx-auto my-5">
              <button type="submit" className="btn btn-edit-property w-25"><b>Update property</b></button>
              {error && <p className="text-danger mt-2">{error}</p>}
            </div>
          </form>
        </div>
            </Layout>
        )
    }
}

export default EditProperty;